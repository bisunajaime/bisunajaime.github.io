import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import {

  Download } from "lucide-react";
import {


  sampleWallpapers, type WallpaperCategory } from "../../data/wallpaperData";

import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";

export function Wallpapers() {
  const [selectedCategory, setSelectedCategory] = useState<WallpaperCategory>("all");
  const [selectedWallpaper, setSelectedWallpaper] = useState<string | null>("nature-1");
  const previewRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  const filteredWallpapers =
    selectedCategory === "all"
      ? sampleWallpapers
      : sampleWallpapers.filter((wallpaper) => wallpaper.category === selectedCategory);

  const handleCategoryChange = (category: WallpaperCategory) => {
    setSelectedCategory(category);
    // Auto-select first wallpaper in the category
    const firstWallpaper =
      category === "all"
        ? sampleWallpapers[0]
        : sampleWallpapers.find(w => w.category === category);
    if (firstWallpaper) {
      setSelectedWallpaper(firstWallpaper.id);
      swiperRef.current?.slideTo(0);
    }
  };

  const handleDownload = (url: string) => {
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const selectedWallpaperData = filteredWallpapers.find(w => w.id === selectedWallpaper) || filteredWallpapers[0];
  const downloadUrl = selectedWallpaperData?.downloadUrl || selectedWallpaperData?.url;

  const handleWallpaperSelect = (wallpaperId: string) => {
    setSelectedWallpaper(wallpaperId);
    const nextIndex = filteredWallpapers.findIndex((wallpaper) => wallpaper.id === wallpaperId);
    if (nextIndex >= 0) {
      swiperRef.current?.slideTo(nextIndex);
    }
  };

  useEffect(() => {
    if (filteredWallpapers.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      const currentIndex = filteredWallpapers.findIndex((wallpaper) => wallpaper.id === selectedWallpaper);
      const nextIndex = currentIndex >= 0
        ? (currentIndex + 1) % filteredWallpapers.length
        : 0;
      const nextWallpaper = filteredWallpapers[nextIndex];

      if (nextWallpaper) {
        setSelectedWallpaper(nextWallpaper.id);
        swiperRef.current?.slideTo(nextIndex);
      }
    }, 5000);

    return () => {
      window.clearInterval(interval);
    };
  }, [filteredWallpapers, selectedWallpaper]);

  return (
    <section id="wallpapers" className="px-4 py-20 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl text-center mb-4">Wallpaper Pack</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          A curated collection of beautiful wallpapers for your devices. Generated on my workstation using the Qwen model.
        </p>

        {/* Category Tabs */}
        {/* <div className="flex flex-wrap justify-center gap-2 mb-8">
          {wallpaperCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryChange(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div> */}

        {/* Main Preview with Blurred Background */}
        {selectedWallpaperData && (
          <div
            ref={previewRef}
            className="mb-10 relative overflow-hidden max-w-6xl mx-auto md:rounded-2xl"
          >
            {/* Blurred Background */}
            <div
              className="absolute inset-0 hidden bg-cover bg-center blur-2xl scale-110 opacity-50 md:block"
              style={{ backgroundImage: `url(${selectedWallpaperData.url})` }}
            />

            {/* Main Image Container */}
            <div className="relative z-10 p-0 md:p-14">
              <div className="bg-transparent md:bg-background/90 border-0 md:border border-border rounded-none md:rounded-xl shadow-none md:shadow-2xl p-0 md:p-6 w-full md:max-w-4xl mx-auto">
                <img
                  src={selectedWallpaperData.url}
                  alt={selectedWallpaperData.name}
                  className="w-full h-auto rounded-none shadow-none md:rounded md:shadow-xl"
                />
                <div className="mt-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">
                    {selectedWallpaperData.name}
                  </h3>
                  <Button
                    onClick={() => downloadUrl && handleDownload(downloadUrl)}
                    className="gap-2"
                  >
                    <Download className="size-4" /> Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Swiper Grid of Thumbnails */}
        <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden">
          <Swiper
            modules={[Keyboard]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              const nextWallpaper = filteredWallpapers[swiper.activeIndex];
              if (nextWallpaper) {
                setSelectedWallpaper(nextWallpaper.id);
              }
            }}
            centeredSlides
            slidesPerView={2}
            spaceBetween={16}
            keyboard={{ enabled: true }}
            breakpoints={{
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="w-full"
            wrapperClass="py-6"
          >
            {filteredWallpapers.map((wallpaper) => (
              <SwiperSlide key={wallpaper.id} className="h-auto">
                <button
                  onClick={() => handleWallpaperSelect(wallpaper.id)}
                  className={`group relative rounded-lg overflow-hidden aspect-video transition-transform w-full ${selectedWallpaper === wallpaper.id
                    ? "ring-4 ring-blue-500"
                    : "ring-1 ring-gray-200"
                    }`}
                >
                  <img
                    src={wallpaper.thumbnail}
                    alt={wallpaper.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {selectedWallpaper === wallpaper.id && (
                    <div className="absolute inset-0 flex items-center justify-center">
                    </div>
                  )}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
