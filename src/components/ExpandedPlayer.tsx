import { ChevronDown, MoreHorizontal, Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Share2, ListMusic, Plus, PlusCircle, X } from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";
import { Slider } from "@/components/ui/slider";

const ExpandedPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    progress,
    volume,
    shuffle,
    repeat,
    isExpanded,
    togglePlay,
    toggleExpand,
    setProgress,
    setVolume,
    toggleShuffle,
    toggleRepeat,
    next,
    previous,
    duration,
  } = usePlayer();

  if (!currentTrack || !isExpanded) return null;

  const formatTime = (pct: number) => {
    const totalSec = Math.round((pct / 100) * (duration || 210));
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  // No longer just bg-[#4A1616], now using a dynamic mesh gradient
  const bgColor = "mesh-gradient-animate";

  return (
    <div 
      className={`fixed inset-0 z-[9999] ${bgColor} text-white flex flex-col p-8 pb-12 overflow-hidden animate-in fade-in duration-700`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-8 glass-premium p-4 rounded-2xl animate-slide-up">
        <button onClick={toggleExpand} className="p-2 -ml-2 hover:scale-110 active:scale-90 transition-transform">
          <ChevronDown size={32} className="stroke-[2.5px]" />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.2em] font-black opacity-50 mb-1">Playing from playlist</span>
          <span className="text-sm font-bold truncate max-w-[200px] text-white/90">{currentTrack.album}</span>
        </div>
        <button className="p-2 -mr-2 hover:scale-110 active:scale-90 transition-transform">
          <MoreHorizontal size={28} className="stroke-[2.5px]" />
        </button>
      </header>

      {/* Album Art */}
      <div className="flex-1 flex items-center justify-center mb-10">
        <div className="w-full max-w-[420px] aspect-square shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] rounded-3xl overflow-hidden animate-float">
          <img
            src={currentTrack.coverUrl}
            alt={currentTrack.title}
            className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
          />
        </div>
      </div>

      {/* Track Info & Action Icons */}
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="min-w-0">
          <h2 className="text-[32px] font-black mb-1 tracking-tighter leading-tight drop-shadow-md">{currentTrack.title}</h2>
          <p className="text-white/60 text-lg font-bold truncate tracking-tight">{currentTrack.artist}</p>
        </div>
        <div className="flex items-center gap-6">
           <button className="p-1 opacity-80 hover:opacity-100 hover:scale-110 transition-all active:scale-90">
             <X size={36} className="stroke-[2.5px]" />
           </button>
           <button className="p-1 opacity-80 hover:opacity-100 hover:scale-110 transition-all active:scale-90">
             <PlusCircle size={36} className="stroke-[2.5px]" />
           </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-4 mb-12 px-2">
        <Slider
          value={[progress]}
          max={100}
          step={0.1}
          onValueChange={(v) => setProgress(v[0])}
          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-white [&_[role=slider]]:border-0 [&_[role=slider]]:shadow-lg [&_[data-radix-slider-range]]:bg-white [&_[data-radix-slider-track]]:h-[4px] [&_[data-radix-slider-track]]:bg-white/20 hover:[&_[data-radix-slider-track]]:h-[6px] transition-all cursor-pointer"
        />
        <div className="flex justify-between text-xs font-black opacity-40 tabular-nums tracking-widest px-0.5">
          <span>{formatTime(progress)}</span>
          <span>{currentTrack.duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-2 mb-6">
        <button onClick={toggleShuffle} className={`transition-all hover:scale-125 ${shuffle ? "text-white" : "text-white/30 hover:text-white"}`}>
          <Shuffle size={26} className="stroke-[2.5px]" />
        </button>
        
        <div className="flex items-center gap-10">
          <button onClick={previous} className="text-white/80 hover:text-white hover:scale-110 active:scale-90 transition-all">
            <SkipBack size={52} className="fill-current stroke-[2.5px]" />
          </button>
          <button 
            onClick={togglePlay} 
            className="w-[84px] h-[84px] bg-white rounded-full flex items-center justify-center active:scale-90 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-110 hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]"
          >
            {isPlaying ? (
              <Pause size={40} className="text-black fill-current stroke-[2.5px]" />
            ) : (
              <Play size={40} className="text-black ml-1 fill-current stroke-[2.5px]" />
            )}
          </button>
          <button onClick={next} className="text-white/80 hover:text-white hover:scale-110 active:scale-90 transition-all">
            <SkipForward size={52} className="fill-current stroke-[2.5px]" />
          </button>
        </div>

        <button onClick={toggleRepeat} className={`transition-all hover:scale-125 ${repeat ? "text-white" : "text-white/30 hover:text-white"}`}>
          <Repeat size={26} className="stroke-[2.5px]" />
        </button>
      </div>

      {/* Footer Icons */}
      <footer className="flex items-center justify-between mt-auto glass-premium p-4 rounded-2xl animate-slide-up opacity-80 hover:opacity-100 transition-opacity">
        <button className="text-white/40 hover:text-white transition-all hover:scale-110">
          <Shuffle size={22} className="opacity-0 pointer-events-none" /> {/* Spacer */}
          <MoreHorizontal size={24} className="stroke-[2.5px]" /> 
        </button>
        <div className="flex flex-col items-center">
          <div className="w-1 h-1 bg-white/20 rounded-full mb-1"></div>
          <div className="w-8 h-1 bg-white/10 rounded-full"></div>
        </div>
        <button className="text-white/40 hover:text-white transition-all hover:scale-110">
          <Share2 size={24} className="stroke-[2.5px]" />
        </button>
      </footer>
    </div>
  );
};

export default ExpandedPlayer;
