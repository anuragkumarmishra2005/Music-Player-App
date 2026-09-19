export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
  audioUrl?: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  tracks: Track[];
}

const covers = [
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1484755560615-a4c64e778a6c?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=300&h=300&fit=crop",
];

export const tracks: Track[] = [
  { id: "1", title: "Midnight City", artist: "M83", album: "Hurry Up, We're Dreaming", duration: "4:03", coverUrl: covers[0] },
  { id: "2", title: "Electric Feel", artist: "MGMT", album: "Oracular Spectacular", duration: "3:49", coverUrl: covers[1] },
  { id: "3", title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: "3:20", coverUrl: covers[2] },
  { id: "4", title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", duration: "3:23", coverUrl: covers[3] },
  { id: "5", title: "Heat Waves", artist: "Glass Animals", album: "Dreamland", duration: "3:58", coverUrl: covers[4] },
  { id: "6", title: "Take On Me", artist: "a-ha", album: "Hunting High and Low", duration: "3:48", coverUrl: covers[5] },
  { id: "7", title: "Dreams", artist: "Fleetwood Mac", album: "Rumours", duration: "4:14", coverUrl: covers[6] },
  { id: "8", title: "Starboy", artist: "The Weeknd", album: "Starboy", duration: "3:50", coverUrl: covers[7] },
  { id: "9", title: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera", duration: "5:55", coverUrl: covers[8] },
  { id: "10", title: "Stairway to Heaven", artist: "Led Zeppelin", album: "Led Zeppelin IV", duration: "8:02", coverUrl: covers[9] },
  { id: "11", title: "Hotel California", artist: "Eagles", album: "Hotel California", duration: "6:30", coverUrl: covers[10] },
  { id: "12", title: "Lose Yourself", artist: "Eminem", album: "8 Mile Soundtrack", duration: "5:26", coverUrl: covers[11] },
  { id: "13", title: "Shape of You", artist: "Ed Sheeran", album: "÷", duration: "3:53", coverUrl: covers[0] },
  { id: "14", title: "Rolling in the Deep", artist: "Adele", album: "21", duration: "3:48", coverUrl: covers[1] },
  { id: "15", title: "Uptown Funk", artist: "Bruno Mars", album: "Uptown Special", duration: "4:30", coverUrl: covers[2] },
  { id: "16", title: "Someone Like You", artist: "Adele", album: "21", duration: "4:45", coverUrl: covers[3] },
  { id: "17", title: "Thinking Out Loud", artist: "Ed Sheeran", album: "×", duration: "4:41", coverUrl: covers[4] },
  { id: "18", title: "Despacito", artist: "Luis Fonsi", album: "Vida", duration: "4:42", coverUrl: covers[5] },
  { id: "19", title: "Old Town Road", artist: "Lil Nas X", album: "7 EP", duration: "2:37", coverUrl: covers[6] },
  { id: "20", title: "Bad Guy", artist: "Billie Eilish", album: "When We All Fall Asleep", duration: "3:14", coverUrl: covers[7] },
  { id: "21", title: "Sunflower", artist: "Post Malone", album: "Spider-Man Soundtrack", duration: "2:38", coverUrl: covers[8] },
  { id: "22", title: "Rockstar", artist: "Post Malone", album: "Beerbongs & Bentleys", duration: "3:38", coverUrl: covers[9] },
  { id: "23", title: "Señorita", artist: "Shawn Mendes", album: "Señorita", duration: "3:11", coverUrl: covers[10] },
  { id: "24", title: "Watermelon Sugar", artist: "Harry Styles", album: "Fine Line", duration: "2:54", coverUrl: covers[11] },
  { id: "25", title: "Ishqa va", artist: "Unknown Artist", album: "Single", duration: "3:45", coverUrl: covers[0] },
  { id: "26", title: "Yad rahi", artist: "Unknown Artist", album: "Single", duration: "3:30", coverUrl: covers[1] },
  { id: "27", title: "By my side", artist: "Unknown Artist", album: "Single", duration: "4:00", coverUrl: covers[2] },
  { id: "28", title: "Mann mera", artist: "Gajendra Verma", album: "Table No. 21", duration: "3:18", coverUrl: covers[3] },
  { id: "29", title: "Jogan", artist: "Unknown Artist", album: "Single", duration: "3:10", coverUrl: covers[4] },
  { id: "30", title: "Tere utto sab var deyan", artist: "Unknown Artist", album: "Single", duration: "3:25", coverUrl: covers[5] },
  { id: "31", title: "Into you", artist: "Unknown Artist", album: "Single", duration: "3:50", coverUrl: covers[6] },
  { id: "32", title: "Saddi galli aja", artist: "Ayushmann Khurrana", album: "Nautanki Saala", duration: "4:12", coverUrl: covers[7] },
  { id: "33", title: "Ishq", artist: "Unknown Artist", album: "Single", duration: "3:40", coverUrl: covers[8] },
  { id: "34", title: "Lut gaye", artist: "Jubin Nautiyal", album: "Single", duration: "3:45", coverUrl: covers[9] },
  { id: "35_dhun_local", title: "Dhun", artist: "Local Instrumental", album: "Single", duration: "3:20", coverUrl: covers[10], audioUrl: "/dhun.mp3" },
  { id: "36", title: "Sun saathiya", artist: "Priya Saraiya", album: "ABCD 2", duration: "3:40", coverUrl: covers[11] },
  { id: "37", title: "Tum hi ana", artist: "Jubin Nautiyal", album: "Marjaavaan", duration: "4:09", coverUrl: covers[0] },
  { id: "38", title: "Bekhayali", artist: "Sachet Tandon", album: "Kabir Singh", duration: "6:11", coverUrl: covers[1] },
  { id: "39", title: "Tota jo kabhi tara", artist: "Atif Aslam", album: "A Flying Jatt", duration: "5:05", coverUrl: covers[2] },
  { id: "40", title: "Dard", artist: "Unknown Artist", album: "Single", duration: "4:15", coverUrl: covers[3] },
  { id: "41", title: "Pal", artist: "Arijit Singh", album: "Jalebi", duration: "4:06", coverUrl: covers[4] },
  { id: "42", title: "Jab tak", artist: "Armaan Malik", album: "M.S. Dhoni", duration: "2:54", coverUrl: covers[5] },
  { id: "43", title: "Kabhi jo baadal barse", artist: "Arijit Singh", album: "Jackpot", duration: "4:14", coverUrl: covers[6] },
  { id: "44", title: "Barbaadiyan", artist: "Unknown Artist", album: "Single", duration: "3:30", coverUrl: covers[7] },
  { id: "45", title: "Humraah", artist: "Sachet Tandon", album: "Malang", duration: "4:59", coverUrl: covers[8] },
  { id: "46", title: "Lo safar", artist: "Jubin Nautiyal", album: "Baaghi 2", duration: "4:42", coverUrl: covers[9] },
  { id: "47", title: "Koun tujhe", artist: "Palak Muchhal", album: "M.S. Dhoni", duration: "4:01", coverUrl: covers[10] },
  { id: "48", title: "Aasma aasma", artist: "Unknown Artist", album: "Single", duration: "3:55", coverUrl: covers[11] },
  { id: "49", title: "Meri banogi kya", artist: "Rito Riba", album: "Single", duration: "3:25", coverUrl: covers[0] },
  { id: "50", title: "Jug jug jeeva", artist: "Sachet Tandon", album: "Shiddat", duration: "3:40", coverUrl: covers[1] },
  { id: "51", title: "Bol do na zara", artist: "Armaan Malik", album: "Azhar", duration: "4:53", coverUrl: covers[2] },
  { id: "52", title: "Samjhawan", artist: "Arijit Singh", album: "Humpty Sharma Ki Dulhania", duration: "4:29", coverUrl: covers[3] },
  { id: "53", title: "Ehsaas", artist: "Unknown Artist", album: "Single", duration: "3:50", coverUrl: covers[4] },
  { id: "54", title: "Dekhte dekhte", artist: "Atif Aslam", album: "Batti Gul Meter Chalu", duration: "4:16", coverUrl: covers[5] },
  { id: "55", title: "Pani da rang", artist: "Ayushmann Khurrana", album: "Vicky Donor", duration: "4:00", coverUrl: covers[6] },
  { id: "56", title: "Tera zikr", artist: "Darshan Raval", album: "Single", duration: "3:30", coverUrl: covers[7] },
  { id: "57", title: "Chandani", artist: "Unknown Artist", album: "Single", duration: "3:40", coverUrl: covers[8] },
  { id: "58", title: "Zara Zara", artist: "Bombay Jayashri", album: "Rehnaa Hai Terre Dil Mein", duration: "5:04", coverUrl: covers[9] },
  { id: "59", title: "Dil galti kar baitha hai", artist: "Jubin Nautiyal", album: "Single", duration: "4:04", coverUrl: covers[10] },
  { id: "60", title: "Aja na ferrari mai", artist: "Armaan Malik", album: "Single", duration: "3:10", coverUrl: covers[11] },
  { id: "61", title: "Khariyat", artist: "Arijit Singh", album: "Chhichhore", duration: "4:40", coverUrl: covers[0] },
  { id: "62", title: "Sawal", artist: "Unknown Artist", album: "Single", duration: "3:15", coverUrl: covers[1] },
  { id: "63", title: "Nakhre", artist: "Unknown Artist", album: "Single", duration: "3:20", coverUrl: covers[2] },
];

export const playlists: Playlist[] = [
  { id: "1", title: "Today's Top Hits", description: "The hottest tracks right now", coverUrl: covers[0], tracks: tracks.slice(0, 6) },
  { id: "2", title: "Chill Vibes", description: "Relax and unwind with smooth beats", coverUrl: covers[1], tracks: tracks.slice(4, 10) },
  { id: "3", title: "Throwback Classics", description: "Timeless hits from the legends", coverUrl: covers[5], tracks: tracks.slice(8, 14) },
  { id: "4", title: "Indie Paradise", description: "Handpicked indie gems", coverUrl: covers[2], tracks: tracks.slice(0, 6) },
  { id: "5", title: "Workout Beast Mode", description: "Push harder, go further", coverUrl: covers[3], tracks: tracks.slice(10, 16) },
  { id: "6", title: "Late Night Drive", description: "Perfect songs for midnight roads", coverUrl: covers[4], tracks: tracks.slice(6, 12) },
  { id: "7", title: "Feel Good Friday", description: "Start your weekend with energy", coverUrl: covers[6], tracks: tracks.slice(12, 18) },
  { id: "8", title: "Deep Focus", description: "Concentrate with zero distractions", coverUrl: covers[7], tracks: tracks.slice(2, 8) },
  { id: "9", title: "Pop Rising", description: "The future of pop starts here", coverUrl: covers[8], tracks: tracks.slice(14, 20) },
  { id: "10", title: "Rap Caviar", description: "The biggest hip-hop bangers", coverUrl: covers[9], tracks: tracks.slice(16, 22) },
];

export const recentlyPlayed = playlists.slice(0, 6);
export const madeForYou = playlists.slice(4, 10);
export const trending = playlists.slice(2, 7);
