import {
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat,
  Volume2, Maximize2, ListMusic, Mic2,
} from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";
import { Slider } from "@/components/ui/slider";

const PlayerBar = () => {
  const {
    currentTrack, isPlaying, progress, volume, shuffle, repeat,
    togglePlay, forceStart, setProgress, setVolume, toggleShuffle, toggleRepeat, next, previous,
    toggleExpand,
  } = usePlayer();

  if (!currentTrack) return null;

  return (
    <footer className="h-[88px] bg-player/80 glass-premium border-t border-white/5 px-5 flex items-center justify-between gap-6 relative z-50">
      {/* Track Info */}
      <div 
        className="flex items-center gap-4 w-[280px] min-w-0 cursor-pointer group/info transition-transform active:scale-95"
        onClick={toggleExpand}
      >
        <img
          src={currentTrack.coverUrl}
          alt={currentTrack.title}
          className="w-14 h-14 rounded-md object-cover shadow-lg shadow-black/50"
        />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-player-foreground truncate hover:underline cursor-pointer">
            {currentTrack.title}
          </p>
          <p className="text-xs text-player-muted truncate hover:underline cursor-pointer">
            {currentTrack.artist}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-1.5 flex-1 max-w-[620px]">
        <div className="flex items-center gap-6">
          <button onClick={toggleShuffle} className={`transition-colors ${shuffle ? "text-primary" : "text-player-muted hover:text-player-foreground"}`}>
            <Shuffle size={20} className="stroke-[2.5px]" />
          </button>
          <button onClick={previous} className="text-player-muted hover:text-player-foreground transition-all active:scale-95">
            <SkipBack size={24} className="fill-current stroke-[2.5px]" />
          </button>
          <button onClick={togglePlay} className="w-10 h-10 bg-player-foreground rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md">
            {isPlaying ? (
              <Pause size={20} className="text-player fill-current stroke-[2.5px]" />
            ) : (
              <Play size={20} className="text-player ml-0.5 fill-current stroke-[2.5px]" />
            )}
          </button>
          <button onClick={next} className="text-player-muted hover:text-player-foreground transition-all active:scale-95">
            <SkipForward size={24} className="fill-current stroke-[2.5px]" />
          </button>
          <button onClick={toggleRepeat} className={`transition-colors ${repeat ? "text-primary" : "text-player-muted hover:text-player-foreground"}`}>
            <Repeat size={20} className="stroke-[2.5px]" />
          </button>
        </div>

        <div className="flex items-center gap-2 w-full">
          <span className="text-[11px] text-player-muted w-10 text-right tabular-nums">{formatTime(progress)}</span>
          {isPlaying && progress === 0 && (
            <button 
              onClick={forceStart}
              className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded animate-bounce font-bold whitespace-nowrap"
              title="Click here if the song won't start"
            >
              STUCK? CLICK
            </button>
          )}
          <Slider
            value={[progress]}
            max={100}
            step={1}
            onValueChange={(v) => setProgress(v[0])}
            className="flex-1 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:bg-player-foreground [&_[role=slider]]:border-0 [&_[role=slider]]:opacity-0 hover:[&_[role=slider]]:opacity-100 [&_[data-radix-slider-range]]:bg-player-foreground hover:[&_[data-radix-slider-range]]:bg-primary [&_[data-radix-slider-track]]:h-1 [&_[data-radix-slider-track]]:bg-surface-elevated"
          />
          <span className="text-[11px] text-player-muted w-10 tabular-nums">{currentTrack.duration}</span>
        </div>
      </div>

      {/* Volume & Extras */}
      <div className="flex items-center gap-3.5 w-[200px] justify-end">
        <Mic2 size={16} strokeWidth={2.5} className="text-player-muted hover:text-player-foreground cursor-pointer transition-colors" />
        <ListMusic size={16} strokeWidth={2.5} className="text-player-muted hover:text-player-foreground cursor-pointer transition-colors" />
        <Volume2 size={16} strokeWidth={2.5} className="text-player-muted hover:text-player-foreground cursor-pointer transition-colors" />
        <Slider
          value={[volume]}
          max={100}
          step={1}
          onValueChange={(v) => setVolume(v[0])}
          className="w-24 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:bg-player-foreground [&_[role=slider]]:border-0 [&_[data-radix-slider-range]]:bg-player-foreground hover:[&_[data-radix-slider-range]]:bg-primary [&_[data-radix-slider-track]]:h-1 [&_[data-radix-slider-track]]:bg-surface-elevated"
        />
        <Maximize2 
          size={16} 
          strokeWidth={2.5}
          className="text-player-muted hover:text-player-foreground cursor-pointer transition-colors" 
          onClick={toggleExpand}
        />
      </div>
    </footer>
  );
};

const formatTime = (pct: number) => {
  const totalSec = Math.round((pct / 100) * 240);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
};

export default PlayerBar;
