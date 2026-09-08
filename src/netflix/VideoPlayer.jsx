import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Pause,
  Play,
  Volume1,
  VolumeX,
  X,
} from "lucide-react";

export default function VideoPlayer({ memory, onClose, onPrev, onNext, onProgress }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasVideo, setHasVideo] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const hideTimer = useRef(null);

  // Resume from saved progress, then attempt autoplay.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !memory) return;
    setHasVideo(true);
    setProgress(0);

    const resumeAndPlay = () => {
      const saved = onProgress.get(memory.id);
      if (saved && saved.percent > 2 && saved.percent < 95 && video.duration) {
        video.currentTime = (saved.percent / 100) * video.duration;
      }
      video.play().then(
        () => setPlaying(true),
        () => setPlaying(false)
      );
    };

    video.addEventListener("loadedmetadata", resumeAndPlay, { once: true });
    const onError = () => setHasVideo(false);
    video.addEventListener("error", onError);
    return () => {
      video.removeEventListener("loadedmetadata", resumeAndPlay);
      video.removeEventListener("error", onError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memory]);

  // Save progress periodically and on unmount/close.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTime = () => {
      if (video.duration) {
        const pct = (video.currentTime / video.duration) * 100;
        setProgress(pct);
      }
    };
    video.addEventListener("timeupdate", onTime);
    return () => video.removeEventListener("timeupdate", onTime);
  }, []);

  useEffect(() => {
    return () => {
      if (memory) {
        onProgress.set(memory.id, progress);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memory, progress]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video || !hasVideo) return;
    if (playing) {
      video.pause();
      setPlaying(false);
    } else {
      video.play().then(
        () => setPlaying(true),
        () => setPlaying(false)
      );
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen?.();
    }
  };

  const seek = (e) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    video.currentTime = pct * video.duration;
  };

  const wake = () => {
    setShowControls(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 2800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black"
      role="dialog"
      aria-modal="true"
      aria-label={`Playing ${memory.title}`}
    >
      <div
        ref={containerRef}
        className="relative flex h-full w-full flex-col"
        onMouseMove={wake}
        onClick={wake}
      >
        <div className="relative flex-1 bg-black">
          {hasVideo ? (
            <video
              ref={videoRef}
              src={memory.video}
              className="h-full w-full object-contain"
              playsInline
              onClick={togglePlay}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-center">
              <p className="font-ui text-white/70">This video hasn't been added yet.</p>
              <p className="font-ui text-xs text-white/40">
                Drop a file at <code>public{memory.video}</code>
              </p>
            </div>
          )}

          {/* Top bar */}
          <motion.div
            animate={{ opacity: showControls ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between bg-gradient-to-b from-black/80 to-transparent p-4 sm:p-6"
          >
            <div className="pointer-events-auto max-w-[70%]">
              <h3 className="font-ui text-lg font-semibold text-white sm:text-xl">
                {memory.title}
              </h3>
              <p className="font-ui text-xs text-white/60 sm:text-sm">{memory.date}</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close player"
              className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>

          {/* Center prev/next */}
          <motion.div
            animate={{ opacity: showControls ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute inset-y-0 inset-x-0 flex items-center justify-between px-2 sm:px-6"
          >
            <button
              onClick={onPrev}
              aria-label="Previous memory"
              className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={onNext}
              aria-label="Next memory"
              className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>

          {/* Bottom controls */}
          <motion.div
            animate={{ opacity: showControls ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 sm:p-6"
          >
            <div
              onClick={seek}
              className="mb-3 h-1.5 w-full cursor-pointer rounded-full bg-white/25"
            >
              <div
                className="h-full rounded-full bg-[var(--color-flix-red)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                disabled={!hasVideo}
                aria-label={playing ? "Pause" : "Play"}
                className="text-white transition hover:text-white/70 disabled:opacity-30"
              >
                {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </button>
              <button
                onClick={toggleMute}
                disabled={!hasVideo}
                aria-label={muted ? "Unmute" : "Mute"}
                className="text-white transition hover:text-white/70 disabled:opacity-30"
              >
                {muted ? <VolumeX className="h-5 w-5" /> : <Volume1 className="h-5 w-5" />}
              </button>
              <span className="font-ui text-xs text-white/60">{memory.date}</span>
              <button
                onClick={toggleFullscreen}
                aria-label="Full screen"
                className="ml-auto text-white transition hover:text-white/70"
              >
                <Maximize className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </div>

        <div className="bg-[var(--color-flix-dark)] px-5 py-4 sm:px-8">
          <p className="font-ui text-sm leading-relaxed text-white/80">{memory.description}</p>
        </div>
      </div>
    </motion.div>
  );
}
