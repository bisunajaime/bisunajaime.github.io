// Non-wallpaper AI work. Wallpapers live in ./wallpaperData.

export interface AIWorkItem {
  id: string;
  name: string;
  /** Music only — shown under the title on the now-playing panel. */
  artist?: string;
  description?: string;
  /** Cover art / poster / screenshot shown in the grid tile. */
  thumbnail?: string;
  /** Full-size source opened in the lightbox. Falls back to thumbnail. */
  url?: string;
  /** Where the tile links to — track, video, or live site. */
  href?: string;
  /** Music only — path under /public, e.g. "/assets/audio/midnight-drive.mp3". */
  audioSrc?: string;
  /** Music only — drives the track-list filter chips. */
  genre?: string;
  /** Music only — length in seconds, baked in so the list needs no metadata fetches. */
  durationSeconds?: number;
  /** Model or tool used, shown as a small caption. */
  madeWith?: string;
}

/* Generated locally with MiniMax Music3. Titles come from each track's generation prompt. */
export const aiMusic: AIWorkItem[] = [
  {
    id: "tape-dreams",
    name: "Tape Dreams",
    artist: "MiniMax Music3",
    description: "Dreamy synthwave, 82 BPM",
    genre: "Chillwave",
    durationSeconds: 63,
    audioSrc: "/assets/audio/tape-dreams.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "night-studio",
    name: "Night Studio",
    artist: "MiniMax Music3",
    description: "Dusty jazz-hop, 82 BPM",
    genre: "Lo-fi Hip-Hop",
    durationSeconds: 73,
    audioSrc: "/assets/audio/night-studio.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "rainy-cafe",
    name: "Rainy Café",
    artist: "MiniMax Music3",
    description: "Warm lo-fi hip-hop, 70 BPM",
    genre: "Lo-fi Hip-Hop",
    durationSeconds: 89,
    audioSrc: "/assets/audio/rainy-cafe.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "neon-night-drive",
    name: "Neon Night Drive",
    artist: "MiniMax Music3",
    description: "Chillwave, 90 BPM",
    genre: "Chillwave",
    durationSeconds: 110,
    audioSrc: "/assets/audio/neon-night-drive.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "rooftop-midnight",
    name: "Rooftop Midnight",
    artist: "MiniMax Music3",
    description: "Lo-fi jazz fusion, 80 BPM",
    genre: "Jazz",
    durationSeconds: 63,
    audioSrc: "/assets/audio/rooftop-midnight.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "fogged-window",
    name: "Fogged Window",
    artist: "MiniMax Music3",
    description: "Lo-fi hip-hop, 65 BPM",
    genre: "Lo-fi Hip-Hop",
    durationSeconds: 76,
    audioSrc: "/assets/audio/fogged-window.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "ocean-sunset",
    name: "Ocean Sunset",
    artist: "MiniMax Music3",
    description: "Lo-fi chillwave, 75 BPM",
    genre: "Chillwave",
    durationSeconds: 95,
    audioSrc: "/assets/audio/ocean-sunset.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "sunday-morning-cafe",
    name: "Sunday Morning Café",
    artist: "MiniMax Music3",
    description: "Lo-fi jazz, 70 BPM",
    genre: "Jazz",
    durationSeconds: 81,
    audioSrc: "/assets/audio/sunday-morning-cafe.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "blue-hour",
    name: "Blue Hour",
    artist: "MiniMax Music3",
    description: "Lo-fi jazz, 65 BPM",
    genre: "Jazz",
    durationSeconds: 113,
    audioSrc: "/assets/audio/blue-hour.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "basement-club",
    name: "Basement Club",
    artist: "MiniMax Music3",
    description: "Smoky lo-fi jazz, 75 BPM",
    genre: "Jazz",
    durationSeconds: 114,
    audioSrc: "/assets/audio/basement-club.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "poolside-afternoon",
    name: "Poolside Afternoon",
    artist: "MiniMax Music3",
    description: "Airy lo-fi jazz, 80 BPM",
    genre: "Jazz",
    durationSeconds: 82,
    audioSrc: "/assets/audio/poolside-afternoon.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "last-train-home",
    name: "Last Train Home",
    artist: "MiniMax Music3",
    description: "Nocturnal lo-fi jazz, 72 BPM",
    genre: "Jazz",
    durationSeconds: 100,
    audioSrc: "/assets/audio/last-train-home.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "parisian-espresso",
    name: "Parisian Espresso",
    artist: "MiniMax Music3",
    description: "Chill jazz, 85 BPM",
    genre: "Jazz",
    durationSeconds: 86,
    audioSrc: "/assets/audio/parisian-espresso.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "dim-lounge",
    name: "Dim Lounge",
    artist: "MiniMax Music3",
    description: "Chill jazz, 78 BPM",
    genre: "Jazz",
    durationSeconds: 97,
    audioSrc: "/assets/audio/dim-lounge.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "old-record",
    name: "Old Record",
    artist: "MiniMax Music3",
    description: "Chill jazz, 72 BPM",
    genre: "Jazz",
    durationSeconds: 90,
    audioSrc: "/assets/audio/old-record.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "balcony-sunset",
    name: "Balcony Sunset",
    artist: "MiniMax Music3",
    description: "Chill jazz, 75 BPM",
    genre: "Jazz",
    durationSeconds: 72,
    audioSrc: "/assets/audio/balcony-sunset.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "rooftop-evening",
    name: "Rooftop Evening",
    artist: "MiniMax Music3",
    description: "Chill jazz funk, 82 BPM",
    genre: "Jazz",
    durationSeconds: 107,
    audioSrc: "/assets/audio/rooftop-evening.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "record-shop",
    name: "Record Shop",
    artist: "MiniMax Music3",
    description: "Lo-fi hip-hop, 70 BPM",
    genre: "Lo-fi Hip-Hop",
    durationSeconds: 73,
    audioSrc: "/assets/audio/record-shop.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "rain-on-glass",
    name: "Rain on Glass",
    artist: "MiniMax Music3",
    description: "Lo-fi hip-hop, 65 BPM",
    genre: "Lo-fi Hip-Hop",
    durationSeconds: 74,
    audioSrc: "/assets/audio/rain-on-glass.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "home-videos",
    name: "Home Videos",
    artist: "MiniMax Music3",
    description: "Lo-fi chillhop, 75 BPM",
    genre: "Lo-fi Hip-Hop",
    durationSeconds: 130,
    audioSrc: "/assets/audio/home-videos.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "field-at-dawn",
    name: "Field at Dawn",
    artist: "MiniMax Music3",
    description: "Lo-fi ambient, 60 BPM",
    genre: "Ambient",
    durationSeconds: 129,
    audioSrc: "/assets/audio/field-at-dawn.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "empty-station",
    name: "Empty Station",
    artist: "MiniMax Music3",
    description: "Lo-fi downtempo, 68 BPM",
    genre: "Downtempo",
    durationSeconds: 103,
    audioSrc: "/assets/audio/empty-station.mp3",
    madeWith: "MiniMax Music3",
  },
];

/* Product images / showcase renders. thumbnail is the grid tile; url is the full-size version. */
export const aiImages: AIWorkItem[] = [];

export const aiVideos: AIWorkItem[] = [];

export const aiWebsites: AIWorkItem[] = [];
