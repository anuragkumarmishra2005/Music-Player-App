import { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";
import ReactPlayer from "react-player";
import { Track, tracks } from "@/data/mockData";
import { toast } from "sonner";

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  shuffle: boolean;
  repeat: boolean;
  isExpanded: boolean;
  play: (track: Track, list?: Track[]) => void;
  togglePlay: () => void;
  toggleExpand: () => void;
  closeExpanded: () => void;
  forceStart: () => void;
  setProgress: (p: number) => void;
  setVolume: (v: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  next: () => void;
  previous: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchFocusTrigger: number;
  triggerSearchFocus: () => void;
  userPlaylists: Playlist[];
  createPlaylist: (title?: string) => void;
  addTrackToPlaylist: (playlistId: string, track: Track) => void;
  updatePlaylistImage: (playlistId: string, coverUrl: string) => void;
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => void;
  deletePlaylist: (id: string) => void;
  selectedPlaylistId: string | null;
  setSelectedPlaylistId: (id: string | null) => void;
}

interface Playlist {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  tracks: Track[];
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
};

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgressState] = useState(0);
  const [volume, setVolumeState] = useState(70);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocusTrigger, setSearchFocusTrigger] = useState(0);
  const [activeTrackList, setActiveTrackList] = useState<Track[]>(tracks);
  const [userPlaylists, setUserPlaylists] = useState<Playlist[]>(() => {
    const saved = localStorage.getItem("anurag-playlists");
    let playlists: Playlist[] = saved ? JSON.parse(saved) : [
      {
        id: "favorites",
        title: "Favorites",
        description: "Your most loved tracks, all in one place.",
        coverUrl: "https://images.unsplash.com/photo-1514525253361-bee873830db0?auto=format&fit=crop&q=80&w=300&h=300",
        tracks: []
      }
    ];

    // Data Migration: Update audioUrls to latest from mockData
    return playlists.map(p => ({
      ...p,
      tracks: p.tracks.map(t => {
        const latestTrack = tracks.find(mt => mt.id === t.id);
        return latestTrack ? { ...t, audioUrl: latestTrack.audioUrl } : t;
      })
    }));
  });
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem("anurag-playlists", JSON.stringify(userPlaylists));
  }, [userPlaylists]);

  useEffect(() => {
    localStorage.setItem("anurag-volume", volume.toString());
  }, [volume]);

  // Load settings
  useEffect(() => {
    const savedVolume = localStorage.getItem("anurag-volume");
    if (savedVolume) setVolumeState(parseInt(savedVolume));
    
    const savedShuffle = localStorage.getItem("anurag-shuffle");
    if (savedShuffle) setShuffle(savedShuffle === "true");
    
    const savedRepeat = localStorage.getItem("anurag-repeat");
    if (savedRepeat) setRepeat(savedRepeat === "true");
  }, []);

  // Save settings
  useEffect(() => {
    localStorage.setItem("anurag-shuffle", shuffle.toString());
  }, [shuffle]);

  useEffect(() => {
    localStorage.setItem("anurag-repeat", repeat.toString());
  }, [repeat]);
  
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const playerRef = useRef<any>(null);

  useEffect(() => {
    const fetchAndPlay = async () => {
      if (!currentTrack) return;

      // 1. Check if track already has a direct audio URL
      if (currentTrack.audioUrl) {
        console.log(`[FRONTEND DEBUG] Using direct audioUrl for: ${currentTrack.title}`);
        setCurrentUrl(currentTrack.audioUrl);
        return;
      }
      
      // 2. Try Deezer API (Excellent for high-quality official previews)
      console.log(`[FRONTEND DEBUG] Fetching Deezer preview for: ${currentTrack.title}`);
      try {
        const searchTerm = encodeURIComponent(`${currentTrack.title} ${currentTrack.artist}`.trim());
        const res = await fetch(`/api/deezer-preview?q=${searchTerm}`);
        if (res.ok) {
          const data = await res.json();
          console.log(`[FRONTEND DEBUG] Successfully found Deezer preview: ${data.url}`);
          setCurrentUrl(data.url);
          setProgressState(0);
          setTimeout(() => setIsPlaying(true), 100);
          return;
        }
      } catch (e) {
        console.warn("[FRONTEND DEBUG] Deezer fetch failed:", e);
      }

      // 3. Try iTunes Search API
      console.log(`[FRONTEND DEBUG] Fetching iTunes preview for: ${currentTrack.title}`);
      try {
        const artistQuery = currentTrack.artist !== "Unknown Artist" ? currentTrack.artist : "";
        const searchTerm = encodeURIComponent(`${currentTrack.title} ${artistQuery}`.trim());
        const itunesUrl = `https://itunes.apple.com/search?term=${searchTerm}&entity=song&limit=1`;
        
        setIsPlaying(false);
        const itunesRes = await fetch(itunesUrl);
        if (itunesRes.ok) {
          const itunesData = await itunesRes.json();
          if (itunesData.results && itunesData.results.length > 0) {
            const track = itunesData.results[0];
            console.log(`[FRONTEND DEBUG] Successfully found iTunes preview: ${track.previewUrl}`);
            setCurrentUrl(track.previewUrl);
            setProgressState(0);
            setTimeout(() => setIsPlaying(true), 100);
            return;
          }
        }
      } catch (itunesError) {
        console.warn("[FRONTEND DEBUG] iTunes fetch failed:", itunesError);
      }
      
      // 4. Last Resort: Search YouTube with specifically targeted queries
      try {
        const artistQuery = currentTrack.artist !== "Unknown Artist" ? currentTrack.artist : "";
        // We add "official audio" to the query to avoid music videos with long intros
        const query = encodeURIComponent(`${currentTrack.title} ${artistQuery} official audio`.trim());
        const res = await fetch(`/api/fetch-source?q=${query}`);
        
        if (res.ok) {
          const data = await res.json();
          console.log(`[AUDIO DEBUG] Found Best YouTube match: ${data.title}`);
          setCurrentUrl(data.url);
          setProgressState(0);
          setTimeout(() => setIsPlaying(true), 100);
        } else {
          toast.error(`Could not find "${currentTrack.title}". Try another song.`);
        }
      } catch (error) {
        console.error("[FRONTEND DEBUG] All sources failed:", error);
        toast.error("Network error. Please check your internet.");
      }
    };

    fetchAndPlay();
  }, [currentTrack]);

  const play = (track: Track, list?: Track[]) => {
    console.log(`[FRONTEND DEBUG] Play clicked for: ${track.title}`);
    
    // Always use the latest audioUrl from mockData if available
    const latestTrack = tracks.find(mt => mt.id === track.id);
    const trackToPlay = latestTrack ? { ...track, audioUrl: latestTrack.audioUrl } : track;

    if (list) {
      setActiveTrackList(list.map(t => {
        const mt = tracks.find(m => m.id === t.id);
        return mt ? { ...t, audioUrl: mt.audioUrl } : t;
      }));
    }
    setCurrentTrack(trackToPlay);
    setIsPlaying(true);
  };

  const forceStart = () => {
    console.log("[FRONTEND DEBUG] Force Start clicked");
    if (!playerRef.current) return;
    if (playerRef.current instanceof HTMLAudioElement) {
      playerRef.current.play().catch(err => console.error("Force play error:", err));
    } else if (playerRef.current.getInternalPlayer) {
      const internal = playerRef.current.getInternalPlayer();
      if (internal && internal.playVideo) internal.playVideo();
    }
    setIsPlaying(true);
  };

  const togglePlay = () => {
    console.log(`[FRONTEND DEBUG] Toggle play. New state: ${!isPlaying}`);
    setIsPlaying(!isPlaying);
  };

  const next = () => {
    if (!currentTrack || activeTrackList.length === 0) return;
    const idx = activeTrackList.findIndex((t) => t.id === currentTrack.id);
    
    // If we're at the end of a specific context (like a single search result) and NOT repeating,
    // transition to a global "Recommended" list so the music never stops.
    if (!repeat && (idx === activeTrackList.length - 1)) {
      console.log("[PLAYER DEBUG] End of context reached. Transitioning to recommendations.");
      // Get some tracks that aren't in the current list to keep it fresh
      const recommended = tracks
        .filter(t => !activeTrackList.some(at => at.id === t.id))
        .sort(() => Math.random() - 0.5)
        .slice(0, 20);
      
      if (recommended.length > 0) {
        play(recommended[0], recommended);
        return;
      }
    }

    let nextIdx = (idx + 1) % activeTrackList.length;
    if (shuffle) {
      nextIdx = Math.floor(Math.random() * activeTrackList.length);
    }
    play(activeTrackList[nextIdx]);
  };

  const previous = () => {
    if (!currentTrack || activeTrackList.length === 0) return;
    const idx = activeTrackList.findIndex((t) => t.id === currentTrack.id);
    const prevIdx = (idx - 1 + activeTrackList.length) % activeTrackList.length;
    play(activeTrackList[prevIdx]);
  };

  const handleEnded = () => {
    console.log("[PLAYER DEBUG] Track ended, preparing next...");
    if (repeat) {
      if (playerRef.current) {
        if (typeof playerRef.current.seekTo === "function") {
          playerRef.current.seekTo(0);
        } else {
          playerRef.current.currentTime = 0;
          playerRef.current.play().catch((e: any) => console.log("Native repeat play error:", e));
        }
      }
    } else {
      next();
    }
  };

  const setProgress = (p: number) => {
    setProgressState(p);
    if (!playerRef.current) return;
    
    if (currentUrl.includes("youtube.com") || currentUrl.includes("youtu.be")) {
      // ReactPlayer seek
      if (typeof playerRef.current.seekTo === "function") {
        playerRef.current.seekTo(p / 100, "fraction");
      }
    } else {
      // Native audio seek
      if (playerRef.current.duration) {
        playerRef.current.currentTime = (p / 100) * playerRef.current.duration;
      }
    }
  };

  const setVolume = (v: number) => {
    setVolumeState(v);
  };

  useEffect(() => {
    if (currentUrl) {
      console.log(`[FRONTEND DEBUG] currentUrl updated to: ${currentUrl}`);
    }
  }, [currentUrl]);

  const Player = ReactPlayer as any;

  // Robust playback control for native audio
  useEffect(() => {
    if (playerRef.current instanceof HTMLAudioElement) {
      if (isPlaying) {
        playerRef.current.play().catch(err => {
          console.warn("[FRONTEND DEBUG] Playback blocked by browser. User must click first.", err);
        });
      } else {
        playerRef.current.pause();
      }
    }
  }, [isPlaying, currentUrl, currentTrack?.id]);

  // Backspace/Space shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" || 
        target.tagName === "TEXTAREA" || 
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay]);

  // Now Playing Notification
  useEffect(() => {
    if (currentTrack && isPlaying) {
      toast(`Now Playing: ${currentTrack.title}`, {
        description: currentTrack.artist,
      });
    }
  }, [currentTrack?.id]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        progress,
        duration,
        volume,
        shuffle,
        repeat,
        isExpanded,
        play,
        togglePlay,
        toggleExpand: () => setIsExpanded(!isExpanded),
        closeExpanded: () => setIsExpanded(false),
        forceStart,
        setProgress,
        setVolume,
        toggleShuffle: () => setShuffle(!shuffle),
        toggleRepeat: () => setRepeat(!repeat),
        next,
        previous,
        searchQuery,
        setSearchQuery,
        searchFocusTrigger,
        triggerSearchFocus: () => setSearchFocusTrigger(prev => prev + 1),
        userPlaylists,
        createPlaylist: (title = `My Playlist #${userPlaylists.length + 1}`) => {
          const newPlaylist: Playlist = {
            id: `user-${Date.now()}`,
            title,
            description: "A beautiful collection of tracks created by you.",
            coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
            tracks: []
          };
          setUserPlaylists([...userPlaylists, newPlaylist]);
          toast.success(`Created "${title}"`);
        },
        addTrackToPlaylist: (playlistId, track) => {
          setUserPlaylists(prev => prev.map(p => {
            if (p.id === playlistId) {
              const alreadyExists = p.tracks.some(t => t.id === track.id);
              if (alreadyExists) {
                toast.info(`"${track.title}" is already in "${p.title}"`);
                return p;
              }
              toast.success(`Added to "${p.title}"`);
              return { ...p, tracks: [...p.tracks, track] };
            }
            return p;
          }));
        },
        updatePlaylistImage: (playlistId: string, coverUrl: string) => {
          setUserPlaylists(prev => prev.map(p => {
            if (p.id === playlistId) {
              toast.success(`Updated cover for "${p.title}"`);
              return { ...p, coverUrl };
            }
            return p;
          }));
        },
        removeTrackFromPlaylist: (playlistId, trackId) => {
          setUserPlaylists(prev => prev.map(p => {
            if (p.id === playlistId) {
              const track = p.tracks.find(t => t.id === trackId);
              toast.error(`Removed "${track?.title}" from "${p.title}"`);
              return { ...p, tracks: p.tracks.filter(t => t.id !== trackId) };
            }
            return p;
          }));
        },
        deletePlaylist: (id: string) => {
          if (id === "favorites") {
            toast.error("You cannot delete your Favorites playlist!");
            return;
          }
          setUserPlaylists(prev => {
            const playlist = prev.find(p => p.id === id);
            toast.error(`Deleted "${playlist?.title}"`);
            return prev.filter(p => p.id !== id);
          });
          if (selectedPlaylistId === id) {
            setSelectedPlaylistId(null);
          }
        },
        selectedPlaylistId,
        setSelectedPlaylistId,
      }}
    >
      {children}
      <div 
        style={{ 
          position: "fixed",
          bottom: "10px",
          right: "10px",
          width: "300px",
          height: "200px",
          opacity: 0.1, 
          pointerEvents: "none",
          zIndex: 9999,
          overflow: "hidden",
          background: "#000"
        }}
      >
        {currentUrl.includes("youtube.com") || currentUrl.includes("youtu.be") ? (
          <Player
            ref={playerRef}
            url={currentUrl}
            playing={isPlaying}
            volume={volume / 100}
            onProgress={(state: any) => setProgressState(state.played * 100)}
            onDuration={(d: number) => setDuration(d)}
            onEnded={handleEnded}
            onError={(e: any) => {
              console.error("[FRONTEND DEBUG] ReactPlayer Error:", e);
              if (currentUrl) toast.error("Video playback error. Trying next...");
            }}
            onReady={() => console.log(`[FRONTEND DEBUG] ReactPlayer READY: ${currentUrl}`)}
            onStart={() => console.log("[FRONTEND DEBUG] ReactPlayer STARTED PLAYING")}
            onBuffer={() => console.log("[FRONTEND DEBUG] ReactPlayer BUFFERING")}
            playsinline
            controls={false}
            width="100%"
            height="100%"
            config={{
              youtube: {
                playerVars: { 
                  autoplay: 1,
                  controls: 0,
                  modestbranding: 1,
                  rel: 0,
                  iv_load_policy: 3,
                  enablejsapi: 1
                }
              } as any
            }}
          />
        ) : (
          <audio
            ref={playerRef}
            src={currentUrl}
            onTimeUpdate={(e: any) => setProgressState((e.target.currentTime / e.target.duration) * 100)}
            onLoadedMetadata={(e: any) => setDuration(e.target.duration)}
            onEnded={handleEnded}
            onError={(e) => {
              console.error("[FRONTEND DEBUG] Native Audio Error:", e);
              if (currentUrl) toast.error("Audio link failed. Try another track.");
            }}
          />
        )}
      </div>
    </PlayerContext.Provider>
  );
};
