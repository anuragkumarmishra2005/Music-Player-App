import { Play } from "lucide-react";
import { Playlist } from "@/data/mockData";
import { usePlayer } from "@/context/PlayerContext";

const PlaylistCard = ({ playlist }: { playlist: Playlist }) => {
  const { play, setSelectedPlaylistId, closeExpanded, setSearchQuery } = usePlayer();

  const handleCardClick = () => {
    setSelectedPlaylistId(playlist.id);
    setSearchQuery("");
    closeExpanded();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-card/40 hover:bg-card/60 glass-premium hover:scale-[1.02] transition-all duration-500 p-4 rounded-2xl cursor-pointer group relative animate-slide-up"
    >
      <div className="relative mb-5 overflow-hidden rounded-xl">
        <img
          src={playlist.coverUrl}
          alt={playlist.title}
          className="w-full aspect-square object-cover shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:shadow-black/60 transition-all duration-700"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            play(playlist.tracks[0], playlist.tracks);
          }}
          className="absolute bottom-3 right-3 w-12 h-12 bg-primary animate-color-cycle rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:scale-110"
        >
          <Play size={20} className="text-primary-foreground ml-0.5 fill-current stroke-[2.5px]" />
        </button>
      </div>
      <h3 className="text-sm font-black text-white/90 truncate group-hover:text-primary transition-colors">{playlist.title}</h3>
      <p className="text-[11px] text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed font-bold opacity-60 italic">{playlist.description}</p>
    </div>
  );
};

export default PlaylistCard;
