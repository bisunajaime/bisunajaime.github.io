import { useEffect, useMemo, useRef, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "./shared/button";
import {
  sampleWallpapers,
  wallpaperCategories,
  type WallpaperCategory,
} from "../../data/wallpaperData";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;

  return (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT" ||
    target.isContentEditable
  );
}

export function Wallpapers() {
  const [selectedCategory, setSelectedCategory] = useState<WallpaperCategory>("all");
  const [selectedWallpaper, setSelectedWallpaper] = useState<string | null>(
    sampleWallpapers[0]?.id ?? null,
  );

  const sectionRef = useRef<HTMLElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  const filteredWallpapers = useMemo(
    () =>
      selectedCategory === "all"
        ? sampleWallpapers
        : sampleWallpapers.filter((wallpaper) => wallpaper.category === selectedCategory),
    [selectedCategory],
  );

  const handleCategoryChange = (category: WallpaperCategory) => {
    setSelectedCategory(category);
    const firstWallpaper =
      category === "all"
        ? sampleWallpapers[0]
        : sampleWallpapers.find((wallpaper) => wallpaper.category === category);

    if (firstWallpaper) {
      setSelectedWallpaper(firstWallpaper.id);
      swiperRef.current?.slideTo(0);
    }
  };

  const handleWallpaperSelect = (wallpaperId: string) => {
    setSelectedWallpaper(wallpaperId);
    const nextIndex = filteredWallpapers.findIndex((wallpaper) => wallpaper.id === wallpaperId);
    if (nextIndex >= 0) {
      swiperRef.current?.slideTo(nextIndex);
      previewRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (!filteredWallpapers.length) {
      setSelectedWallpaper(null);
      return;
    }

    if (!selectedWallpaper || !filteredWallpapers.some((item) => item.id === selectedWallpaper)) {
      setSelectedWallpaper(filteredWallpapers[0]?.id ?? null);
    }
  }, [filteredWallpapers, selectedWallpaper]);

  useEffect(() => {
    const handleArrowNavigation = (event: KeyboardEvent) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      if (isTypingTarget(event.target)) return;
      if (!filteredWallpapers.length || !selectedWallpaper || !sectionRef.current) return;

      const sectionBounds = sectionRef.current.getBoundingClientRect();
      const isSectionVisible =
        sectionBounds.top < window.innerHeight && sectionBounds.bottom > 0;

      if (!isSectionVisible) return;

      const currentIndex = filteredWallpapers.findIndex(
        (wallpaper) => wallpaper.id === selectedWallpaper,
      );

      if (currentIndex < 0) return;

      const delta = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = Math.min(
        filteredWallpapers.length - 1,
        Math.max(0, currentIndex + delta),
      );

      if (nextIndex === currentIndex) return;

      event.preventDefault();
      setSelectedWallpaper(filteredWallpapers[nextIndex].id);
      swiperRef.current?.slideTo(nextIndex);
    };

    window.addEventListener("keydown", handleArrowNavigation);
    return () => {
      window.removeEventListener("keydown", handleArrowNavigation);
    };
  }, [filteredWallpapers, selectedWallpaper]);

  const selectedWallpaperData =
    filteredWallpapers.find((wallpaper) => wallpaper.id === selectedWallpaper) ??
    filteredWallpapers[0];
  const downloadUrl = selectedWallpaperData?.downloadUrl || selectedWallpaperData?.url;

  return (
    <section
      ref={sectionRef}
      id="wallpapers"
      className="px-4 py-[var(--section-padding-y)] sm:px-6"
    >
      <div className="mx-auto w-full max-w-[var(--page-max-width)]">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Wallpaper Pack
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-muted-foreground sm:text-lg">
          A curated collection of wallpapers for your phone and desktop. Created on
          my workstation using the Qwen model.
        </p>

        <div className="mt-8 overflow-x-auto pb-1">
          <div className="mx-auto flex w-max min-w-full justify-start gap-2 sm:justify-center">
            {wallpaperCategories.map((category) => (
              <button
                type="button"
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`inline-flex h-11 items-center rounded-full border px-4 text-sm font-medium capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  selectedCategory === category
                    ? "border-primary/25 bg-primary/12 text-primary"
                    : "border-border bg-background text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {selectedWallpaperData ? (
          <div
            ref={previewRef}
            className="glass-panel mx-auto mt-8 mb-10 max-w-6xl overflow-hidden rounded-[1.75rem] p-4 sm:p-6"
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-secondary">
              <img
                src={selectedWallpaperData.url}
                alt={selectedWallpaperData.name}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                {selectedWallpaperData.name}
              </h3>
              <Button
                onClick={() => downloadUrl && handleDownload(downloadUrl)}
                className="gap-2"
              >
                <Download className="size-4" />
                Download
              </Button>
            </div>
          </div>
        ) : null}

        <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              const nextWallpaper = filteredWallpapers[swiper.activeIndex];
              if (nextWallpaper) {
                setSelectedWallpaper(nextWallpaper.id);
              }
            }}
            slidesPerView={2.15}
            spaceBetween={14}
            breakpoints={{
              640: { slidesPerView: 3.15, spaceBetween: 16 },
              1024: { slidesPerView: 4.1, spaceBetween: 18 },
            }}
            className="w-full"
            wrapperClass="py-2 sm:py-4"
          >
            {filteredWallpapers.map((wallpaper) => (
              <SwiperSlide key={wallpaper.id} className="h-auto">
                <button
                  type="button"
                  onClick={() => handleWallpaperSelect(wallpaper.id)}
                  aria-label={`Preview ${wallpaper.name}`}
                  className={`group relative w-full overflow-hidden rounded-2xl border bg-secondary/70 transition-all ${
                    selectedWallpaper === wallpaper.id
                      ? "border-primary/60 ring-2 ring-primary/30"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <img
                    src={wallpaper.thumbnail}
                    alt={wallpaper.name}
                    className="aspect-video h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
