import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { Download, ExternalLink, X } from "lucide-react";
import { Button } from "./shared/button";
import { MusicPlayer } from "./MusicPlayer";
import { sampleWallpapers } from "../../data/wallpaperData";
import { aiImages, aiMusic, aiVideos, aiWebsites, type AIWorkItem } from "../../data/aiWorkData";
import { useMusic } from "../audio/MusicProvider";
import { Waveform } from "../audio/Waveform";

const TABS = [
  { id: "music", label: "Music" },
  { id: "wallpapers", label: "Wallpapers" },
  /* Hidden until there is content to show — drop `hidden` to bring one back. */
  { id: "images", label: "Images", hidden: true },
  { id: "videos", label: "Videos", hidden: true },
  { id: "websites", label: "Websites", hidden: true },
] as const;

type TabId = (typeof TABS)[number]["id"];

const VISIBLE_TABS = TABS.filter((tab) => !(tab as { hidden?: boolean }).hidden);

const ITEM_TABS: Record<Exclude<TabId, "wallpapers" | "images" | "music">, AIWorkItem[]> = {
  videos: aiVideos,
  websites: aiWebsites,
};

/* Wallpapers and showcase images differ in shape, so both normalise to this before opening. */
export interface LightboxItem {
  src: string;
  title: string;
  caption?: string;
  downloadUrl?: string;
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="mt-8 rounded-[1.5rem] border border-dashed border-border px-6 py-14 text-center">
      <p className="text-base text-muted-foreground">
        No {label.toLowerCase()} here yet — this is where they will land.
      </p>
    </div>
  );
}

function ItemGrid({ items, label }: { items: AIWorkItem[]; label: string }) {
  if (!items.length) {
    return <EmptyState label={label} />;
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const Wrapper = item.href ? "a" : "div";

        return (
          <Wrapper
            key={item.id}
            {...(item.href
              ? { href: item.href, target: "_blank", rel: "noreferrer noopener" }
              : {})}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-secondary/40 transition-colors hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {item.thumbnail ? (
              <img
                src={item.thumbnail}
                alt={item.name}
                loading="lazy"
                className="aspect-video w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
            ) : null}
            <div className="flex flex-1 flex-col gap-1.5 p-4 text-left">
              <h3 className="flex items-center gap-1.5 text-base font-semibold tracking-tight text-foreground">
                {item.name}
                {item.href ? (
                  <ExternalLink className="size-3.5 text-muted-foreground" />
                ) : null}
              </h3>
              {item.description ? (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              ) : null}
              {item.madeWith ? (
                <p className="mt-auto pt-2 text-xs text-muted-foreground">
                  Made with {item.madeWith}
                </p>
              ) : null}
            </div>
          </Wrapper>
        );
      })}
    </div>
  );
}

function handleDownload(url: string) {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function Wallpapers() {
  const [activeTab, setActiveTab] = useState<TabId>("music");
  const { isPlaying, isReactive, analyserRef, musicTabRequest } = useMusic();
  const [lightbox, setLightbox] = useState<{ items: LightboxItem[]; index: number } | null>(null);

  /* The nav mini player can ask this section to show Music when it scrolls here. */
  useEffect(() => {
    if (musicTabRequest > 0) setActiveTab("music");
  }, [musicTabRequest]);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const openItem = lightbox ? lightbox.items[lightbox.index] : null;

  const wallpaperLightbox: LightboxItem[] = sampleWallpapers.map((wallpaper) => ({
    src: wallpaper.url,
    title: wallpaper.name,
    downloadUrl: wallpaper.downloadUrl || wallpaper.url,
  }));

  const imageLightbox: LightboxItem[] = aiImages.map((image) => ({
    src: image.url || image.thumbnail || "",
    title: image.name,
    caption: image.description,
  }));

  const handleTabKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

    const currentIndex = VISIBLE_TABS.findIndex((tab) => tab.id === activeTab);
    const delta = event.key === "ArrowRight" ? 1 : -1;
    const nextTab =
      VISIBLE_TABS[(currentIndex + delta + VISIBLE_TABS.length) % VISIBLE_TABS.length];

    event.preventDefault();
    setActiveTab(nextTab.id);
    document.getElementById(`ai-work-tab-${nextTab.id}`)?.focus();
  };

  /* showModal() gives focus trapping, Escape-to-close, and the top layer for free. */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (lightbox && !dialog.open) {
      dialog.showModal();
    } else if (!lightbox && dialog.open) {
      dialog.close();
    }
  }, [lightbox]);

  /* showModal() makes the page inert but does not stop it scrolling behind the dialog. */
  useEffect(() => {
    if (!lightbox) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [lightbox]);

  /* Arrow keys step through whichever collection the lightbox was opened from. */
  useEffect(() => {
    if (!lightbox) return;

    const handleArrowNavigation = (event: KeyboardEvent) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

      const delta = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = Math.min(
        lightbox.items.length - 1,
        Math.max(0, lightbox.index + delta),
      );

      if (nextIndex === lightbox.index) return;

      event.preventDefault();
      setLightbox({ items: lightbox.items, index: nextIndex });
    };

    window.addEventListener("keydown", handleArrowNavigation);
    return () => {
      window.removeEventListener("keydown", handleArrowNavigation);
    };
  }, [lightbox]);

  return (
    <section id="wallpapers" className="px-4 py-[var(--section-padding-y)] sm:px-6">
      <div className="mx-auto w-full max-w-[var(--page-max-width)]">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          AI Work
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-muted-foreground sm:text-lg">
          Things I generate on my own workstation — wallpapers, music, video, and
          small sites. Local models, no cloud credits.
        </p>

        <div className="mt-8 overflow-x-auto pb-1">
          <div
            role="tablist"
            aria-label="AI work categories"
            onKeyDown={handleTabKeyDown}
            className="mx-auto flex w-max min-w-full justify-start gap-2 sm:justify-center"
          >
            {VISIBLE_TABS.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  type="button"
                  key={tab.id}
                  id={`ai-work-tab-${tab.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`ai-work-panel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative inline-flex h-11 items-center overflow-hidden rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isActive
                    ? "border-primary/25 bg-primary/12 text-primary"
                    : "border-border bg-background text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                >
                  {/* Live level inside the Music chip. Bars are 2px with gaps, so the label still reads through. */}
                  {tab.id === "music" ? (
                    <Waveform
                      isPlaying={isPlaying}
                      progress={0}
                      analyserRef={analyserRef}
                      isReactive={isReactive}
                      barCount={18}
                      barClassName="w-[2px]"
                      maxHeight={30}
                      dim={0.85}
                      className="pointer-events-none absolute inset-0 flex items-center justify-center gap-[3px] overflow-hidden"
                    />
                  ) : null}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {activeTab === "wallpapers" ? (
          <div
            role="tabpanel"
            id="ai-work-panel-wallpapers"
            aria-labelledby="ai-work-tab-wallpapers"
            className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
          >
            {sampleWallpapers.map((wallpaper, index) => (
              <button
                type="button"
                key={wallpaper.id}
                onClick={() => setLightbox({ items: wallpaperLightbox, index })}
                aria-label={`View ${wallpaper.name}`}
                aria-haspopup="dialog"
                className="group relative w-full overflow-hidden rounded-2xl border border-border bg-secondary/70 transition-colors hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <img
                  src={wallpaper.thumbnail}
                  alt={wallpaper.name}
                  loading="lazy"
                  className="aspect-video h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                />
              </button>
            ))}
          </div>
        ) : (
          <div
            role="tabpanel"
            id={`ai-work-panel-${activeTab}`}
            aria-labelledby={`ai-work-tab-${activeTab}`}
          >
            {activeTab === "images" ? (
              aiImages.length ? (
                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {aiImages.map((image, index) => (
                    <figure key={image.id} className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => setLightbox({ items: imageLightbox, index })}
                        aria-label={`View ${image.name}`}
                        aria-haspopup="dialog"
                        className="group relative w-full overflow-hidden rounded-2xl border border-border bg-secondary/70 transition-colors hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <img
                          src={image.thumbnail || image.url}
                          alt={image.name}
                          loading="lazy"
                          className="aspect-[4/3] h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                        />
                      </button>
                      <figcaption className="px-1">
                        <span className="block truncate text-sm font-medium text-foreground">
                          {image.name}
                        </span>
                        {image.description ? (
                          <span className="block truncate text-xs text-muted-foreground">
                            {image.description}
                          </span>
                        ) : null}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ) : (
                <EmptyState label="Images" />
              )
            ) : activeTab === "music" ? (
              aiMusic.length ? (
                <MusicPlayer tracks={aiMusic} />
              ) : (
                <EmptyState label="Music" />
              )
            ) : (
              <ItemGrid
                items={ITEM_TABS[activeTab]}
                label={TABS.find((tab) => tab.id === activeTab)!.label}
              />
            )}
          </div>
        )}
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="wallpaper-dialog-title"
        onClose={() => setLightbox(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            setLightbox(null);
          }
        }}
        className="glass-panel m-auto max-h-[92svh] w-[calc(100vw-2rem)] max-w-5xl overflow-y-auto rounded-[1.75rem] p-4 text-foreground backdrop:bg-black/70 focus:outline-none sm:p-6"
      >
        {openItem ? (
          <>
            <div className="overflow-hidden rounded-2xl border border-border bg-secondary">
              <img
                src={openItem.src}
                alt={openItem.title}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
              <h3
                id="wallpaper-dialog-title"
                className="text-lg font-semibold tracking-tight text-foreground sm:text-xl"
              >
                {openItem.title}
              </h3>
              {openItem.caption ? (
                <p className="mt-1 text-sm text-muted-foreground">{openItem.caption}</p>
              ) : null}
              </div>
              <div className="flex items-center gap-2">
                {openItem.downloadUrl ? (
                  <Button
                    onClick={() => handleDownload(openItem.downloadUrl!)}
                    className="gap-2"
                  >
                    <Download className="size-4" />
                    Download Original
                  </Button>
                ) : null}
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setLightbox(null)}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          </>
        ) : null}
      </dialog>
    </section>
  );
}
