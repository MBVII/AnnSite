import { motion } from "framer-motion";
import Frame from "../components/shared/Frame";

export default function ProfileSelect({ profiles, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[var(--color-flix-black)] px-6"
    >
      <div className="flix-grain" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            "radial-gradient(ellipse at bottom, color-mix(in srgb, var(--color-flix-red) 22%, transparent) 0%, transparent 70%)",
        }}
      />

      <motion.h1
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mb-10 font-ui text-3xl font-medium tracking-wide text-white sm:mb-14 sm:text-4xl"
      >
        Who's watching?
      </motion.h1>

      <div className="relative z-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
        {profiles.map((p, i) => (
          <motion.button
            key={p.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(p)}
            className="group flex w-24 flex-col items-center gap-3 sm:w-32"
          >
            <div className="h-20 w-20 overflow-hidden rounded-md ring-2 ring-transparent transition group-hover:ring-white sm:h-28 sm:w-28">
              <Frame
                src={p.image}
                alt={p.name}
                className="h-full w-full"
                imgClassName={p.id === "her" ? "object-[50%_18%]" : ""}
                fit="cover"
              />
            </div>
            <span className="font-ui text-sm text-[var(--color-flix-gray)] transition group-hover:text-white">
              {p.emoji} {p.name}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
