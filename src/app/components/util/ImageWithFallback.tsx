import { useState } from "react";
import { cn } from "../shared/utils";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setIsLoading(false);
    setDidError(true);
  };

  const { src, alt, style, className, ...rest } = props;

  if (didError) {
    return (
      <div
        className={cn("inline-block bg-muted text-center align-middle", className)}
        style={style}
      >
        <div className="flex h-full w-full items-center justify-center">
          <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)} style={style}>
      {isLoading && (
        <div className="absolute inset-0 z-10 animate-pulse rounded-inherit bg-muted" />
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          className,
          isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500",
        )}
        style={style}
        {...rest}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}
