import { motion } from "framer-motion";
import Frame from "./shared/Frame";
import FloatingParticles from "./shared/FloatingParticles";

export default function AnniversarySection({ data }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-6 text-center">
      <FloatingParticles count={7} variant="heart" />

      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
        animate={{ opacity: 1, scale: 1, rotate: -3 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="polaroid mb-8 w-[170px] sm:w-[210px]"
      >
        <Frame src={data.photo.src} alt={data.photo.alt} className="aspect-[4/5]" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="whitespace-pre-line break-words font-script text-5xl leading-[0.95] text-[var(--color-rose-300)] sm:text-7xl md:text-8xl"
      >
        {data.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.8 }}
        className="mt-6 max-w-sm font-body text-lg italic text-[var(--color-blush-200)] sm:text-xl"
      >
        {data.subtitle}
      </motion.p>
    </div>
  );
}
