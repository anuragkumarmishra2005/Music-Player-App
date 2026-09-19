import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import PlayerBar from "@/components/PlayerBar";
import GreetingBanner from "@/components/GreetingBanner";
import PlaylistSection from "@/components/PlaylistSection";
import TrackList from "@/components/TrackList";
import PlaylistCard from "@/components/PlaylistCard";
import { playlists, madeForYou, trending, tracks } from "@/data/mockData";
import { Search, Plus, Play, MoreHorizontal, Clock, Heart, Trash2, Edit2, ArrowLeft } from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";
import { useEffect, useRef } from "react";

const Index = () => {
  const { searchQuery, setSearchQuery, searchFocusTrigger, triggerSearchFocus, selectedPlaylistId, setSelectedPlaylistId, userPlaylists, updatePlaylistImage } = usePlayer();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchFocusTrigger > 0 && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchFocusTrigger]);

  const searchResults = searchQuery
    ? tracks.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.artist.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const playlistResults = searchQuery
    ? [...playlists, ...userPlaylists, ...madeForYou, ...trending].filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="h-screen flex flex-col bg-background text-foreground selection:bg-primary/30">
      <div className="flex-1 flex overflow-hidden p-2 gap-2">
        <Sidebar />

        <main className="flex-1 bg-card rounded-lg overflow-hidden flex flex-col relative group/main">
          {/* Header */}
          <header className={`p-4 flex items-center justify-between sticky top-0 z-10 transition-colors duration-500 ${selectedPlaylistId ? "bg-black/20 backdrop-blur-md" : ""}`}>
            <div className="flex items-center gap-4 w-full max-w-[480px]">
              <div className="relative w-full group/search">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={18} className="text-muted-foreground group-focus-within/search:text-primary transition-colors" />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  className="w-full bg-surface-elevated/50 hover:bg-surface-elevated text-foreground text-sm rounded-full focus:ring-2 focus:ring-primary/50 focus:outline-none block pl-11 p-2.5 transition-all placeholder:text-muted-foreground/60 border border-transparent focus:border-primary/20 glass-premium"
                  placeholder="Songs, playlists, or artists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-white text-black font-bold py-2 px-4 rounded-full text-sm hover:scale-105 active:scale-95 transition-all">
                Upgrade
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto scrollbar-thin p-6 space-y-10">
            {searchQuery ? (
              <section className="space-y-10">
                <div className="animate-slide-up">
                  <h2 className="text-2xl font-black text-white mb-6 tracing-tighter">Songs</h2>
                  <TrackList tracks={searchResults} />
                </div>

                {playlistResults.length > 0 && (
                  <div className="animate-slide-up [animation-delay:200ms]">
                    <h2 className="text-2xl font-black text-white mb-6 tracing-tighter">Playlists</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                      {playlistResults.map((playlist) => (
                        <PlaylistCard key={playlist.id} playlist={playlist} />
                      ))}
                    </div>
                  </div>
                )}

                {searchResults.length === 0 && playlistResults.length === 0 && (
                  <div className="text-center py-20 text-muted-foreground">
                    <p className="text-lg font-medium">No results found for "{searchQuery}"</p>
                  </div>
                )}
              </section>
            ) : selectedPlaylistId ? (
              (() => {
                const allPlaylists = [...playlists, ...userPlaylists, ...madeForYou, ...trending];
                const selected = allPlaylists.find(p => p.id === selectedPlaylistId);
                if (!selected) return <p>Playlist not found</p>;
                return (
                  <section className="animate-slide-up">
                    <button 
                      onClick={() => setSelectedPlaylistId(null)}
                      className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-6 group/back"
                    >
                      <ArrowLeft className="w-5 h-5 group-hover/back:-translate-x-1 transition-transform" />
                      <span className="font-semibold">Back to Library</span>
                    </button>
                    <div className="flex flex-col md:flex-row gap-6 mb-8 items-end">
                      <div 
                        className="relative group/cover cursor-pointer"
                        onClick={() => {
                          const url = prompt("Enter the URL for the new cover image:");
                          if (url) updatePlaylistImage(selected.id, url);
                        }}
                      >
                        <img src={selected.coverUrl} alt={selected.title} className="w-48 h-48 md:w-60 md:h-60 object-cover rounded-xl shadow-2xl group-hover/cover:brightness-50 transition-all duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/cover:opacity-100 transition-opacity duration-500">
                          <span className="text-white font-bold text-sm bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">Change Photo</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">Playlist</p>
                        <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter">{selected.title}</h1>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                          <span className="text-primary font-bold">Anurag</span>
                          <span>•</span>
                          <span>{selected.tracks.length} songs</span>
                        </div>
                      </div>
                    </div>
                    <TrackList tracks={selected.tracks} />
                    
                    {selected.tracks.length < 5 && (
                      <div className="mt-16 animate-slide-up [animation-delay:300ms]">
                        <div className="flex items-center justify-between mb-8">
                          <div>
                            <h3 className="text-2xl font-black text-white tracing-tighter">Recommended</h3>
                            <p className="text-sm text-muted-foreground font-medium mt-1">Based on what's in this playlist</p>
                          </div>
                          <button 
                            onClick={triggerSearchFocus}
                            className="text-sm font-bold text-primary hover:underline"
                          >
                            Find more
                          </button>
                        </div>
                        <TrackList tracks={tracks.filter(t => !selected.tracks.some(st => st.id === t.id)).slice(0, 5)} />
                      </div>
                    )}

                    {selected.tracks.length === 0 && (
                      <div className="py-20 border-t border-white/5 mt-10 text-center animate-slide-up">
                         <div className="max-w-md mx-auto space-y-4">
                            <h3 className="text-2xl font-black text-white">Let's find something for your playlist</h3>
                            <button 
                              onClick={triggerSearchFocus}
                              className="bg-white text-black font-bold py-3 px-8 rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl"
                            >
                              Search for songs
                            </button>
                         </div>
                      </div>
                    )}
                  </section>
                );
              })()
            ) : (
              <>
                <GreetingBanner />
                <PlaylistSection title="Popular Playlists" playlists={playlists.slice(0, 5)} />
                <PlaylistSection title="Trending Now" playlists={trending} />
                <PlaylistSection title="Made For You" playlists={madeForYou.slice(0, 5)} />
              </>
            )}
          </div>
        </main>
      </div>
      <PlayerBar />
    </div>
  );
};

export default Index;
