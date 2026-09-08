import { motion } from "framer-motion";
import Frame from "./shared/Frame";
import FloatingParticles from "./shared/FloatingParticles";

export default function FinalSection({ data }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-6 text-center">
      <FloatingParticles count={10} variant="petal" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1 }}
        className="polaroid mb-8 w-[190px] sm:w-[230px]"
      >
        <Frame src={data.photo.src} alt={data.photo.alt} className="aspect-[4/5]" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="font-display text-3xl text-[var(--color-cream-50)] sm:text-4xl"
      >
        {data.heading}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="mt-5 max-w-md whitespace-pre-line font-body text-lg italic text-[var(--color-blush-200)]/85 sm:text-xl"
      >
        {data.message}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.6 }}
        className="mt-8 break-words font-script text-3xl text-[var(--color-rose-300)] sm:text-5xl"
      >
        {data.closingLine}
      </motion.p>
    </div>
  );
}
