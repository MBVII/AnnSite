import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Frame from "../components/shared/Frame";

export default function PhotoLightbox({ memory, onClose, onPrev, onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-black/95 px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Viewing ${memory.title}`}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6 sm:top-6"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous photo"
        className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={memory.id}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.35 }}
          onClick={(e) => e.stopPropagation()}
          className="flex max-h-full max-w-2xl flex-col items-center"
        >
          <Frame
            src={memory.thumbnail}
            alt={memory.title}
            className="max-h-[65vh] w-auto max-w-full rounded-sm bg-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
            imgClassName="mx-auto max-h-[65vh] w-auto max-w-full object-contain"
            fit="contain"
          />
          <div className="mt-5 text-center">
            <h3 className="font-ui text-xl font-semibold text-white">{memory.title}</h3>
            <p className="mt-1 font-ui text-sm text-[var(--color-flix-gray)]">{memory.date}</p>
            <p className="mx-auto mt-3 max-w-md font-body text-lg italic text-white/80">
              {memory.caption || memory.description}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next photo"
        className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </motion.div>
  );
}
