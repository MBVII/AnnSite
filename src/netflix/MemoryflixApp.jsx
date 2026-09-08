import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";

import siteData from "../data/memoryData";
import useLocalStorage from "../hooks/useLocalStorage";

import ProfileSelect from "./ProfileSelect";
import MemoryflixHome from "./MemoryflixHome";
import VideoPlayer from "./VideoPlayer";
import PhotoLightbox from "./PhotoLightbox";
import CinematicSequence from "./CinematicSequence";
import Credits from "./Credits";
import SeasonComplete from "./SeasonComplete";

// "phase" drives the big-picture flow described in the brief:
// profiles -> home -> (optional player) -> cinematic -> credits -> complete
export default function MemoryflixApp({
  initialPhase = "profiles",
  onRestartWholeSite,
  onVideoStart,
  onVideoEnd,
}) {
  const [phase, setPhase] = useState(initialPhase);
  const [profile, setProfile] = useLocalStorage("flix-profile", null);
  const [myList, setMyList] = useLocalStorage("flix-mylist", []);
  const [progressMap, setProgressMap] = useLocalStorage("flix-progress", {});
  const [activeMemory, setActiveMemory] = useState(null);

  const progressAdapter = useMemo(
    () => ({
      get: (id) => ({ percent: progressMap[id] || 0 }),
      set: (id, percent) =>
        setProgressMap((prev) => ({ ...prev, [id]: Math.round(percent) })),
    }),
    [progressMap, setProgressMap]
  );

  const toggleList = (id) => {
    setMyList((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const sameTypeList = (memory) =>
    siteData.memories.filter((m) => m.type === memory.type);

  const openMemory = (memory) => {
    if (memory.type === "video") onVideoStart?.();
    setActiveMemory(memory);
  };
  const closeMemory = () => {
    if (activeMemory?.type === "video") onVideoEnd?.();
    setActiveMemory(null);
  };

  const stepMemory = (dir) => {
    if (!activeMemory) return;
    const list = sameTypeList(activeMemory);
    const idx = list.findIndex((m) => m.id === activeMemory.id);
    const next = list[(idx + dir + list.length) % list.length];
    setActiveMemory(next);
  };

  const handleSelectProfile = (p) => {
    setProfile(p);
    setPhase("home");
  };

  const handlePlayCinematic = () => {
    onVideoStart?.();
    setPhase("cinematic");
  };
  const handleCinematicDone = () => setPhase("credits");
  const handleCreditsDone = () => setPhase("complete");

  const handleReplay = () => {
    setPhase("profiles");
    setActiveMemory(null);
  };

  return (
    <div className="relative h-full w-full">
      <AnimatePresence mode="wait">
        {phase === "profiles" && (
          <ProfileSelect
            key="profiles"
            profiles={siteData.profiles}
            onSelect={handleSelectProfile}
          />
        )}

        {phase === "home" && (
          <MemoryflixHome
            key="home"
            data={siteData}
            profile={profile}
            onSwitchProfile={() => setPhase("profiles")}
            onOpenMemory={openMemory}
            myList={myList}
            onToggleList={toggleList}
            progressMap={progressMap}
            onPlayCinematic={handlePlayCinematic}
          />
        )}

        {phase === "cinematic" && (
          <CinematicSequence
            key="cinematic"
            cinematic={siteData.cinematic}
            onDone={handleCinematicDone}
          />
        )}

        {phase === "credits" && (
          <Credits key="credits" credits={siteData.credits} onDone={handleCreditsDone} />
        )}

        {phase === "complete" && (
          <SeasonComplete
            key="complete"
            finalScreen={siteData.finalScreen}
            onReplay={onRestartWholeSite || handleReplay}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeMemory?.type === "video" && (
          <VideoPlayer
            key={`video-${activeMemory.id}`}
            memory={activeMemory}
            onClose={closeMemory}
            onPrev={() => stepMemory(-1)}
            onNext={() => stepMemory(1)}
            onProgress={progressAdapter}
          />
        )}
        {activeMemory?.type === "photo" && (
          <PhotoLightbox
            key={`photo-${activeMemory.id}`}
            memory={activeMemory}
            onClose={closeMemory}
            onPrev={() => stepMemory(-1)}
            onNext={() => stepMemory(1)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
