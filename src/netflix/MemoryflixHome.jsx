import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Play, Plus, Search, User } from "lucide-react";
import Frame from "../components/shared/Frame";
import anniversaryData from "../data/config";
import dumpPhotos from "../data/dumpImages";
import MemoryRow from "./MemoryRow";
import MemoryCard from "./MemoryCard";
import SearchOverlay from "./SearchOverlay";
import StoryTimeline from "./StoryTimeline";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "story", label: "Our Story" },
  { id: "memories", label: "Memories" },
  { id: "photos", label: "Photos" },
  { id: "videos", label: "Videos" },
  { id: "favorites", label: "Favorites" },
];

const anniversaryPhotos = anniversaryData.gallery.photos.map((photo, index) => ({
  id: `anniversary-memory-${index + 1}`,
  title: photo.alt,
  date: "Our memories",
  caption: photo.caption,
  description: photo.caption,
  thumbnail: photo.src,
  type: "photo",
  category: "Our Memories",
}));

export default function MemoryflixHome({
  data,
  profile,
  onSwitchProfile,
  onOpenMemory,
  myList,
  onToggleList,
  progressMap,
  onPlayCinematic,
}) {
  const [activeFilter, setActiveFilter] = useState("home");
  const [searchOpen, setSearchOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const heroImages = [data.hero.image, ...dumpPhotos, ...anniversaryPhotos.map((photo) => photo.thumbnail)];

  useEffect(() => {
    if (heroImages.length < 2) return undefined;
    const interval = setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const heroImage = heroImages[heroIndex % heroImages.length];

  const continueWatching = useMemo(
    () =>
      data.memories.filter(
        (m) => progressMap[m.id] > 0 && progressMap[m.id] < 97
      ),
    [data.memories, progressMap]
  );

  const rowsByCategory = useMemo(
    () =>
      data.categories
        .filter((c) => c !== "Continue Watching")
        .map((category) => ({
          category,
          items: data.memories.filter((m) => m.category === category),
        }))
        .filter((r) => r.items.length),
    [data.categories, data.memories]
  );

  const filteredGrid = useMemo(() => {
    switch (activeFilter) {
      case "photos":
        return data.memories.filter((m) => m.type === "photo");
      case "videos":
        return data.memories.filter((m) => m.type === "video");
      case "favorites":
        return data.memories.filter((m) => myList.includes(m.id));
      case "story":
        return data.memories.filter((m) => m.category === "Our Best Memories");
      case "memories":
        return data.memories;
      default:
        return [];
    }
  }, [activeFilter, data.memories, myList]);

  return (
    <div className="relative h-full w-full overflow-y-auto bg-[radial-gradient(circle_at_top,_rgba(229,9,20,0.28),_transparent_22%),_linear-gradient(180deg,_#0b0b0b_0%,_#0a0a0a_100%)]">
      {/* Top navigation */}
      <div className="fixed inset-x-0 top-0 z-30 flex items-center justify-between bg-gradient-to-b from-black/90 to-transparent px-4 py-3 sm:px-8 sm:py-4">
        <div className="flex items-center gap-6 sm:gap-8">
          <button
            type="button"
            onClick={() => setActiveFilter("home")}
            aria-label="Go to Memoryflix home"
            className="memoryflix-wordmark group"
          >
            <span className="memoryflix-wordmark-text">MEMORYFLIX</span>
            <span className="memoryflix-heartline" aria-hidden="true">
              <span />
              <Heart className="h-2.5 w-2.5 fill-current" />
              <span />
            </span>
          </button>
          <nav className="hidden items-center gap-5 md:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveFilter(link.id)}
                className={`font-ui text-sm transition ${
                  activeFilter === link.id
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="text-white/80 transition hover:text-white"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            onClick={onSwitchProfile}
            aria-label="Switch profile"
            className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-md bg-white/10 text-white/80 transition hover:text-white"
          >
            {profile?.image ? (
              <Frame src={profile.image} alt={profile.name} className="h-full w-full" />
            ) : (
              <User className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav row */}
      <div className="flix-row-scroll fixed inset-x-0 top-12 z-30 flex gap-4 overflow-x-auto bg-[var(--color-flix-black)]/95 px-4 py-2 md:hidden">
        {NAV_LINKS.map((link) => (
          <button
            key={link.id}
            onClick={() => setActiveFilter(link.id)}
            className={`shrink-0 font-ui text-xs transition ${
              activeFilter === link.id ? "text-white" : "text-white/50"
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>

      <div className="pt-24 pb-16 md:pt-20">
        {activeFilter === "home" ? (
          <>
            {/* Hero */}
            <div className="relative mb-8 h-[52vh] w-full sm:h-[58vh]">
              <motion.div
                key={heroImage}
                initial={{ scale: 1.08 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(229,9,20,0.25),_transparent_35%)]" />
                <div
                  className="absolute inset-0 scale-105 bg-cover bg-center opacity-35 blur-xl"
                  style={{ backgroundImage: `url("${heroImage}")` }}
                />
                <Frame
                  src={heroImage}
                  alt={data.hero.title}
                  className="relative z-10 h-full w-full"
                  imgClassName="mx-auto h-full w-full object-contain"
                  fit="contain"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-flix-black)] via-[var(--color-flix-black)]/15 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-flix-black)]/85 via-[var(--color-flix-black)]/20 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(229,9,20,0.18),_transparent_22%)]" />

              <div className="absolute bottom-10 left-4 z-20 max-w-md sm:bottom-16 sm:left-8">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="font-display text-3xl font-semibold text-white drop-shadow-lg sm:text-5xl"
                >
                  {data.hero.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-3 max-w-sm font-ui text-sm text-white/80 sm:text-base"
                >
                  {data.hero.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mt-5 flex items-center gap-3"
                >
                  <button
                    onClick={onPlayCinematic}
                    className="flex items-center gap-2 rounded-md bg-white px-5 py-2.5 font-ui text-sm font-semibold text-black transition hover:bg-white/85"
                  >
                    <Play className="h-4 w-4" fill="black" />
                    {data.cinematic.triggerLabel}
                  </button>
                  <button
                    onClick={() => setActiveFilter("memories")}
                    className="flex items-center gap-2 rounded-md bg-white/20 px-5 py-2.5 font-ui text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/30"
                  >
                    <Plus className="h-4 w-4" />
                    My List
                  </button>
                </motion.div>
              </div>
            </div>

            <MemoryRow
              title="Our Memories"
              memories={anniversaryPhotos}
              onOpen={onOpenMemory}
              onToggleList={onToggleList}
              myList={myList}
              progressMap={progressMap}
            />

            {continueWatching.length > 0 && (
              <MemoryRow
                title="Continue Watching"
                memories={continueWatching}
                onOpen={onOpenMemory}
                onToggleList={onToggleList}
                myList={myList}
                progressMap={progressMap}
              />
            )}

            {rowsByCategory.map(({ category, items }) => (
              <MemoryRow
                key={category}
                title={category}
                memories={items}
                onOpen={onOpenMemory}
                onToggleList={onToggleList}
                myList={myList}
                progressMap={progressMap}
              />
            ))}
          </>
        ) : (
          activeFilter === "story" ? (
            <StoryTimeline story={anniversaryData.story} />
          ) : (
          <div className="px-4 sm:px-8">
            <h2 className="mb-5 font-ui text-xl font-semibold text-white">
              {NAV_LINKS.find((l) => l.id === activeFilter)?.label}
            </h2>
            {filteredGrid.length ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {filteredGrid.map((m) => (
                  <MemoryCard
                    key={m.id}
                    memory={m}
                    onOpen={onOpenMemory}
                    onToggleList={onToggleList}
                    inList={myList.includes(m.id)}
                    progressPercent={progressMap[m.id]}
                    className="w-full"
                  />
                ))}
              </div>
            ) : (
              <p className="font-ui text-sm text-white/50">Nothing here yet.</p>
            )}
          </div>
          )
        )}
      </div>

      <AnimatePresence>
        {searchOpen && (
          <SearchOverlay
            memories={data.memories}
            onClose={() => setSearchOpen(false)}
            onOpenMemory={(m) => {
              setSearchOpen(false);
              onOpenMemory(m);
            }}
            onToggleList={onToggleList}
            myList={myList}
            progressMap={progressMap}
          />
        )}

      </AnimatePresence>
    </div>
  );
}
