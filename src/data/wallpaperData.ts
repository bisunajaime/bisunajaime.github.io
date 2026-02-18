// Sample wallpaper data - you can easily add more categories and wallpapers
export interface Wallpaper {
  id: string;
  url: string;
  thumbnail: string;
  category: string;
  name: string;
  accentColor?: string;
  downloadUrl?: string;
}

export const wallpaperCategories = [
  "all",
  "cozy",
  "winter",
  "iphone",
  "ultrawide",
  "macbook",
  "nature",
  "abstract",
  "minimal"
] as const;

export type WallpaperCategory = typeof wallpaperCategories[number];

// Top 5 featured wallpapers for the hero section
export const topWallpapers: Wallpaper[] = [
  {
    id: "top-1",
    url: "/assets/images/wallpapers/korea.jpg",
    thumbnail: "/assets/images/wallpapers/korea.jpg",
    category: "nature",
    name: "Korea 🌔",
    accentColor: "#93b1fdff"
  },
  {
    id: "top-2",
    url: "/assets/images/wallpapers/paris.jpg",
    thumbnail: "/assets/images/wallpapers/paris.jpg",
    category: "abstract",
    name: "Paris 🌷",
    accentColor: "#fdeab5ff"
  },
  {
    id: "top-4",
    url: "/assets/images/wallpapers/hokkaido.jpg",
    thumbnail: "/assets/images/wallpapers/hokkaido.jpg",
    category: "winter",
    name: "Hokkaido ❄️",
    accentColor: "#7dd3fc"
  },
  {
    id: "top-3",
    url: "/assets/images/wallpapers/kyoto.jpg",
    thumbnail: "/assets/images/wallpapers/kyoto.jpg",
    category: "cozy",
    name: "Kyoto 🍁",
    accentColor: "#ff948fff"
  },
  {
    id: "top-5",
    url: "/assets/images/wallpapers/snowy_ny.jpg",
    thumbnail: "/assets/images/wallpapers/snowy_ny.jpg",
    category: "minimal",
    name: "Snowy New York ⛄",
    accentColor: "#f9b381ff"
  },
  // {
  //   id: "top-6",
  //   url: "/assets/images/wallpapers/venice_canal.jpg",
  //   thumbnail: "/assets/images/wallpapers/venice_canal.jpg",
  //   category: "minimal",
  //   name: "Venice Canal ☀️",
  //   accentColor: "#81c3f9ff"
  // }
];

// Local wallpapers stored in /public/assets/images/wallpapers
export const sampleWallpapers: Wallpaper[] = [
  {
    id: "nature-1",
    url: "/assets/images/wallpapers/korea.jpg",
    thumbnail: "/assets/images/wallpapers/korea.jpg",
    category: "nature",
    name: "Korea 🌔",
    downloadUrl: "/assets/images/wallpapers/download/korea.png"
  },
  {
    id: "nature-2",
    url: "/assets/images/wallpapers/korea2.jpg",
    thumbnail: "/assets/images/wallpapers/korea2.jpg",
    category: "nature",
    name: "Korea 2 🌃",
    downloadUrl: "/assets/images/wallpapers/download/korea2.png"
  },
  {
    id: "cozy-1",
    url: "/assets/images/wallpapers/kyoto.jpg",
    thumbnail: "/assets/images/wallpapers/kyoto.jpg",
    category: "cozy",
    name: "Kyoto 🍁",
    downloadUrl: "/assets/images/wallpapers/download/kyoto.png"
  },
  {
    id: "abstract-1",
    url: "/assets/images/wallpapers/paris.jpg",
    thumbnail: "/assets/images/wallpapers/paris.jpg",
    category: "abstract",
    name: "Paris 🌷",
    downloadUrl: "/assets/images/wallpapers/download/paris.png"
  },
  {
    id: "winter-1",
    url: "/assets/images/wallpapers/hokkaido.jpg",
    thumbnail: "/assets/images/wallpapers/hokkaido.jpg",
    category: "winter",
    name: "Hokkaido ❄️",
    downloadUrl: "/assets/images/wallpapers/download/hokkaido.png"
  },
  {
    id: "winter-2",
    url: "/assets/images/wallpapers/sapporo.jpg",
    thumbnail: "/assets/images/wallpapers/sapporo.jpg",
    category: "winter",
    name: "Sapporo ❄️",
    downloadUrl: "/assets/images/wallpapers/download/sapporo.png"
  },
  {
    id: "winter-3",
    url: "/assets/images/wallpapers/snowy_sapporo.jpg",
    thumbnail: "/assets/images/wallpapers/snowy_sapporo.jpg",
    category: "winter",
    name: "Snowy Sapporo ⛄",
    downloadUrl: "/assets/images/wallpapers/download/snowy_sapporo.png"
  },
  {
    id: "winter-4",
    url: "/assets/images/wallpapers/snowy_ny.jpg",
    thumbnail: "/assets/images/wallpapers/snowy_ny.jpg",
    category: "winter",
    name: "Snowy New York 2 ⛄",
    downloadUrl: "/assets/images/wallpapers/download/snowy_ny.png"
  },
  {
    id: "winter-5",
    url: "/assets/images/wallpapers/snowy_ny_2.jpg",
    thumbnail: "/assets/images/wallpapers/snowy_ny_2.jpg",
    category: "winter",
    name: "Snowy New York ⛄",
    downloadUrl: "/assets/images/wallpapers/download/snowy_ny_2.png"
  },
  {
    id: "minimal-1",
    url: "/assets/images/wallpapers/venice_canal.jpg",
    thumbnail: "/assets/images/wallpapers/venice_canal.jpg",
    category: "minimal",
    name: "Venice Canal 🌕",
    downloadUrl: "/assets/images/wallpapers/download/venice_canal.png"
  }
];
