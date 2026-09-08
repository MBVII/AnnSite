import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import Frame from "./shared/Frame";

export default function VinylSection({ data, isPlaying, onToggle, hasAudio, progress }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-8 px-6 sm:flex-row sm:gap-14">
      <div className="relative h-[230px] w-[230px] shrink-0 sm:h-[320px] sm:w-[320px]">
        <motion.div
          className="vinyl-grooves absolute inset-0 rounded-full shadow-[0_10px_50px_rgba(0,0,0,0.6)]"
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={
            isPlaying
              ? { duration: 8, repeat: Infinity, ease: "linear" }
              : { duration: 0.6 }
          }
        />
        <div className="absolute inset-[18%] overflow-hidden rounded-full border-4 border-[var(--color-wine-950)] shadow-inner">
          <Frame src={data.albumArt} alt={`${data.title} album art`} className="h-full w-full" />
        </div>
        <div className="absolute inset-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-cream-50)]" />
      </div>

      <div className="flex max-w-xs flex-col items-center text-center sm:items-start sm:text-left">
        <p className="mb-2 font-script text-3xl text-[var(--color-rose-300)] sm:text-4xl">
          our song
        </p>
        <h2 className="font-display text-2xl text-[var(--color-cream-50)] sm:text-3xl">
          {data.title}
        </h2>
        <p className="mt-1 font-ui text-sm text-[var(--color-blush-200)]/70">{data.artist}</p>
        <p className="mt-4 font-body text-base italic text-[var(--color-blush-200)]/80">
          "{data.note}"
        </p>

        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={onToggle}
            disabled={!hasAudio}
            aria-label={isPlaying ? "Pause song" : "Play song"}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-gold-400)]/50 bg-[var(--color-gold-400)]/10 text-[var(--color-gold-300)] transition hover:bg-[var(--color-gold-400)]/20 disabled:cursor-not-allowed disabled:opacity-30"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-[1px]" />}
          </button>

          <div className="h-1 w-32 overflow-hidden rounded-full bg-[var(--color-cream-50)]/15 sm:w-40">
            <motion.div
              className="h-full bg-[var(--color-gold-300)]"
              style={{ width: `${hasAudio ? progress * 100 : 0}%` }}
            />
          </div>
        </div>

        {!hasAudio && (
          <p className="mt-3 font-ui text-xs text-[var(--color-blush-200)]/50">
            Add your song to /public/music/anniversary-song.mp3
          </p>
        )}
      </div>
    </div>
  );
}
