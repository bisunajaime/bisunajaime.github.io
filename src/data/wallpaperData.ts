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
    downloadUrl: "/assets/images/wallpapers/download/korea.webp"
  },
  {
    id: "nature-2",
    url: "/assets/images/wallpapers/korea2.jpg",
    thumbnail: "/assets/images/wallpapers/korea2.jpg",
    category: "nature",
    name: "Korea 2 🌃",
    downloadUrl: "/assets/images/wallpapers/download/korea2.webp"
  },
  {
    id: "cozy-1",
    url: "/assets/images/wallpapers/kyoto.jpg",
    thumbnail: "/assets/images/wallpapers/kyoto.jpg",
    category: "cozy",
    name: "Kyoto 🍁",
    downloadUrl: "/assets/images/wallpapers/download/kyoto.webp"
  },
  {
    id: "abstract-1",
    url: "/assets/images/wallpapers/paris.jpg",
    thumbnail: "/assets/images/wallpapers/paris.jpg",
    category: "abstract",
    name: "Paris 🌷",
    downloadUrl: "/assets/images/wallpapers/download/paris.webp"
  },
  {
    id: "winter-1",
    url: "/assets/images/wallpapers/hokkaido.jpg",
    thumbnail: "/assets/images/wallpapers/hokkaido.jpg",
    category: "winter",
    name: "Hokkaido ❄️",
    downloadUrl: "/assets/images/wallpapers/download/hokkaido.webp"
  },
  {
    id: "winter-2",
    url: "/assets/images/wallpapers/sapporo.jpg",
    thumbnail: "/assets/images/wallpapers/sapporo.jpg",
    category: "winter",
    name: "Sapporo ❄️",
    downloadUrl: "/assets/images/wallpapers/download/sapporo.webp"
  },
  {
    id: "winter-3",
    url: "/assets/images/wallpapers/snowy_sapporo.jpg",
    thumbnail: "/assets/images/wallpapers/snowy_sapporo.jpg",
    category: "winter",
    name: "Snowy Sapporo ⛄",
    downloadUrl: "/assets/images/wallpapers/download/snowy_sapporo.webp"
  },
  {
    id: "winter-4",
    url: "/assets/images/wallpapers/snowy_ny.jpg",
    thumbnail: "/assets/images/wallpapers/snowy_ny.jpg",
    category: "winter",
    name: "Snowy New York 2 ⛄",
    downloadUrl: "/assets/images/wallpapers/download/snowy_ny.webp"
  },
  {
    id: "winter-5",
    url: "/assets/images/wallpapers/snowy_ny_2.jpg",
    thumbnail: "/assets/images/wallpapers/snowy_ny_2.jpg",
    category: "winter",
    name: "Snowy New York ⛄",
    downloadUrl: "/assets/images/wallpapers/download/snowy_ny_2.webp"
  },
  {
    id: "minimal-1",
    url: "/assets/images/wallpapers/venice_canal.jpg",
    thumbnail: "/assets/images/wallpapers/venice_canal.jpg",
    category: "minimal",
    name: "Venice Canal 🌕",
    downloadUrl: "/assets/images/wallpapers/download/venice_canal.webp"
  },
  {
    id: "grand-canyon",
    url: "/assets/images/wallpapers/grand-canyon.webp",
    thumbnail: "/assets/images/wallpapers/grand-canyon.webp",
    category: "nature",
    name: "Grand Canyon 🎨",
    downloadUrl: "/assets/images/wallpapers/download/grand-canyon.png"
  },
  {
    id: "aegean-blue",
    url: "/assets/images/wallpapers/aegean-blue.webp",
    thumbnail: "/assets/images/wallpapers/aegean-blue.webp",
    category: "minimal",
    name: "Aegean Blue 💙",
    downloadUrl: "/assets/images/wallpapers/download/aegean-blue.png"
  },
  {
    id: "martian-canyon",
    url: "/assets/images/wallpapers/martian-canyon.webp",
    thumbnail: "/assets/images/wallpapers/martian-canyon.webp",
    category: "abstract",
    name: "Martian Canyon 🔴",
    downloadUrl: "/assets/images/wallpapers/download/martian-canyon.png"
  },
  {
    id: "europa",
    url: "/assets/images/wallpapers/europa.webp",
    thumbnail: "/assets/images/wallpapers/europa.webp",
    category: "minimal",
    name: "Europa 🧊",
    downloadUrl: "/assets/images/wallpapers/download/europa.png"
  },
  {
    id: "petra",
    url: "/assets/images/wallpapers/petra.webp",
    thumbnail: "/assets/images/wallpapers/petra.webp",
    category: "nature",
    name: "Petra 🏜️",
    downloadUrl: "/assets/images/wallpapers/download/petra.png"
  },
  {
    id: "fuji-moonrise",
    url: "/assets/images/wallpapers/fuji-moonrise.webp",
    thumbnail: "/assets/images/wallpapers/fuji-moonrise.webp",
    category: "nature",
    name: "Fuji Moonrise 🌙",
    downloadUrl: "/assets/images/wallpapers/download/fuji-moonrise.png"
  },
  {
    id: "philosophers-path",
    url: "/assets/images/wallpapers/philosophers-path.webp",
    thumbnail: "/assets/images/wallpapers/philosophers-path.webp",
    category: "cozy",
    name: "Philosopher's Path 🌸",
    downloadUrl: "/assets/images/wallpapers/download/philosophers-path.png"
  },
  {
    id: "great-wall",
    url: "/assets/images/wallpapers/great-wall.webp",
    thumbnail: "/assets/images/wallpapers/great-wall.webp",
    category: "nature",
    name: "Great Wall 🏮",
    downloadUrl: "/assets/images/wallpapers/download/great-wall.png"
  },
  {
    id: "arashiyama",
    url: "/assets/images/wallpapers/arashiyama.webp",
    thumbnail: "/assets/images/wallpapers/arashiyama.webp",
    category: "cozy",
    name: "Arashiyama 🍁",
    downloadUrl: "/assets/images/wallpapers/download/arashiyama.png"
  },
  {
    id: "storm-lighthouse",
    url: "/assets/images/wallpapers/storm-lighthouse.webp",
    thumbnail: "/assets/images/wallpapers/storm-lighthouse.webp",
    category: "nature",
    name: "Storm Lighthouse 🌩️",
    downloadUrl: "/assets/images/wallpapers/download/storm-lighthouse.png"
  },
  {
    id: "neuschwanstein",
    url: "/assets/images/wallpapers/neuschwanstein.webp",
    thumbnail: "/assets/images/wallpapers/neuschwanstein.webp",
    category: "cozy",
    name: "Neuschwanstein 🏰",
    downloadUrl: "/assets/images/wallpapers/download/neuschwanstein.png"
  },
  {
    id: "reykjavik",
    url: "/assets/images/wallpapers/reykjavik.webp",
    thumbnail: "/assets/images/wallpapers/reykjavik.webp",
    category: "winter",
    name: "Reykjavik ❄️",
    downloadUrl: "/assets/images/wallpapers/download/reykjavik.png"
  },
  {
    id: "alpine-blizzard",
    url: "/assets/images/wallpapers/alpine-blizzard.webp",
    thumbnail: "/assets/images/wallpapers/alpine-blizzard.webp",
    category: "winter",
    name: "Alpine Blizzard 🏔️",
    downloadUrl: "/assets/images/wallpapers/download/alpine-blizzard.png"
  },
  {
    id: "santorini-moonlight",
    url: "/assets/images/wallpapers/santorini-moonlight.webp",
    thumbnail: "/assets/images/wallpapers/santorini-moonlight.webp",
    category: "cozy",
    name: "Santorini Moonlight 🌕",
    downloadUrl: "/assets/images/wallpapers/download/santorini-moonlight.png"
  },
  {
    id: "joshua-tree-night",
    url: "/assets/images/wallpapers/joshua-tree-night.webp",
    thumbnail: "/assets/images/wallpapers/joshua-tree-night.webp",
    category: "abstract",
    name: "Joshua Tree Night 🌵",
    downloadUrl: "/assets/images/wallpapers/download/joshua-tree-night.png"
  },
  {
    id: "birch-river",
    url: "/assets/images/wallpapers/birch-river.webp",
    thumbnail: "/assets/images/wallpapers/birch-river.webp",
    category: "nature",
    name: "Birch River 🍂",
    downloadUrl: "/assets/images/wallpapers/download/birch-river.png"
  }
];
