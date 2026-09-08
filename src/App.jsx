import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";

import anniversaryData from "./data/config";
import dumpPhotos from "./data/dumpImages";

import Intro from "./components/Intro";
import MusicPlayer from "./components/MusicPlayer";
import MemoryflixApp from "./netflix/MemoryflixApp";

export default function App() {
  const [started, setStarted] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [dumpIndex, setDumpIndex] = useState(() => {
    if (!dumpPhotos.length) return 0;
    return Math.floor(Math.random() * dumpPhotos.length);
  });

  const audioRef = useRef(null);
  const [hasAudio, setHasAudio] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const wasPlayingBeforeVideo = useRef(false);

  // Audio error handling (music is optional — the site works without it)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onError = () => setHasAudio(false);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener("error", onError);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("error", onError);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio || !hasAudio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => setHasAudio(false));
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  const handleOpen = () => {
    setStarted(true);
    // Attempt to start music right after this user gesture — browsers
    // allow autoplay once triggered by a click like this one.
    const audio = audioRef.current;
    if (audio && hasAudio) {
      audio.play().catch(() => {});
    }
  };

  // Memoryflix pauses the ambient opening music whenever a memory video
  // plays (so the two soundtracks never overlap), and resumes it after.
  const pauseAmbientMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    wasPlayingBeforeVideo.current = !audio.paused;
    audio.pause();
  };
  const resumeAmbientMusic = () => {
    const audio = audioRef.current;
    if (!audio || !wasPlayingBeforeVideo.current) return;
    audio.play().catch(() => {});
  };

  const handleRestartWholeSite = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setStarted(false);
    setResetKey((k) => k + 1);
  };

  useEffect(() => {
    if (!dumpPhotos.length) return undefined;
    const interval = setInterval(() => {
      setDumpIndex((current) => (current + 1) % dumpPhotos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const dumpImage = dumpPhotos[dumpIndex] || "";

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(229,9,20,0.18),_transparent_24%),linear-gradient(180deg,_#111111_0%,_#0a0a0a_100%)]">
      {dumpImage && (
        <div
          className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen transition-opacity duration-700"
          style={{
            backgroundImage: `url("${dumpImage}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(1.5px) saturate(1.15)",
          }}
        />
      )}
      {/* Ambient background texture, present behind the opening scrapbook */}
      <div className="paper-texture pointer-events-none absolute inset-0 opacity-30" />
      <div className="light-leak pointer-events-none absolute inset-0" />
      <div className="film-grain" />
      <div className="vignette" />

      <audio ref={audioRef} src={anniversaryData.song.src} preload="none" loop />

      <AnimatePresence mode="wait">
        {!started && (
          <Intro key={`intro-${resetKey}`} data={anniversaryData.opening} onOpen={handleOpen} />
        )}
      </AnimatePresence>

      {started && (
        <>
          <MemoryflixApp
            key={`memoryflix-${resetKey}`}
            initialPhase="home"
            onRestartWholeSite={handleRestartWholeSite}
            onVideoStart={pauseAmbientMusic}
            onVideoEnd={resumeAmbientMusic}
          />
          <MusicPlayer
            isPlaying={isPlaying}
            onToggle={toggleAudio}
            isMuted={isMuted}
            onToggleMute={toggleMute}
            hasAudio={hasAudio}
            title={anniversaryData.song.title}
            artist={anniversaryData.song.artist}
          />
        </>
      )}
    </div>
  );
}
