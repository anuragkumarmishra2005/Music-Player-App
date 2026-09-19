import { Play, Heart, MoreHorizontal, Music2, Plus, Trash2 } from "lucide-react";
import { Track } from "@/data/mockData";
import { usePlayer } from "@/context/PlayerContext";
import { toast } from "sonner";

interface TrackListProps {
  tracks: Track[];
}

const TrackList = ({ tracks: trackList }: TrackListProps) => {
  const { currentTrack, isPlaying, play, togglePlay, addTrackToPlaylist, removeTrackFromPlaylist, userPlaylists, selectedPlaylistId } = usePlayer();

  if (trackList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <p className="text-lg font-medium">No results found</p>
        <p className="text-sm">Please try searching for something else.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {trackList.map((track, index) => {
        const isCurrentTrack = currentTrack?.id === track.id;
        return (
          <div
            key={track.id}
            onClick={() => {
              if (isCurrentTrack) {
                togglePlay();
              } else {
                play(track, trackList);
              }
            }}
            className={`flex items-center gap-4 p-2.5 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer group hover:scale-[1.01] active:scale-[0.99] ${
              isCurrentTrack ? "bg-white/10 glass-premium shadow-xl" : ""
            }`}
          >
            <div className="w-10 text-center text-muted-foreground group-hover:hidden">
              {isCurrentTrack && isPlaying ? (
                <div className="flex items-center justify-center gap-1 h-4">
                  <div className="w-1 h-3 bg-primary animate-pulse" />
                  <div className="w-1 h-4 bg-primary animate-pulse delay-75" />
                  <div className="w-1 h-2 bg-primary animate-pulse delay-150" />
                </div>
              ) : (
                index + 1
              )}
            </div>
            <div className="w-10 text-center hidden group-hover:block">
              <Play size={16} strokeWidth={2.5} className={isCurrentTrack ? "text-primary" : "text-foreground"} fill="currentColor" />
            </div>
            <img
              src={track.coverUrl}
              alt={track.title}
              className="w-10 h-10 object-cover rounded shadow-md shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate ${isCurrentTrack ? "text-primary" : "text-foreground"}`}>
                {track.title}
              </p>
              <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  const targetPlaylistId = selectedPlaylistId || (userPlaylists.length > 0 ? userPlaylists[0].id : null);
                  if (targetPlaylistId) {
                    addTrackToPlaylist(targetPlaylistId, track);
                  } else {
                    toast.error("Please create a playlist in the sidebar first!");
                  }
                }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-muted-foreground hover:text-primary"
                title={selectedPlaylistId ? "Add to this Playlist" : "Add to My Library"}
              >
                <Plus size={18} strokeWidth={2.5} />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  addTrackToPlaylist("favorites", track);
                }}
                className={`p-2 hover:bg-white/10 rounded-full transition-colors ${
                  userPlaylists.find(p => p.id === "favorites")?.tracks.some(t => t.id === track.id) 
                    ? "text-primary fill-current" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Add to Favorites"
              >
                <Heart size={18} strokeWidth={2.5} />
              </button>
              {selectedPlaylistId && userPlaylists.some(p => p.id === selectedPlaylistId) && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTrackFromPlaylist(selectedPlaylistId, track.id);
                  }}
                  className="p-2 hover:bg-red-500/20 rounded-full transition-colors text-muted-foreground hover:text-red-500"
                  title="Remove from Playlist"
                >
                  <Trash2 size={18} strokeWidth={2.5} />
                </button>
              )}
            </div>
              <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
            </div>
            <div className="w-1/3 text-sm text-muted-foreground truncate hidden md:block">
              {track.album}
            </div>
            <div className="text-sm text-muted-foreground tabular-nums pr-4">
              {track.duration}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrackList;
