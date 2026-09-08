import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CinematicSequence({ cinematic, onDone }) {
  const [phase, setPhase] = useState("text"); // "text" -> "video"
  const [hasVideo, setHasVideo] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setPhase("video"), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black"
    >
      {phase === "text" ? (
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.02em" }}
          transition={{ duration: 1.6 }}
          className="px-6 text-center font-script text-4xl text-white sm:text-5xl"
        >
          {cinematic.leadLine}
        </motion.p>
      ) : hasVideo ? (
        <video
          src={cinematic.video}
          autoPlay
          playsInline
          className="h-full w-full object-contain"
          onError={() => setHasVideo(false)}
          onEnded={onDone}
        />
      ) : (
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="font-ui text-white/70">
            Add your special video at <code>public{cinematic.video}</code>
          </p>
          <button
            onClick={onDone}
            className="rounded-full border border-white/30 px-6 py-2 font-ui text-sm text-white transition hover:bg-white/10"
          >
            Continue
          </button>
        </div>
      )}
    </motion.div>
  );
}
