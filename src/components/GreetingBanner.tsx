import { recentlyPlayed } from "@/data/mockData";
import { Play } from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";

const GreetingBanner = () => {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const { play } = usePlayer();

  return (
    <section className="animate-slide-up">
      <h1 className="text-3xl font-extrabold text-foreground mb-6 tracking-tight">{greeting}</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {recentlyPlayed.map((p) => (
          <div
            key={p.id}
            onClick={() => play(p.tracks[0])} // Assuming the intent was to make the whole div clickable to play the first track
            className="flex items-center bg-surface-elevated/30 glass-premium hover:bg-surface-highlight hover:scale-[1.03] rounded-lg overflow-hidden group cursor-pointer transition-all duration-300 shadow-lg shadow-black/20"
          >
            <img src={p.coverUrl} alt={p.title} className="w-16 h-16 object-cover shadow-2xl group-hover:scale-110 transition-transform duration-500" />
            <span className="text-sm font-black text-white/90 px-4 truncate flex-1 tracking-tight">{p.title}</span>
            <button
              onClick={(e) => { e.stopPropagation(); play(p.tracks[0]); }} // Prevent div's onClick from firing again
              className="w-9 h-9 bg-primary rounded-full flex items-center justify-center mr-3 shadow-lg shadow-primary/25 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
            >
              <Play size={16} strokeWidth={2.5} className="text-primary-foreground ml-0.5" fill="currentColor" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GreetingBanner;
