import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const ytSearch = require("yt-search");

const ytSearchPlugin = () => ({
  name: "yt-search-plugin",
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      if (req.url && (req.url.includes("/api/fetch-source") || req.url.includes("/api/deezer-preview"))) {
        console.log(`[AUDIO SERVER] Incoming request: ${req.url}`);
        
        // Add CORS headers
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.end();
          return;
        }

        try {
          const urlObj = new URL(req.url, `http://${req.headers.host || "localhost"}`);
          const query = urlObj.searchParams.get("q");
          
          if (req.url.includes("/api/fetch-source")) {
            if (query) {
              console.log(`[AUDIO SERVER] Searching YouTube for: "${query}"`);
              const r = await ytSearch(query);
              if (r.videos && r.videos.length > 0) {
                const video = r.videos[0];
                console.log(`[AUDIO SERVER] SUCCESS: Found YouTube video ID ${video.videoId}`);
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 200;
                res.end(JSON.stringify({ 
                  url: `https://www.youtube.com/watch?v=${video.videoId}`,
                  videoId: video.videoId,
                  title: video.title
                }));
                return;
              }
            }
          } else if (req.url.includes("/api/deezer-preview")) {
            if (query) {
              console.log(`[AUDIO SERVER] Searching Deezer for: "${query}"`);
              const response = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(query)}`);
              const data: any = await response.json();
              if (data.data && data.data.length > 0) {
                const track = data.data[0];
                console.log(`[AUDIO SERVER] SUCCESS: Found Deezer preview for "${track.title}"`);
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 200;
                res.end(JSON.stringify({ 
                  url: track.preview,
                  title: track.title,
                  artist: track.artist.name
                }));
                return;
              }
            }
          }

          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "No results found" }));
        } catch (e: any) {
          console.error("[AUDIO SERVER] Error:", e.message);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: e.message }));
        }
        return;
      }
      next();
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/Music-Player-App/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), ytSearchPlugin(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
