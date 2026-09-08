import { useMemo } from "react";
import { motion } from "framer-motion";

/**
 * Lightweight floating hearts / petals background layer.
 * `count` kept small by default to stay smooth on modest laptops.
 */
export default function FloatingParticles({ count = 8, variant = "heart" }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 10 + Math.random() * 8,
        size: 10 + Math.random() * 14,
        drift: Math.random() * 40 - 20,
      })),
    [count]
  );

  const glyph = variant === "petal" ? "❀" : "❤";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute select-none text-[var(--color-rose-300)]/30"
          style={{ left: `${p.left}%`, fontSize: p.size, bottom: -40 }}
          initial={{ y: 0, x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: [-0, -600],
            x: [0, p.drift],
            opacity: [0, 0.6, 0],
            rotate: [0, 25],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {glyph}
        </motion.span>
      ))}
    </div>
  );
}
