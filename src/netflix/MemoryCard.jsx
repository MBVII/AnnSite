import { motion } from "framer-motion";
import { Check, Play, Plus } from "lucide-react";
import Frame from "../components/shared/Frame";

export default function MemoryCard({
  memory,
  onOpen,
  onToggleList,
  inList,
  progressPercent,
  className = "",
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.06, zIndex: 20 }}
      transition={{ duration: 0.25 }}
      className={`group relative shrink-0 cursor-pointer overflow-hidden rounded-md bg-[var(--color-flix-panel)] shadow-[0_8px_20px_rgba(0,0,0,0.5)] ${className}`}
      onClick={() => onOpen(memory)}
    >
      <div className="aspect-video w-full">
        <Frame src={memory.thumbnail} alt={memory.title} className="h-full w-full" />
      </div>

      {typeof progressPercent === "number" && progressPercent > 0 && (
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
          <div
            className="h-full bg-[var(--color-flix-red)]"
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          />
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/10 to-transparent p-2.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:p-3">
        <p className="pointer-events-none truncate font-ui text-xs font-medium text-white sm:text-sm">
          {memory.title}
        </p>
        <div className="mt-1 flex items-center justify-between">
          <span className="font-ui text-[10px] text-[var(--color-flix-gray)] sm:text-xs">
            {memory.date}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleList(memory.id);
            }}
            aria-label={inList ? "Remove from My List" : "Add to My List"}
            className="pointer-events-auto flex h-6 w-6 items-center justify-center rounded-full border border-white/40 text-white transition hover:border-white"
          >
            {inList ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
          </button>
        </div>
      </div>

      {memory.type === "video" && (
        <div className="pointer-events-none absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <Play className="h-3 w-3 text-white" fill="white" />
        </div>
      )}
    </motion.div>
  );
}
