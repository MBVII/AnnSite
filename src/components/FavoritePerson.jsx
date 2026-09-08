import { motion } from "framer-motion";
import Frame from "./shared/Frame";

export default function FavoritePerson({ data }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-6 text-center">
      <motion.div
        className="absolute h-[75vh] w-[88vw] max-w-[340px] overflow-hidden rounded-[2px] shadow-[0_20px_60px_rgba(0,0,0,0.6)] sm:h-[500px] sm:w-[400px] sm:max-w-none"
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.55 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      >
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: "easeOut" }}
        >
          <Frame src={data.photo.src} alt={data.photo.alt} className="h-full w-full" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-wine-950)] via-transparent to-[var(--color-wine-950)]/40" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="font-display text-3xl text-[var(--color-cream-50)] sm:text-4xl"
        >
          {data.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-5 whitespace-pre-line break-words font-script text-3xl leading-snug text-[var(--color-rose-300)] sm:text-5xl"
        >
          {data.quote}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-6 max-w-sm font-body text-lg text-[var(--color-blush-200)]/85"
        >
          {data.message}
        </motion.p>
      </div>
    </div>
  );
}
