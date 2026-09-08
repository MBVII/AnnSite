import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

export default function SeasonComplete({ finalScreen, onReplay }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-4 bg-black px-6 text-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="font-ui text-2xl font-medium text-white sm:text-3xl"
      >
        {finalScreen.seasonLine}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.8 }}
        className="font-script text-3xl text-[var(--color-flix-red)] sm:text-4xl"
      >
        {finalScreen.continuedLine}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="font-ui text-sm text-white/50"
      >
        {finalScreen.smallLine}
      </motion.p>

      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.8 }}
        className="scroll-thin max-h-[38vh] w-full max-w-xl overflow-y-auto rounded-lg border border-white/10 bg-white/[0.04] px-6 py-5 text-left shadow-[0_12px_40px_rgba(0,0,0,0.35)] sm:px-8"
      >
        <h3 className="text-center font-display text-2xl italic text-[var(--color-cream-50)] sm:text-3xl">
          {finalScreen.letter.title}
        </h3>
        <p className="mt-5 font-body text-lg italic text-white/85">
          {finalScreen.letter.salutation}
        </p>
        <div className="mt-3 space-y-3 font-body text-base leading-relaxed text-white/75 sm:text-lg">
          {finalScreen.letter.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-5 whitespace-pre-line font-body text-lg italic text-white/85">
          {finalScreen.letter.signOff}
        </p>
      </motion.article>

      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.25, duration: 0.8 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={onReplay}
        className="mt-6 flex items-center gap-2 rounded-full bg-[var(--color-flix-red)] px-7 py-3 font-ui text-sm font-medium text-white transition hover:bg-[var(--color-flix-red-dim)]"
      >
        <RotateCcw className="h-4 w-4" />
        {finalScreen.replayLabel}
      </motion.button>
    </motion.div>
  );
}
