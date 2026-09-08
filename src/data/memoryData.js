// ─────────────────────────────────────────────────────────────
//  MEMORYFLIX — CENTRAL CONFIG
//  Everything in the Netflix-style experience is driven from
//  this one file. Add a new memory by adding one object to the
//  `memories` array below — no component needs to change.
//
//  Photos: /public/photos/    Videos: /public/videos/
//  Missing files fall back to a graceful on-brand placeholder,
//  so the app never shows a broken image or a dead video.
// ─────────────────────────────────────────────────────────────

export const siteData = {
  brand: "NETFLIX",

  couple: {
    person1: "Manan",
    person2: "Diya",
    relationshipDate: "12 August 2022",
  },

  // ── "Who's watching?" profiles ───────────────────────────
  profiles: [
    { id: "me", name: "Me", emoji: "❤️", image: "/photos/profile-me.jpg" },
    { id: "her", name: "Her", emoji: "💕", image: "/photos/profile-her.jpg" },
    { id: "us", name: "Us", emoji: "📸", image: "/photos/profile-us.jpg" },
    { id: "best", name: "Best Memories", emoji: "🥹", image: "/photos/profile-best.jpg" },
    { id: "friends", name: "Our Friends", emoji: "👫", image: "/photos/profile-friends.jpg" },
  ],

  // ── Hero banner on the home screen ───────────────────────
  hero: {
    title: "Life of Manan & Diya",
    description: "Our story, our chaos, our memories.",
    image: "/photos/hero.jpg",
    video: "/videos/hero-loop.mp4",
  },

  // ── Row order on the home screen ─────────────────────────
  categories: [
    "Continue Watching",
    "Popular on NETFLIX",
    "Our Best Memories",
    "Things I Never Want to Forget",
    "5 Months of Us",
    "8 Months of Us",
    "Main Character Moments",
    "Us Being Stupid",
    "Core Memories ❤️",
    "Future Memories",
  ],

  // ── Every memory card in the app ─────────────────────────
  memories: [
    {
      id: 1,
      title: "Our First Date",
      category: "Our Best Memories",
      date: "18 March 2022",
      type: "video",
      thumbnail: "/photos/memory-date.jpg",
      video: "/videos/first-date.mp4",
      description:
        "We talked for four hours and it felt like four minutes. I remember driving home that night thinking I wanted to know everything about you.",
    },
    {
      id: 2,
      title: "The Goa Trip",
      category: "Popular on NETFLIX",
      date: "9 September 2023",
      type: "video",
      thumbnail: "/photos/memory-goa.jpg",
      video: "/videos/goa-trip.mp4",
      description:
        "The trip we almost didn't take, the sunset we almost missed, the photo we almost forgot to take.",
    },
    {
      id: 3,
      title: "Rainy Afternoon",
      category: "Things I Never Want to Forget",
      date: "2 July 2023",
      type: "photo",
      thumbnail: "/photos/memory-rain.jpg",
      caption: "Rainy afternoons, your favorite kind of weather.",
      description: "The kind of ordinary day I never want to forget.",
    },
    {
      id: 4,
      title: "5 Months In",
      category: "5 Months of Us",
      date: "12 January 2023",
      type: "photo",
      thumbnail: "/photos/memory-5months.jpg",
      caption: "Still figuring each other out, and loving every bit of it.",
      description: "Five months of learning your favorite songs and worst jokes.",
    },
    {
      id: 5,
      title: "8 Months In",
      category: "8 Months of Us",
      date: "12 April 2023",
      type: "photo",
      thumbnail: "/photos/memory-8months.jpg",
      caption: "Eight months of inside jokes nobody else understands.",
      description: "By now we had a whole language of our own.",
    },
    {
      id: 6,
      title: "The Birthday Surprise",
      category: "Main Character Moments",
      date: "30 May 2023",
      type: "video",
      thumbnail: "/photos/memory-birthday.jpg",
      video: "/videos/birthday-surprise.mp4",
      description: "The birthday surprise that almost went wrong, and somehow went perfectly.",
    },
    {
      id: 7,
      title: "Dancing Badly in the Kitchen",
      category: "Us Being Stupid",
      date: "4 November 2023",
      type: "video",
      thumbnail: "/photos/memory-kitchen.jpg",
      video: "/videos/kitchen-dancing.mp4",
      description: "No music, no rhythm, no shame. Ten out of ten, would dance badly again.",
    },
    {
      id: 8,
      title: "Late Night Drives",
      category: "Core Memories ❤️",
      date: "14 February 2024",
      type: "photo",
      thumbnail: "/photos/memory-drive.jpg",
      caption: "Late night drives, no destination.",
      description: "Just the two of us, the radio, and nowhere we needed to be.",
    },
    {
      id: 9,
      title: "Everything We Haven't Done Yet",
      category: "Future Memories",
      date: "Coming soon",
      type: "photo",
      thumbnail: "/photos/memory-future.jpg",
      caption: "To be continued…",
      description: "A placeholder for every memory we haven't made yet.",
    },
    {
      id: 10,
      title: "Home Is Wherever You Are",
      category: "Popular on NETFLIX",
      date: "20 December 2023",
      type: "photo",
      thumbnail: "/photos/memory-home.jpg",
      caption: "Home is wherever you are.",
      description: "Four walls, or a car seat, or a train platform — it never mattered.",
    },
  ],

  // ── Special cinematic sequence (triggered from the hero) ─
  cinematic: {
    triggerLabel: "Play Our Story",
    leadLine: "And this was the best part of it…",
    video: "/videos/special-moment.mp4",
  },

  // ── Personalized closing credits ─────────────────────────
  credits: [
    { role: "Directed by", names: ["God"] },
    { role: "Created by", names: ["Manan"] },
    { role: "Starring", names: ["Manan", "Diya"] },
    { role: "Written by", names: ["Fate & Destiny"] },
    { role: "Produced by", names: ["Our Parents"] },
    { role: "Cinematography by", names: ["Every Random Photo We Took"] },
    { role: "Edited by", names: ["Late Night Conversations"] },
    { role: "Special thanks to", names: ["Family & Friends"] },
    { role: "Executive producers", names: ["Our Memories"] },
    { role: "Soundtrack", names: ["Perfect — Ed Sheeran"] },
  ],

  finalScreen: {
    seasonLine: "Season 1 complete.",
    continuedLine: "But our story isn't.",
    smallLine: "More memories coming soon…",
    letter: {
      title: "A Letter For You",
      salutation: "My love,",
      paragraphs: [
        "Write your first paragraph here.",
        "Write your second paragraph here.",
        "Write your final paragraph here.",
      ],
      signOff: "Forever yours,\nManan",
    },
    replayLabel: "Replay",
  },
};

export default siteData;
