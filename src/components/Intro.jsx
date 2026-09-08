import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Frame from "./shared/Frame";

export default function Intro({ data, onOpen }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const isOpen = selectedIndex !== null;

  const close = () => setSelectedIndex(null);
  const prev = () =>
    setSelectedIndex((i) => (i - 1 + data.photos.length) % data.photos.length);
  const next = () =>
    setSelectedIndex((i) => (i + 1) % data.photos.length);

  return (
    <motion.div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-6 pb-4"
      exit={{ opacity: 0, scale: 1.08, filter: "blur(6px)" }}
      transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
    >
      {/* Vinyl peeking from behind the photo stack */}
      <motion.div
        className="vinyl-grooves pointer-events-none absolute h-[280px] w-[280px] rounded-full opacity-80 shadow-[0_0_60px_rgba(0,0,0,0.5)] sm:h-[360px] sm:w-[360px]"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-burgundy-700)]" />
      </motion.div>

      {/* Overlapping photographs */}
      <div className="relative mb-24 h-[280px] w-[280px] pt-2 sm:h-[320px] sm:w-[340px]">
        {data.photos.map((photo, index) => {
          const positions = [
            "left-0 top-4 w-[130px] sm:w-[160px]",
            "right-2 top-0 w-[140px] sm:w-[170px]",
            "bottom-20 left-14 w-[135px] sm:w-[165px]",
          ];
          const rotations = [-10, 8, -1];
          return (
            <motion.button
              key={photo.src}
              type="button"
              onClick={() => setSelectedIndex(index)}
              whileHover={{ scale: 1.03, y: -4 }}
              style={{ zIndex: 10 + index, pointerEvents: "auto" }}
              className={`polaroid absolute ${positions[index]} cursor-pointer overflow-hidden focus-visible:ring-2 focus-visible:ring-[var(--color-gold-300)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-wine-950)]`}
              initial={{ opacity: 0, y: 30, rotate: rotations[index] }}
              animate={{ opacity: 1, y: 0, rotate: rotations[index] }}
              transition={{
                opacity: { duration: 0.8, delay: 0.2 + index * 0.2 },
                y: { duration: 0.8, delay: 0.2 + index * 0.2 },
                rotate: { duration: 0.8, delay: 0.2 + index * 0.2 },
              }}
              aria-label={`Open photo ${index + 1}`}
            >
              <Frame src={photo.src} alt={photo.alt} className="aspect-[4/5]" fit="cover" />
            </motion.button>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="relative z-20 mt-2 mb-3 font-ui text-[11px] uppercase tracking-[0.25em] text-[var(--color-gold-300)]/80"
      >
        {data.eyebrow}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.9 }}
        className="relative z-20 max-w-md whitespace-pre-line text-center font-display text-2xl italic leading-snug text-[var(--color-cream-50)] sm:text-3xl"
      >
        {data.heading}
      </motion.h1>

      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.35, duration: 0.8 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={onOpen}
        className="relative z-20 mt-9 rounded-full border border-[var(--color-gold-400)]/60 bg-[var(--color-gold-400)]/10 px-8 py-3 font-ui text-sm tracking-wide text-[var(--color-cream-50)] shadow-[0_0_25px_rgba(201,161,90,0.15)] transition hover:bg-[var(--color-gold-400)]/20"
      >
        {data.buttonLabel}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-6"
            role="dialog"
            aria-modal="true"
            aria-label="Intro photo viewer"
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
              key={data.photos[selectedIndex].src}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              className="polaroid max-h-[80vh] max-w-[85vw] sm:max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <Frame
                src={data.photos[selectedIndex].src}
                alt={data.photos[selectedIndex].alt}
                className="max-h-[60vh] w-auto max-w-full bg-[#f8f2ea]"
                imgClassName="mx-auto h-auto max-h-[60vh] w-auto object-contain"
                fit="contain"
              />
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
    </motion.div>
  );
}
