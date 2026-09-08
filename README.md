# For You — A Personalized Memoryflix Experience

A cinematic anniversary website built with React, Vite, Tailwind CSS, and Framer Motion. Visitors open a romantic scrapbook-style intro, then land inside **Memoryflix** — a fictional, fully personal streaming platform built entirely from your own photos, videos, and memories.

This is not connected to Netflix in any way — no real backend, accounts, or copyrighted assets. It's an original interface, inspired by that visual language, running entirely on your own local files.

---

## The experience, start to finish

1. **Intro** — the romantic scrapbook opening screen ("Open Your Gift")
2. **Who's Watching?** — pick a profile (Me / Her / Us / Best Memories / Our Friends)
3. **Home** — a Netflix-style hero banner plus horizontally-scrolling rows of memories
4. **Watch or view a memory** — videos open in a full player, photos open in a cinematic lightbox
5. **Continue exploring** — search, add memories to "My List", resume where you left off
6. **The special sequence** — click "Play Our Story" on the hero for a cinematic lead-in and a personal video
7. **Credits** — a scrolling, movie-style closing credits sequence
8. **Season complete** — a closing screen with a **Replay** button that restarts the whole thing

---

## 1. Install the project

You'll need [Node.js](https://nodejs.org/) 18 or newer installed on your Windows laptop.

Open the project folder in VS Code, then open a terminal (``Terminal → New Terminal``) and run:

```bash
npm install
```

## 2. Run it locally

```bash
npm run dev
```

Vite will print a local address, usually `http://localhost:5173/`. Open that in your browser. The page hot-reloads as you edit files.

## 3. Where to put your media

```
public/photos/   ← profile pictures, hero image, memory thumbnails, photo memories
public/videos/   ← memory videos, the hero loop, the special cinematic video
public/music/    ← the ambient background song for the intro/browsing screens
```

Supported formats: `.jpg` `.jpeg` `.png` `.webp` for images, `.mp4` `.webm` for video, `.mp3` for audio.

**You don't need any real media to try the site.** Every photo, video, and the background song fall back to a graceful placeholder or a disabled control if the file isn't there yet — nothing ever shows a broken image or a console error.

## 4. Where to customize everything

Two files control all personalization — you never need to touch a component:

```
src/data/config.js       ← the opening scrapbook screen (names, date, opening message)
src/data/memoryData.js   ← the entire Memoryflix experience
```

### `memoryData.js` — adding or editing a memory

Every card in the app comes from the `memories` array. To add a new one, add an object like this:

```js
{
  id: 11,                          // must be unique
  title: "Our Anniversary Dinner",
  category: "Core Memories ❤️",    // must match one of the `categories` below, or add a new one
  date: "12 August 2025",
  type: "video",                   // "video" or "photo"
  thumbnail: "/photos/dinner.jpg",
  video: "/videos/dinner.mp4",     // for type: "video"
  description: "...",
}
```

For a photo memory, use `type: "photo"` and a `caption` instead of `video`. You never need to edit any component file — new memories automatically appear in their category's row, in search, in Photos/Videos/Favorites, and in the video/photo viewer's next/previous order.

Other things you can customize in the same file:

- `profiles` — the "Who's Watching?" profile cards
- `hero` — the home screen's title, description, and background image
- `categories` — the row titles and their order
- `cinematic` — the lead-in line and video for the special sequence
- `credits` — every role and name in the closing credits
- `finalScreen` — the "Season complete" closing text

## 5. What's remembered between visits

The app uses your browser's local storage (no account, no server) to remember:

- **Continue Watching** — how far into each video you got
- **My List** — memories you've added with the ＋ button
- **Selected profile** — so it doesn't ask every time

This data stays on your device only. Clearing your browser's site data resets it.

## 6. Navigating the site

- Inside Memoryflix: click a nav link (**Home / Our Story / Memories / Photos / Videos / Favorites**), use the search icon, or scroll a row with the arrows that appear on hover
- Inside the video or photo viewer: use the on-screen prev/next arrows to move between memories
- Inside the video player specifically: **Space** to play/pause, **Esc** to close

## 7. Build for production

```bash
npm run build
```

This creates a `dist/` folder with the finished static site. Preview it locally with `npm run preview`, or upload the contents of `dist/` to any static host (Netlify, Vercel, GitHub Pages, your own server).

## Project structure

```
src/
  components/        The opening scrapbook screen (Intro, MusicPlayer, shared Frame)
  netflix/           The whole Memoryflix experience (profiles, home, player, credits...)
  data/
    config.js         ← opening screen personalization
    memoryData.js      ← Memoryflix personalization (edit this the most)
  hooks/
    useLocalStorage.js
public/
  photos/, videos/, music/    Your media goes here
```

## Troubleshooting

- **Photos or videos not showing?** Double-check the filename in `memoryData.js` exactly matches the file in `public/photos/` or `public/videos/` (case-sensitive).
- **Background music not playing?** Some browsers block autoplay if the tab was backgrounded — click the play button in the small music control at the bottom-left.
- **Continue Watching / My List not saving?** Private/incognito browsing windows sometimes block local storage — the site still works, it just won't remember between visits in that mode.
- **Fonts look off?** The site loads Google Fonts (Playfair Display, Cormorant Garamond, Allura, Inter) over the internet — make sure you have a connection while viewing it, or self-host the fonts for a fully offline copy.
