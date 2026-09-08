import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Frame from "./shared/Frame";

const rotationFor = (i) => [-4, 3, -2, 5, -3, 2, -5, 4][i % 8];

function frameChrome(frame) {
  switch (frame) {
    case "film":
      return "film-sprocket border-y-[10px] border-[var(--color-wine-950)] bg-[var(--color-wine-950)] p-1";
    case "portrait":
      return "border-4 border-[var(--color-cream-50)] shadow-lg";
    default:
      return "polaroid";
  }
}

export default function GallerySection({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const isOpen = activeIndex !== null;

  const close = () => setActiveIndex(null);
  const prev = () =>
    setActiveIndex((i) => (i - 1 + data.photos.length) % data.photos.length);
  const next = () => setActiveIndex((i) => (i + 1) % data.photos.length);

  return (
    <div className="scroll-thin h-full w-full overflow-y-auto px-6 py-16 sm:px-10 md:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h2 className="font-display text-4xl text-[var(--color-cream-50)] sm:text-5xl">
            {data.title}
          </h2>
          <p className="mt-2 font-body text-lg italic text-[var(--color-blush-200)]/75">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4">
          {data.photos.map((photo, i) => (
            <motion.button
              key={photo.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              onClick={() => setActiveIndex(i)}
              style={{ rotate: `${rotationFor(i)}deg` }}
              className={`group w-full ${frameChrome(photo.frame)} focus-visible:ring-2 focus-visible:ring-[var(--color-gold-300)]`}
              aria-label={`Open photo: ${photo.caption}`}
            >
              <Frame
                src={photo.src}
                alt={photo.alt}
                className="aspect-[4/5] w-full"
                imgClassName="transition duration-500 group-hover:brightness-105"
                fit="cover"
              />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-6"
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            onClick={close}
          >
            <button
              onClick={close}
              aria-label="Close photo viewer"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous photo"
              className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-8"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <motion.div
              key={data.photos[activeIndex].src}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              className="polaroid max-h-[80vh] max-w-[85vw] sm:max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <Frame
                src={data.photos[activeIndex].src}
                alt={data.photos[activeIndex].alt}
                className="max-h-[60vh] w-full bg-[#f8f2ea]"
                imgClassName="mx-auto h-auto max-h-[60vh] w-auto object-contain"
                fit="contain"
              />
              <p className="mt-3 px-1 text-center font-script text-xl text-[var(--color-wine-900)]">
                {data.photos[activeIndex].caption}
              </p>
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next photo"
              className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-8"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
