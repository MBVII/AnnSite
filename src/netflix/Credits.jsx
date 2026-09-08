import { motion } from "framer-motion";

export default function Credits({ credits, onDone }) {
  // Duration scales gently with content length so it always feels
  // like a real scroll, not a rushed or endlessly slow one.
  const duration = Math.max(18, credits.length * 2.2);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] overflow-hidden bg-black"
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "-115%" }}
        transition={{ duration, ease: "linear" }}
        onAnimationComplete={onDone}
        className="absolute inset-x-0 flex flex-col items-center gap-10 px-6 text-center"
      >
        <div className="h-[10vh]" />
        {credits.map((c) => (
          <div key={c.role}>
            <p className="font-ui text-sm uppercase tracking-[0.3em] text-white/50">{c.role}</p>
            {c.names.map((n) => (
              <p key={n} className="mt-2 font-display text-2xl text-white sm:text-3xl">
                {n}
              </p>
            ))}
          </div>
        ))}

        <div className="mt-10">
          <p className="font-script text-4xl text-white sm:text-5xl">To be continued…</p>
          <p className="mt-6 text-4xl">❤️</p>
        </div>
        <div className="h-[20vh]" />
      </motion.div>

      <button
        onClick={onDone}
        className="absolute bottom-6 right-6 rounded-full border border-white/30 px-5 py-2 font-ui text-xs text-white/70 transition hover:bg-white/10 hover:text-white"
      >
        Skip
      </button>
    </motion.div>
  );
}
