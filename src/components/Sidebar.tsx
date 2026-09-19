import { Home, Search, Library, Plus, Music2, Trash2 } from "lucide-react";
import { playlists } from "@/data/mockData";
import { usePlayer } from "@/context/PlayerContext";
import React from "react";
import { toast } from "sonner";

const Sidebar = () => {
  const { closeExpanded, setSearchQuery, triggerSearchFocus, createPlaylist, deletePlaylist, userPlaylists, setSelectedPlaylistId, selectedPlaylistId } = usePlayer();
  
  // Only show user created ones (removing mocks as requested)
  const allPlaylists = userPlaylists;

  const handleHomeClick = () => {
    setSearchQuery("");
    setSelectedPlaylistId(null);
    closeExpanded();
  };

  const handleSearchClick = () => {
    triggerSearchFocus();
    closeExpanded();
  };

  return (
    <aside className="flex flex-col gap-2 w-[300px] shrink-0">
      {/* Brand */}
      <div className="bg-card rounded-lg p-5 pb-2">
        <div className="flex items-center gap-2.5 mb-6 group cursor-pointer animate-color-cycle" onClick={handleHomeClick}>
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center glow-primary group-hover:scale-110 transition-transform">
            <Music2 size={18} className="text-primary-foreground" />
          </div>
          <h1 className="text-xl font-extrabold text-gradient-primary tracking-tight">Anurag</h1>
        </div>
        <nav className="space-y-3.5">
          <SidebarLink 
            icon={<Home size={22} className="stroke-[2.5px]" />} 
            label="Home" 
            active 
            onClick={handleHomeClick}
          />
          <SidebarLink 
            icon={<Search size={22} className="stroke-[2.5px]" />} 
            label="Search" 
            onClick={handleSearchClick}
          />
        </nav>
      </div>

      {/* Library */}
      <div className="bg-card rounded-lg p-4 flex-1 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" onClick={() => toast.info("Welcome to your personal library!")}>
            <Library size={22} className="stroke-[2.5px]" />
            <span className="font-bold text-sm tracking-wide uppercase">Anurag Library</span>
          </div>
          <button 
            onClick={() => createPlaylist()}
            className="text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition-all p-1.5 rounded-full"
          >
            <Plus size={18} className="stroke-[2.5px]" />
          </button>
        </div>

        <div className="overflow-y-auto scrollbar-thin flex-1 space-y-0.5">
          {allPlaylists.map((playlist) =>              <div
                key={playlist.id}
                onClick={() => {
                  setSelectedPlaylistId(playlist.id);
                  setSearchQuery("");
                  closeExpanded();
                }}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-300 group/item relative ${
                  selectedPlaylistId === playlist.id 
                    ? "bg-white/10 glass-premium" 
                    : "hover:bg-white/5"
                }`}
              >
                <div className="w-12 h-12 rounded-md overflow-hidden bg-surface-elevated flex-shrink-0 shadow-lg group-hover/item:scale-105 transition-transform duration-500">
                  <img src={playlist.coverUrl} alt={playlist.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold truncate transition-colors ${selectedPlaylistId === playlist.id ? "text-primary" : "text-foreground"}`}>
                    {playlist.title}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium">
                    Playlist • {playlist.tracks.length} songs
                  </p>
                </div>
                {playlist.id !== "favorites" && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePlaylist(playlist.id);
                    }}
                    className="opacity-0 group-hover/item:opacity-100 p-2 hover:bg-red-500/20 rounded-full transition-all text-muted-foreground hover:text-red-500 z-10"
                    title="Delete Playlist"
                  >
                    <Trash2 size={16} strokeWidth={2.5} />
                  </button>
                )}
              </div>
          )}
          {allPlaylists.length === 0 && (
            <p className="text-xs text-muted-foreground p-4 text-center">Your library is empty. Click + to create a playlist.</p>
          )}
        </div>
      </div>
    </aside>
  );
};

const SidebarLink = ({ 
  icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean;
  onClick?: () => void;
}) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-4 cursor-pointer transition-colors ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
  >
    {icon}
    <span className="font-semibold">{label}</span>
  </div>
);

export default Sidebar;
