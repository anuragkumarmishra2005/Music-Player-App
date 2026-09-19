import { Playlist } from "@/data/mockData";
import PlaylistCard from "./PlaylistCard";

interface Props {
  title: string;
  playlists: Playlist[];
}

const PlaylistSection = ({ title, playlists }: Props) => (
  <section>
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold text-foreground hover:underline cursor-pointer">{title}</h2>
      <span className="text-sm font-semibold text-muted-foreground hover:underline cursor-pointer">Show all</span>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {playlists.map((p) => (
        <PlaylistCard key={p.id} playlist={p} />
      ))}
    </div>
  </section>
);

export default PlaylistSection;
