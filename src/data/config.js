// ─────────────────────────────────────────────────────────────
//  ANNIVERSARY SITE — CENTRAL CONFIG
//  Everything you want to personalize lives in this one file.
//  Swap text, dates, and photo/music filenames below — you do
//  not need to touch any component to make this "yours".
//
//  Photos: drop files into  /public/photos/  and reference them
//  here as "/photos/yourfile.jpg". If a file is missing, the
//  site will automatically fall back to a soft placeholder so
//  nothing breaks.
//
//  Music: drop an mp3 into /public/music/ and point `song.src`
//  at it. If it's missing, the music player disables itself
//  gracefully instead of erroring.
// ─────────────────────────────────────────────────────────────

const anniversaryData = {
  // ── People & date ────────────────────────────────────────
  partnerName: "Diya",
  yourName: "Manan",
  anniversaryDate: "12 June 2024",
  yearsTogether: "2",

  // ── Page 1 — Opening ─────────────────────────────────────
  opening: {
    eyebrow: "a little something for you",
    heading: "Some gifts aren't expensive,\njust meaningful.",
    buttonLabel: "Open Your Gift",
    photos: [
      { src: "/photos/opening-1.jpg", alt: "A candid photo of us laughing" },
      { src: "/photos/opening-2.jpg", alt: "Us on a quiet evening walk" },
      { src: "/photos/opening-3.jpg", alt: "A close-up from our last trip" },
    ],
  },

  // ── Page 2 — Vinyl / Music ───────────────────────────────
  song: {
    title: "Chasing Cars",
    artist: "Snow Patrol",
    src: "/music/SnowPatrol_-_ChasingCars_(mp3.pm).mp3",
    albumArt: "/photos/album-art.jpg",
    note: "the song that was playing when I knew",
  },

  // ── Page 3 — Anniversary message ─────────────────────────
  anniversaryMessage: {
    title: "Happy\nAnniversary",
    subtitle: "To the most beautiful chapter of my life",
    photo: { src: "/photos/couple-main.jpg", alt: "Us, together" },
  },

  // ── Page 4 — Our Story ────────────────────────────────────
  story: {
    title: "Our Story",
    intro: "Every love has a beginning worth remembering.",
    milestones: [
      {
        date: "4 October 2022",
        title: "First Meeting",
        caption: "Where it all started…",
        text: "I never expected to meet someone like you, and I was confused at the same time. I think it was chance, or maybe luck, that brought us together on a bus filled with what felt like a billion people, with you sitting right next to me. Even after my first rejection, you made me a better person by helping me realize that I was not completely happy with who I was. I was going through things that I had not understood before, and somehow, without even knowing it, I was beginning to love you.",
        image: { src: "/photos/story-1.jpg", alt: "The place we first met" },
      },
      {
        date: "21 February 2024",
        title: "First No",
        caption: "Some answers still become part of the story.",
        text: "I still remember looking into your eyes and realizing that I might mess things up when I asked you out again, especially because the chances of rejection were so high. You were still awkward and unsure how to say no, in the most endearing way, because you were simply being yourself. Thank you for calling me back on the third day. You could have gone to the mall instead, but you chose to spend that time with me, and I will always remember it.",
        image: { src: "/photos/story-2.jpg", alt: "Our first date" },
      },
      {
        date: "22 July 2025",
        title: "First Yes (In Some Sorts)",
        caption: "The answer that changed everything.",
        text: "It was not a simple yes, but it was enough to make me believe there could be an us. Somewhere between the awkwardness, the uncertainty, and the way you were simply being yourself, we found our way closer to each other.",
        image: { src: "/photos/story-3.jpg", alt: "The beginning of us" },
      },
      {
        date: "12 September 2025",
        title: "Favorite Memory: Infinite",
        caption: "Some memories never stop becoming more special.",
        text: "There are so many memories I could choose, but this is the one I always remember. I was going home when you told me that I was also your home. It was nothing fancy, but it became one of the moments closest to my heart. That is my favorite memory.",
        image: { src: "/photos/memory-8.jpg", alt: "Our favorite memory" },
      },
    ],
  },

  // ── Page 5 — Memory Gallery ───────────────────────────────
  gallery: {
    title: "Our Memories",
    subtitle: "A handful of moments, out of thousands.",
    photos: [
      { src: "/photos/memory-1.jpg", alt: "Memory one", caption: "Rainy afternoons, your favorite kind of weather.", frame: "polaroid" },
      { src: "/photos/memory-2.jpg", alt: "Memory two", caption: "That trip we still talk about.", frame: "film" },
      { src: "/photos/memory-3.jpg", alt: "Memory three", caption: "Your laugh — my favorite sound.", frame: "portrait" },
      { src: "/photos/memory-4.jpg", alt: "Memory four", caption: "Late night drives, no destination.", frame: "polaroid" },
      { src: "/photos/memory-5.jpg", alt: "Memory five", caption: "Just an ordinary Tuesday, made extraordinary.", frame: "film" },
      { src: "/photos/memory-6.jpg", alt: "Memory six", caption: "Dancing badly in the kitchen.", frame: "polaroid" },
      { src: "/photos/memory-7.jpg", alt: "Memory seven", caption: "The birthday surprise that almost went wrong.", frame: "portrait" },
      { src: "/photos/memory-8.jpg", alt: "Memory eight", caption: "Home is wherever you are.", frame: "film" },
    ],
  },

  // ── Page 6 — Favorite Person ──────────────────────────────
  favoritePerson: {
    heading: "My Favorite Person",
    quote: "Out of all the people in this world,\nsomehow I found you.",
    message:
      "You make ordinary days feel like the best ones. Thank you for being my favorite person, my best friend, and my home.",
    photo: { src: "/photos/favorite-person.jpg", alt: "You, my favorite person" },
  },

  // ── Page 7 — The Letter ───────────────────────────────────
  letter: {
    title: "A Letter For You",
    salutation: "My love,",
    paragraphs: [
      "I've rewritten this letter more times than I can count, because no version of it ever feels like enough. So I'll just tell you the truth.",
      "Thank you for choosing me, every single day, in the small ways that matter most — the coffee left on my desk, the patience on my hardest days, the way you make our home feel safe.",
      "I don't know what the years ahead will look like, but I know I want to spend every one of them figuring it out with you.",
    ],
    signOff: "Forever yours,",
    signature: "Manan",
  },

  // ── Page 8 — Final message ────────────────────────────────
  final: {
    heading: "Happy Anniversary ❤️",
    message:
      "Here's to all the memories we've made\nand all the ones still waiting for us.",
    closingLine: "Forever yours.",
    photo: { src: "/photos/final.jpg", alt: "Us, always" },
  },

  // ── Navigation labels ─────────────────────────────────────
  nav: [
    { label: "Beginning" },
    { label: "Our Song" },
    { label: "Our Story" },
    { label: "Memories" },
    { label: "You" },
    { label: "Letter" },
    { label: "Forever" },
  ],
};

export default anniversaryData;
