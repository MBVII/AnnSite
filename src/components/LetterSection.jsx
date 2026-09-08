import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Mail } from "lucide-react";

export default function LetterSection({ data }) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-6 py-10">
      <h2 className="mb-8 font-display text-3xl text-[var(--color-cream-50)] sm:text-4xl">
        {data.title}
      </h2>

      <div className="relative flex w-full max-w-md flex-1 items-center justify-center">
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.button
              key="envelope"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setOpened(true)}
              aria-label="Open the letter"
              className="group relative flex h-56 w-full max-w-sm flex-col items-center justify-center gap-3 rounded-sm border border-[var(--color-gold-400)]/40 bg-gradient-to-b from-[var(--color-burgundy-700)] to-[var(--color-wine-900)] shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute inset-x-0 top-0 h-1/2 origin-top border-b border-[var(--color-gold-400)]/30 [clip-path:polygon(0_0,100%_0,50%_60%)] bg-[var(--color-burgundy-600)]" />
              <Mail className="relative z-10 h-9 w-9 text-[var(--color-gold-300)] transition group-hover:scale-110" />
              <span className="relative z-10 font-ui text-xs tracking-wide text-[var(--color-blush-200)]/80">
                tap to open
              </span>
            </motion.button>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 60, rotateX: -8 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="scroll-thin relative max-h-[68vh] w-full overflow-y-auto rounded-[2px] border border-[var(--color-gold-400)]/30 bg-[var(--color-cream-50)] px-7 py-9 text-[var(--color-wine-900)] shadow-[0_25px_60px_rgba(0,0,0,0.55)] sm:px-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 15% 20%, rgba(92,31,43,0.04) 0%, transparent 35%), radial-gradient(circle at 85% 80%, rgba(92,31,43,0.04) 0%, transparent 35%)",
              }}
            >
              <Heart className="mb-4 h-5 w-5 text-[var(--color-burgundy-600)]/60" fill="currentColor" />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="font-script text-2xl text-[var(--color-burgundy-700)]"
              >
                {data.salutation}
              </motion.p>

              {data.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.35, duration: 0.7 }}
                  className="mt-4 font-body text-lg leading-relaxed"
                >
                  {p}
                </motion.p>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + data.paragraphs.length * 0.35 + 0.3, duration: 0.7 }}
                className="mt-6"
              >
                <p className="font-body italic">{data.signOff}</p>
                <p className="mt-1 font-script text-3xl text-[var(--color-burgundy-700)]">
                  {data.signature}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
