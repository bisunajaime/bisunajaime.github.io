import { portfolioData } from "../../data/portfolioData";
import { sampleWallpapers, topWallpapers } from "../../data/wallpaperData";

type CollectOptions = {
  includeRemote?: boolean;
};

type PreloadGroup = {
  critical: string[];
  background: string[];
  all: string[];
};

const isRemote = (url: string) => /^https?:\/\//i.test(url);

const normalizeUrl = (url: string) => url.trim();

const addUrl = (set: Set<string>, url?: string, includeRemote = true) => {
  if (!url) return;
  const normalized = normalizeUrl(url);
  if (!normalized) return;
  if (!includeRemote && isRemote(normalized)) return;
  set.add(normalized);
};

const addUrls = (set: Set<string>, urls: Array<string | undefined>, includeRemote = true) => {
  urls.forEach((url) => addUrl(set, url, includeRemote));
};

export function collectAssetUrls(options: CollectOptions = {}): PreloadGroup {
  const includeRemote = options.includeRemote ?? true;
  const all = new Set<string>();
  const critical = new Set<string>();

  // Hero wallpapers (critical for initial render)
  const heroWallpaper = topWallpapers[0];
  if (heroWallpaper) {
    addUrl(critical, heroWallpaper.url, includeRemote);
    addUrl(critical, heroWallpaper.thumbnail, includeRemote);
  }

  // Initial projects (top 3 cards shown by default)
  const initialProjects = portfolioData.projects.slice(0, 3);
  initialProjects.forEach((project) => addUrl(critical, project.cover_img, includeRemote));

  // All portfolio covers
  portfolioData.experiences.forEach((exp) => addUrl(all, exp.cover_img, includeRemote));
  portfolioData.organizations.forEach((org) => addUrl(all, org.cover_img, includeRemote));
  portfolioData.events.hosted.forEach((event) => addUrl(all, event.cover_img, includeRemote));
  portfolioData.events.attended.forEach((event) => addUrl(all, event.cover_img, includeRemote));

  portfolioData.projects.forEach((project) => {
    addUrl(all, project.cover_img, includeRemote);
    addUrls(all, project.sample_ui ?? [], includeRemote);
  });

  // Wallpapers (used in hero & wallpaper gallery)
  topWallpapers.forEach((wallpaper) => {
    addUrl(all, wallpaper.url, includeRemote);
    addUrl(all, wallpaper.thumbnail, includeRemote);
  });
  sampleWallpapers.forEach((wallpaper) => {
    addUrl(all, wallpaper.url, includeRemote);
    addUrl(all, wallpaper.thumbnail, includeRemote);
  });

  // Ensure critical assets are included in the full list
  critical.forEach((url) => all.add(url));

  const allList = Array.from(all);
  const criticalList = Array.from(critical);
  const background = allList.filter((url) => !critical.has(url));

  return { critical: criticalList, background, all: allList };
}

type PreloadOptions = {
  timeoutMs?: number;
  onProgress?: (loaded: number, total: number) => void;
};

export function preloadImages(urls: string[], options: PreloadOptions = {}) {
  const uniqueUrls = Array.from(new Set(urls)).filter(Boolean);
  const total = uniqueUrls.length;
  let loaded = 0;

  if (total === 0) {
    options.onProgress?.(0, 0);
    return Promise.resolve();
  }

  return Promise.all(
    uniqueUrls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          let done = false;

          const finish = () => {
            if (done) return;
            done = true;
            loaded += 1;
            options.onProgress?.(loaded, total);
            resolve();
          };

          img.onload = finish;
          img.onerror = finish;
          img.decoding = "async";
          img.src = src;

          if (options.timeoutMs) {
            window.setTimeout(finish, options.timeoutMs);
          }
        }),
    ),
  ).then(() => undefined);
}

export function prefetchImages(urls: string[]) {
  void preloadImages(urls);
}
