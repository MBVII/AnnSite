import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MemoryCard from "./MemoryCard";

export default function MemoryRow({ title, memories, onOpen, onToggleList, myList, progressMap }) {
  const scrollerRef = useRef(null);

  if (!memories.length) return null;

  const scrollBy = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="relative mb-9">
      <h2 className="mb-3 px-4 font-ui text-base font-semibold text-white sm:px-8 sm:text-lg">
        {title}
      </h2>

      <div className="group/row relative">
        <button
          onClick={() => scrollBy(-1)}
          aria-label={`Scroll ${title} left`}
          className="absolute left-0 top-0 z-10 hidden h-full w-10 items-center justify-center bg-gradient-to-r from-[var(--color-flix-black)] to-transparent text-white opacity-0 transition-opacity group-hover/row:opacity-100 sm:flex"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div
          ref={scrollerRef}
          className="flix-row-scroll flex gap-2 overflow-x-auto px-4 pb-2 sm:gap-3 sm:px-8"
        >
          {memories.map((m) => (
            <MemoryCard
              key={m.id}
              memory={m}
              onOpen={onOpen}
              onToggleList={onToggleList}
              inList={myList.includes(m.id)}
              progressPercent={progressMap[m.id]}
              className="w-[46vw] sm:w-[240px] md:w-[260px]"
            />
          ))}
        </div>

        <button
          onClick={() => scrollBy(1)}
          aria-label={`Scroll ${title} right`}
          className="absolute right-0 top-0 z-10 hidden h-full w-10 items-center justify-center bg-gradient-to-l from-[var(--color-flix-black)] to-transparent text-white opacity-0 transition-opacity group-hover/row:opacity-100 sm:flex"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}
