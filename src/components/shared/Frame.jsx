import { useState } from "react";
import { Heart } from "lucide-react";

/**
 * Photo component that gracefully falls back to a soft, on-brand
 * placeholder if the referenced image file doesn't exist yet.
 * This means the site looks complete even before real photos
 * are dropped into /public/photos.
 */
export default function Frame({
  src,
  alt = "",
  className = "",
  imgClassName = "",
  rotate = 0,
  style,
  fit = "cover",
}) {
  const [failed, setFailed] = useState(false);
  const defaultImgClassName =
    fit === "contain"
      ? "block h-auto max-h-full w-auto max-w-full"
      : "block h-full w-full";

  const objectFitClass = fit === "contain" ? "object-contain" : "object-cover";

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined, ...style }}
    >
      {!failed ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className={`${defaultImgClassName} ${objectFitClass} ${imgClassName}`.trim()}
        />
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[var(--color-burgundy-700)] to-[var(--color-wine-900)] px-3 text-center"
          aria-hidden={alt ? "false" : "true"}
        >
          <Heart className="h-6 w-6 text-[var(--color-rose-300)]/70" strokeWidth={1.25} />
          <span className="font-body text-xs italic text-[var(--color-blush-200)]/70">
            {alt || "photo coming soon"}
          </span>
        </div>
      )}
    </div>
  );
}
