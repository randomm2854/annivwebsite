# 365 Days With You

A single-page romantic anniversary website with **React**, **Vite**, **Tailwind CSS**, and **shadcn/ui** — personal, emotional, and mobile-first.

## Quick start

1. **Install dependencies** (requires [Node.js](https://nodejs.org)):
   ```bash
   npm install
   ```
2. **Run the dev server**:
   ```bash
   npm run dev
   ```
   Open the URL shown (e.g. http://localhost:5173).
3. **Build for production**:
   ```bash
   npm run build
   ```
   Output is in `dist/`. Preview with `npm run preview`.

## Customization

- **Background** — The site uses the glossy hearts image as the full-page background. Place your image at `public/bg-hearts.png` (high resolution recommended). Fallback color is `#6b2d5c` if the image is missing.
- **Story** — Edit the `STORY_BLOCKS` array in `src/App.tsx`.
- **Gallery** — Add images as `public/images/photo1.jpg`, `photo2.jpg`, etc. They’ll show automatically in the grid and in the lightbox.
- **Timeline** — Edit the `TIMELINE_ITEMS` array in `src/App.tsx` (dates and descriptions).
- **Love letter** — Change the `LOVE_LETTER` constant in `src/App.tsx`.
- **Music** — Add an MP3 as `public/audio/soft-piano.mp3`. The Music button will play it (no autoplay).

## shadcn/ui

The project uses **shadcn/ui** components:

- **Button** — Music toggle, “Click for a Surprise”, and styling.
- **Card** — Story blocks and the revealed love letter.
- **Dialog** — Photo lightbox (modal) for the gallery.

To add more components:

```bash
npx shadcn@latest add <component-name>
```

Component source lives in `src/components/ui/`. Theme (colors, radius) is in `src/index.css` via `@theme`.

## Deploy on Vercel

1. Push this folder to a GitHub repo.
2. Go to [vercel.com](https://vercel.com) → New Project → Import the repo.
3. Vercel will detect Vite; use **Build Command**: `npm run build`, **Output Directory**: `dist`.
4. Deploy and share the link.

## Tech

- **React 18** + **TypeScript**
- **Vite** — build and dev server
- **Tailwind CSS v4** — styling
- **shadcn/ui** — Button, Card, Dialog (Radix UI + CVA)
- **lucide-react** — Music icon

The original static version is backed up as `index-static-backup.html` (and in `css/`, `js/`).
