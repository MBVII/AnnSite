import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import MemoryCard from "./MemoryCard";

export default function SearchOverlay({ memories, onClose, onOpenMemory, onToggleList, myList, progressMap }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return memories.filter((m) =>
      [m.title, m.description, m.category, m.date]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(q))
    );
  }, [memories, query]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[65] overflow-y-auto bg-[var(--color-flix-black)] px-4 py-6 sm:px-10 sm:py-10"
    >
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-3 border-b border-white/20 pb-4">
          <Search className="h-5 w-5 text-white/60" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search memories, people, places…"
            className="flex-1 bg-transparent font-ui text-lg text-white placeholder:text-white/40 focus:outline-none"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {query.trim() && (
          <p className="mt-4 font-ui text-sm text-white/50">
            {results.length} result{results.length === 1 ? "" : "s"} for "{query}"
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {results.map((m) => (
            <MemoryCard
              key={m.id}
              memory={m}
              onOpen={onOpenMemory}
              onToggleList={onToggleList}
              inList={myList.includes(m.id)}
              progressPercent={progressMap[m.id]}
              className="w-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
