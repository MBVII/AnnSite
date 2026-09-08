import { Music2, Pause, Play, Volume1, VolumeX } from "lucide-react";

/**
 * Small persistent control, shown once music has been started
 * (i.e. after "Open Your Gift"). Safe to render even if the
 * audio file failed to load — buttons simply disable themselves.
 */
export default function MusicPlayer({
  isPlaying,
  onToggle,
  isMuted,
  onToggleMute,
  hasAudio,
  title,
  artist,
}) {
  return (
    <div
      className="pointer-events-auto fixed bottom-4 left-4 z-40 flex items-center gap-3 rounded-full border border-[var(--color-gold-400)]/25 bg-[var(--color-wine-950)]/70 px-3 py-2 backdrop-blur-sm md:bottom-6 md:left-6"
      role="group"
      aria-label="Background music controls"
    >
      <button
        onClick={onToggle}
        disabled={!hasAudio}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-gold-400)]/15 text-[var(--color-gold-300)] transition hover:bg-[var(--color-gold-400)]/25 disabled:cursor-not-allowed disabled:opacity-30"
      >
        {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 translate-x-[1px]" />}
      </button>

      <div className="hidden max-w-[9rem] flex-col leading-tight sm:flex">
        <span className="truncate font-ui text-[11px] font-medium text-[var(--color-cream-50)]">
          {hasAudio ? title : "Music unavailable"}
        </span>
        <span className="truncate font-ui text-[10px] text-[var(--color-blush-200)]/60">
          {hasAudio ? artist : "add a file to /public/music"}
        </span>
      </div>

      <Music2
        className={`h-3.5 w-3.5 text-[var(--color-gold-300)]/70 ${isPlaying ? "animate-pulse" : ""}`}
      />

      <button
        onClick={onToggleMute}
        disabled={!hasAudio}
        aria-label={isMuted ? "Unmute" : "Mute"}
        className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-blush-200)]/70 transition hover:text-[var(--color-cream-50)] disabled:cursor-not-allowed disabled:opacity-30"
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume1 className="h-4 w-4" />}
      </button>
    </div>
  );
}
