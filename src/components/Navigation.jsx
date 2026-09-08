import { motion } from "framer-motion";

export default function Navigation({ sections, activeIndex, onNavigate }) {
  return (
    <nav
      aria-label="Section navigation"
      className="pointer-events-auto fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 sm:flex md:right-8"
    >
      {sections.map((section, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={section.label}
            onClick={() => onNavigate(i)}
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center gap-3 rounded-full px-2 py-1 font-ui text-xs tracking-wide text-[var(--color-blush-200)]/60 transition-colors hover:text-[var(--color-cream-50)] focus-visible:text-[var(--color-cream-50)]"
          >
            <span
              className={`whitespace-nowrap transition-opacity duration-300 ${
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-70"
              }`}
            >
              {String(i + 1).padStart(2, "0")} — {section.label}
            </span>
            <span className="relative flex h-2.5 w-2.5 items-center justify-center">
              {isActive && (
                <motion.span
                  layoutId="nav-ring"
                  className="absolute inset-[-5px] rounded-full border border-[var(--color-gold-300)]"
                />
              )}
              <span
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  isActive
                    ? "bg-[var(--color-gold-300)]"
                    : "bg-[var(--color-blush-200)]/40 group-hover:bg-[var(--color-blush-200)]/70"
                }`}
              />
            </span>
          </button>
        );
      })}
    </nav>
  );
}
