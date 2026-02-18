import { useRef, useState, useEffect, type SyntheticEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Music } from "lucide-react"

const STORY_BLOCKS = [
  {
    preview: "We met in a way that felt like fate — from the very first conversation I knew there was something special about you.",
    full: "We met in a way that felt like fate — how we met. From the first conversation, I knew there was something special about you. I still have the chocolate you gave me in our first interaction.",
  },
  {
    preview: "Our first date was simple but perfect — I was nervous, happy, and already hoping there would be a second one.",
    full: "Our first date was simple but perfect. First date memory. I still remember every detail and how nervous and happy I felt. The way you laughed, the way time disappeared, and how I walked home smiling the whole way. I just couldn't believe the fact that you agreed for a date and that sent me to the moon.",
  },
  {
    preview: "We’ve had our tough moments too, but every time we chose each other and became even stronger together.",
    full: "We've had our tough moments too. Tough times. But we always chose each other, and that made us stronger. Even on the hard days, you reminded me what it means to love someone fully and honestly. We fight for the relationship, we make each otehr understand what's right and what's wrong and that's the best part about it.",
  },
  {
    preview: "This year we grew together — you’ve made me want to be a better person every single day.",
    full: "This year we grew — together. Growth. You've made me want to be a better person every day. With you, I’ve learned patience, the feeling of seeing someone happy becuase of something you did, and what it really means to build a life side by side.",
  },
  {
    preview: "Now, 365 days later, I’m more sure than ever: you’re my person, and I can’t wait for everything ahead.",
    full: "And now, 365 days later, I'm more sure than ever: you're my person. Cheers to all the mornings, nights, adventures, quiet moments, and all the little happy moments that happen in our lives that I only ever want to share with you.",
  },
]

const GALLERY_ITEMS = [
  { src: "/images/first-photo.JPG", placeholder: "1" },
  { src: "/images/photo2.jpg", placeholder: "2" },
  { src: "/images/photo3.jpg", placeholder: "3" },
  { src: "/images/photo4.jpg", placeholder: "4" },
  { src: "/images/photo5.jpg", placeholder: "5" },
  { src: "/images/photo6.jpg", placeholder: "6" },
  { src: "/images/photo7.jpg", placeholder: "7" },
  { src: "/images/photo8.jpg", placeholder: "8" },
  { src: "/images/photo9.jpg", placeholder: "9" },
  { src: "/images/photo10.jpg", placeholder: "10" },
  { src: "/images/photo11.jpg", placeholder: "11" },
  { src: "/images/photo12.jpg", placeholder: "12" },
  { src: "/images/photo13.jpg", placeholder: "13" },
  { src: "/images/photo14.jpg", placeholder: "14" },
  { src: "/images/photo15.jpg", placeholder: "15" },
  { src: "/images/photo16.jpg", placeholder: "16" },
  { src: "/images/photo17.jpg", placeholder: "17" },
  { src: "/images/photo18.jpg", placeholder: "18" },
  { src: "/images/photo19.jpg", placeholder: "19" },
  { src: "/images/photo20.jpg", placeholder: "20" },
  { src: "/images/photo21.jpg", placeholder: "21" },
  { src: "/images/photo22.jpg", placeholder: "22" },
  { src: "/images/photo23.jpg", placeholder: "23" },
  { src: "/images/photo24.jpg", placeholder: "24" },
  { src: "/images/photo25.jpg", placeholder: "25" },
  { src: "/images/photo26.jpg", placeholder: "26" },
  { src: "/images/photo27.jpg", placeholder: "27" },
  { src: "/images/photo28.jpg", placeholder: "28" },
]

const TIMELINE_ITEMS = [
  { date: "04/October/2024", desc: "The day everything changed. You walked in and I couldn't look away." },
  { date: "06/February/2025", desc: "I was nervous but wanted more. I knew I wanted a second date before the first was over." },
  { date: "18/February/2025", desc: "I finally built up the courage to ask you to be my girlfriend, one of the best decisions I've made." },
  { date: "01/November/2025", desc: "Our first trip together, doesn't need much words." },
  { date: "Today 18/02/2026 — 1 year", desc: "365 days of choosing you. I'd choose you again every single lifetime." },
]

const LOVE_LETTER =
  "You are the best thing that has ever happened to me Akshu. This past year has been the most beautiful of my life — not because of the places we went or the things we did, but because of you. Your smile, your laugh, the way you care, the way you push me to be better. I fall in love with you again every day. Thank you for every moment. I can't wait for all our tomorrows. I love you, forever Akshu. ♡"

function useIntersectionObserver() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { rootMargin: "0px 0px -80px 0px", threshold: 0.1 }
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [])
  return { ref, visible }
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalImage, setModalImage] = useState<string | null>(null)
  const [storyOpen, setStoryOpen] = useState(false)
  const [storyText, setStoryText] = useState("")
  const [letterRevealed, setLetterRevealed] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const confettiRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleGalleryClick = (src: string) => {
    setModalImage(src)
    setModalOpen(true)
  }

  const handleSurprise = () => {
    setLetterRevealed(true)
    if (confettiRef.current) {
      const symbols = ["♥", "♡"]
      for (let i = 0; i < 25; i++) {
        const el = document.createElement("span")
        el.className = "absolute bottom-0 text-primary opacity-70 animate-[miniHeartRise_3s_ease-out_forwards]"
        el.style.left = Math.random() * 100 + "%"
        el.style.animationDelay = Math.random() * 0.5 + "s"
        el.style.animationDuration = 2.5 + Math.random() * 2 + "s"
        el.textContent = symbols[i % 2]
        confettiRef.current.appendChild(el)
      }
    }
  }

  const toggleMusic = () => {
    if (!audioRef.current) {
      const audio = new Audio("/audio/Apocalypse - Cigarettes After Sex.mp3")
      audio.loop = true
      ;(audioRef as { current: HTMLAudioElement | null }).current = audio
      audio.play().then(() => setMusicPlaying(true)).catch(() => {})
    } else if (musicPlaying) {
      audioRef.current.pause()
      setMusicPlaying(false)
    } else {
      audioRef.current.play().then(() => setMusicPlaying(true)).catch(() => {})
    }
  }

  const fireworksRef = useRef<HTMLDivElement>(null)
  const triggerFireworks = (clientX: number, clientY: number) => {
    const container = fireworksRef.current
    if (!container) return
    const colors = ["#ff6b9d", "#ffa8c5", "#fff5f8", "#f8c4d4", "#e2d0d3"]
    const isMobile = window.innerWidth < 640
    const particleCount = isMobile ? 64 : 128
    const particles: HTMLDivElement[] = []
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const dist = 60 + Math.random() * 120
      const tx = Math.cos(angle) * dist
      const ty = Math.sin(angle) * dist
      const el = document.createElement("div")
      el.className = "firework-particle"
      el.style.left = `${clientX}px`
      el.style.top = `${clientY}px`
      el.style.setProperty("--fw-tx", `${tx}px`)
      el.style.setProperty("--fw-ty", `${ty}px`)
      el.style.setProperty("--fw-angle", `${angle}rad`)
      el.style.background = colors[Math.floor(Math.random() * colors.length)]
      el.style.animationDuration = `${0.5 + Math.random() * 0.35}s`
      container.appendChild(el)
      particles.push(el)
    }
    setTimeout(() => {
      particles.forEach((el) => el.remove())
    }, 950)
  }

  const [catLeft, setCatLeft] = useState(50)
  const [catTop, setCatTop] = useState(50)
  const [showCat, setShowCat] = useState(false)
  const [heartCount, setHeartCount] = useState(22)

  useEffect(() => {
    setHeartCount(window.innerWidth < 640 ? 12 : 22)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setShowCat(true), 45000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const move = () => {
      setCatLeft(10 + Math.random() * 75)
      setCatTop(10 + Math.random() * 75)
    }
    move()
    const t = setInterval(move, 2400 + Math.random() * 1200)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      <div ref={fireworksRef} className="fixed inset-0 pointer-events-none z-40" aria-hidden />
      <div className="fixed inset-0 pointer-events-none z-10" aria-hidden>
        {Array.from({ length: heartCount }).map((_, i) => {
          const size = 18 + (i % 4) * 4
          const leftPositions = [4, 14, 24, 34, 44, 54, 64, 74, 84, 94, 10, 30, 50, 70, 90, 20, 40, 60, 80, 15, 45, 75] as const
          const left = leftPositions[i % leftPositions.length]
          const delay = (i * 1.37) % 20
          const duration = 18 + (i % 5) * 4
          const bottomOffset = -12 - (i % 3) * 10
          const baseOpacity = 0.35 + (i % 4) * 0.12
          return (
            <span
              key={i}
              className="floating-heart-global"
              style={{
                left: `${left}%`,
                bottom: `${bottomOffset}vh`,
                animationDelay: `-${delay}s`,
                animationDuration: `${duration}s`,
                opacity: baseOpacity,
                fontSize: `${size}px`,
              }}
            >
              ♥
            </span>
          )
        })}
      </div>
      {showCat && (
        <button
          type="button"
          onClick={(e: { clientX: number; clientY: number }) => triggerFireworks(e.clientX, e.clientY)}
          className="fixed z-[45] w-16 h-16 flex items-center justify-center text-4xl cursor-pointer select-none touch-manipulation hover:scale-110 active:scale-95 transition-transform duration-200 focus:outline-none focus:ring-0"
          style={{
            left: `calc(${catLeft}% - 2rem)`,
            top: `calc(${catTop}% - 2rem)`,
            transition: "left 5s linear, top 5s linear",
          }}
          aria-label="Tap for fireworks"
        >
          🐱
        </button>
      )}
      <Button
        variant="outline"
        size="sm"
o        className="fixed top-5 right-5 z-50 rounded-full glass border-white/30 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
        onClick={toggleMusic}
        aria-label="Toggle background music"
      >
        <Music className={`h-4 w-4 transition-transform duration-300 ${musicPlaying ? "opacity-100" : "opacity-70"}`} />
        <span className="ml-1.5 text-sm font-medium">Music</span>
      </Button>

      <header className="snap-section relative min-h-screen min-h-[100dvh] flex items-center justify-center text-center overflow-hidden">
        {/* Light scrim for title readability – hearts background shows through */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="absolute text-primary/50 text-2xl animate-[floatHeart_6s_ease-in-out_infinite]"
              style={{
                left: [8, 22, 55, 78, 15, 88][i] + "%",
                top: [12, 75, 18, 55, 45, 25][i] + "%",
                animationDelay: [-0, -1.5, -3, -4.5, -2, -5][i] + "s",
              }}
            >
              ♥
            </span>
          ))}
        </div>
        <div className="relative z-10 px-6 max-w-[92%]">
          <h1
            className="font-serif font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground tracking-tight mb-4 animate-[fadeInUp_0.8s_ease-out_both] drop-shadow-lg"
            style={{ animationDelay: "0.1s" }}
          >
            365 Days With You
          </h1>
          <p
            className="text-base sm:text-lg text-foreground/90 max-w-[30ch] mx-auto animate-[fadeInUp_0.8s_ease-out_both] drop-shadow-md"
            style={{ animationDelay: "0.25s" }}
          >
            Every moment with you feels like the best chapter of my life.
          </p>
        </div>
      </header>

      <section className="snap-section py-20 sm:py-24" id="story">
        <div className="w-full max-w-2xl mx-auto px-6">
          <h2 className="font-serif font-semibold text-3xl sm:text-4xl text-foreground text-center mb-4 animate-[fadeInUp_0.6s_ease-out_both]">
            Our Story
          </h2>
          <p className="text-muted-foreground text-center text-sm sm:text-base mb-12 animate-[fadeInUp_0.6s_ease-out_both]" style={{ animationDelay: "0.05s" }}>
            A year of moments we’ll never forget
          </p>
          <div className="flex flex-col gap-5">
            {STORY_BLOCKS.map((block, i) => (
              <StoryBlock
                key={i}
                text={block.preview}
                index={i}
                onOpen={() => {
                  setStoryText(block.full)
                  setStoryOpen(true)
                }}
              />
            ))}
          </div>
          <p className="mt-4 text-center text-muted-foreground text-xs sm:text-sm">
            Tap to read more
          </p>
        </div>
      </section>

      <Dialog open={storyOpen} onOpenChange={setStoryOpen}>
        <DialogContent showClose className="max-w-lg p-0 rounded-2xl overflow-hidden">
          <DialogTitle className="sr-only">Story</DialogTitle>
          <div className="p-8 sm:p-10">
            <p className="font-serif text-xl sm:text-2xl leading-relaxed text-foreground">
              {storyText}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <section className="snap-section py-20 sm:py-24 overflow-hidden" id="gallery">
        <div className="w-full max-w-5xl mx-auto px-6">
          <h2 className="font-serif font-semibold text-3xl sm:text-4xl text-foreground text-center mb-4 animate-[fadeInUp_0.6s_ease-out_both]">
            Our Moments
          </h2>
          <p className="text-muted-foreground text-center text-sm sm:text-base mb-12 animate-[fadeInUp_0.6s_ease-out_both]" style={{ animationDelay: "0.05s" }}>
            Hover and click the photos
          </p>

          <FloatingPhotos items={GALLERY_ITEMS} onSelect={handleGalleryClick} />

          <p className="text-center text-muted-foreground/80 text-xs mt-8">
            Click any photo to open full size
          </p>
        </div>
      </section>

      <Dialog open={modalOpen} onOpenChange={(open: boolean) => { setModalOpen(open); if (!open) setModalImage(null); }}>
        <DialogContent showClose className="max-w-[95vw] max-h-[90vh] p-0 rounded-2xl overflow-hidden">
          <DialogTitle className="sr-only">Photo view</DialogTitle>
          {modalImage && (
            <img
              src={modalImage}
              alt="A special memory"
              className="w-full h-auto max-h-[90vh] object-contain block"
              onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.style.display = "none"
                const next = e.currentTarget.nextElementSibling as HTMLElement | null
                if (next) next.style.display = "block"
              }}
            />
          )}
          <p
            className="p-6 text-center text-muted-foreground text-sm"
            style={{ display: modalImage ? "none" : "block" }}
            id="modal-fallback"
          >
            Add your photos to the <code className="bg-secondary px-1.5 py-0.5 rounded-md">public/images</code> folder.
          </p>
        </DialogContent>
      </Dialog>

      <section className="snap-section py-20 sm:py-24" id="timeline">
        <div className="w-full max-w-2xl mx-auto px-6">
          <h2 className="font-serif font-semibold text-3xl sm:text-4xl text-foreground text-center mb-4 animate-[fadeInUp_0.6s_ease-out_both]">
            Our Milestones
          </h2>
          <p className="text-muted-foreground text-center text-sm sm:text-base mb-12 animate-[fadeInUp_0.6s_ease-out_both]" style={{ animationDelay: "0.05s" }}>
            The moments that defined us
          </p>
          <div className="glass rounded-2xl p-6 sm:p-8 border border-white/20">
            <div className="relative pl-10 sm:pl-12 border-l-2 border-primary/70 ml-1">
              {TIMELINE_ITEMS.map((item, i) => (
                <TimelineItem key={i} date={item.date} desc={item.desc} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="snap-section py-20 sm:py-24 pb-28" id="love-letter">
        <div className="w-full max-w-2xl mx-auto px-6">
          {!letterRevealed ? (
            <div className="flex flex-col items-center gap-6 animate-[fadeInUp_0.6s_ease-out_both]">
              <p className="text-muted-foreground text-center text-sm">
                There’s one more thing for you
              </p>
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-base font-medium bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-300 animate-[pulse-soft_2.5s_ease-in-out_infinite]"
                onClick={handleSurprise}
              >
                Click for a Surprise
              </Button>
            </div>
          ) : (
            <div className="relative mt-4 animate-[letterReveal_0.6s_ease-out_both]" ref={confettiRef}>
              <Card className="glass border border-white/25 shadow-2xl overflow-hidden">
                <CardContent className="p-8 sm:p-10">
                  <p className="font-serif text-lg sm:text-xl leading-relaxed text-foreground italic">
                    {LOVE_LETTER}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      <footer className="snap-section text-center py-10 px-6 text-sm text-muted-foreground glass-strong border-t border-white/10">
        <p>Made with love · 365 days and counting</p>
      </footer>
    </>
  )
}

/* Crowded floating layout – many photos, overlapping, varied sizes */
/* Crowded + overlapping: some positions deliberately close so photos stack */
const FLOAT_LAYOUT = [
  { left: "0%", top: "1%", width: "w-20 sm:w-24", rotate: -8, anim: "floatPhoto", delay: 0, z: 5 },
  { left: "12%", top: "0%", width: "w-24 sm:w-28", rotate: 5, anim: "floatPhotoAlt", delay: 0.3, z: 10 },
  { left: "8%", top: "18%", width: "w-20 sm:w-24", rotate: -4, anim: "floatPhotoSlow", delay: 0.6, z: 0 },
  { left: "35%", top: "2%", width: "w-28 sm:w-32", rotate: 6, anim: "floatPhoto", delay: 0.2, z: 10 },
  { left: "48%", top: "8%", width: "w-22 sm:w-26", rotate: -6, anim: "floatPhotoAlt", delay: 0.8, z: 5 },
  { left: "42%", top: "22%", width: "w-20 sm:w-24", rotate: 3, anim: "floatPhotoSlow", delay: 0.4, z: 0 },
  { left: "65%", top: "0%", width: "w-26 sm:w-30", rotate: 4, anim: "floatPhotoAlt", delay: 1, z: 10 },
  { left: "78%", top: "12%", width: "w-20 sm:w-24", rotate: -5, anim: "floatPhoto", delay: 0.5, z: 5 },
  { left: "72%", top: "28%", width: "w-24 sm:w-28", rotate: 7, anim: "floatPhotoSlow", delay: 1.2, z: 0 },
  { left: "90%", top: "5%", width: "w-20 sm:w-24", rotate: -3, anim: "floatPhotoAlt", delay: 0.7, z: 10 },
  { left: "2%", top: "42%", width: "w-24 sm:w-28", rotate: 2, anim: "floatPhoto", delay: 0.9, z: 5 },
  { left: "20%", top: "48%", width: "w-20 sm:w-24", rotate: -7, anim: "floatPhotoSlow", delay: 0.1, z: 0 },
  { left: "15%", top: "62%", width: "w-24 sm:w-28", rotate: 4, anim: "floatPhoto", delay: 1.5, z: 10 },
  { left: "38%", top: "45%", width: "w-22 sm:w-26", rotate: -4, anim: "floatPhotoAlt", delay: 0.4, z: 5 },
  { left: "52%", top: "52%", width: "w-26 sm:w-30", rotate: 5, anim: "floatPhotoSlow", delay: 1.1, z: 0 },
  { left: "70%", top: "48%", width: "w-20 sm:w-24", rotate: -2, anim: "floatPhoto", delay: 0.6, z: 10 },
  { left: "85%", top: "55%", width: "w-24 sm:w-28", rotate: 3, anim: "floatPhotoAlt", delay: 1.3, z: 5 },
  { left: "5%", top: "82%", width: "w-22 sm:w-26", rotate: -6, anim: "floatPhotoSlow", delay: 0.2, z: 0 },
  { left: "75%", top: "85%", width: "w-24 sm:w-28", rotate: 4, anim: "floatPhoto", delay: 0.5, z: 10 },
  { left: "28%", top: "8%", width: "w-20 sm:w-24", rotate: 3, anim: "floatPhotoAlt", delay: 0.15, z: 5 },
  { left: "58%", top: "18%", width: "w-24 sm:w-28", rotate: -5, anim: "floatPhotoSlow", delay: 0.55, z: 0 },
  { left: "25%", top: "72%", width: "w-22 sm:w-26", rotate: 6, anim: "floatPhoto", delay: 0.35, z: 10 },
  { left: "62%", top: "68%", width: "w-20 sm:w-24", rotate: -3, anim: "floatPhotoAlt", delay: 0.95, z: 5 },
  { left: "92%", top: "32%", width: "w-24 sm:w-28", rotate: 4, anim: "floatPhotoSlow", delay: 0.65, z: 0 },
  { left: "0%", top: "58%", width: "w-20 sm:w-24", rotate: -4, anim: "floatPhoto", delay: 1.25, z: 10 },
  { left: "45%", top: "78%", width: "w-26 sm:w-30", rotate: 2, anim: "floatPhotoAlt", delay: 0.45, z: 5 },
  { left: "88%", top: "72%", width: "w-22 sm:w-26", rotate: -7, anim: "floatPhotoSlow", delay: 0.75, z: 0 },
  { left: "32%", top: "28%", width: "w-24 sm:w-28", rotate: 5, anim: "floatPhoto", delay: 1.05, z: 10 },
  { left: "55%", top: "38%", width: "w-20 sm:w-24", rotate: -2, anim: "floatPhotoAlt", delay: 0.25, z: 5 },
  { left: "8%", top: "32%", width: "w-26 sm:w-30", rotate: 6, anim: "floatPhotoSlow", delay: 0.85, z: 0 },
  { left: "82%", top: "42%", width: "w-20 sm:w-24", rotate: -4, anim: "floatPhoto", delay: 0.4, z: 10 },
  { left: "18%", top: "78%", width: "w-24 sm:w-28", rotate: 3, anim: "floatPhotoAlt", delay: 1.15, z: 5 },
  { left: "68%", top: "78%", width: "w-22 sm:w-26", rotate: -5, anim: "floatPhotoSlow", delay: 0.5, z: 0 },
] as const

function FloatingPhotos({
  items,
  onSelect,
}: Readonly<{
  items: ReadonlyArray<{ src: string; placeholder: string }>
  onSelect: (src: string) => void
}>) {
  return (
    <div
      className="relative w-full min-h-[420px] sm:min-h-[540px] md:min-h-[620px]"
      aria-label="Photo gallery"
    >
      {items.map((item, i) => {
        const layout = FLOAT_LAYOUT[i % FLOAT_LAYOUT.length]
        const animClass =
          layout.anim === "floatPhoto"
            ? "animate-[floatPhoto_5s_ease-in-out_infinite]"
            : layout.anim === "floatPhotoAlt"
              ? "animate-[floatPhotoAlt_6s_ease-in-out_infinite]"
              : "animate-[floatPhotoSlow_7s_ease-in-out_infinite]"
        return (
          <FloatingPhotoCard
            key={i}
            item={item}
            layout={layout}
            animClass={animClass}
            onSelect={onSelect}
          />
        )
      })}
    </div>
  )
}

function FloatingPhotoCard({
  item,
  layout,
  animClass,
  onSelect,
}: Readonly<{
  item: { src: string; placeholder: string }
  layout: (typeof FLOAT_LAYOUT)[number]
  animClass: string
  onSelect: (src: string) => void
  key?: number
}>) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const cardRef = useRef<HTMLButtonElement>(null)
  const forceVisible = item.placeholder === "1"

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: "100px" }
    )
    observer.observe(card)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!shouldLoad) return
    setLoaded(false)
    setError(false)

    const img = imgRef.current
    if (!img) return

    // If the image is already cached, some browsers may not fire onLoad reliably.
    if (img.complete) {
      if (img.naturalWidth > 0) setLoaded(true)
      else setError(true)
    }
  }, [item.src, shouldLoad])
  return (
    <button
      ref={cardRef}
      type="button"
      className={`absolute rounded-2xl overflow-hidden shadow-xl ring-2 ring-white/60 cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,107,157,0.35)] hover:ring-primary hover:z-20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:z-20 ${layout.width} ${animClass}`}
      style={{
        left: layout.left,
        top: layout.top,
        animationDelay: `${layout.delay}s`,
        ["--photo-rotate" as string]: `${layout.rotate}deg`,
        zIndex: layout.z ?? 5,
      }}
      onClick={() => onSelect(item.src)}
      aria-label={`View ${item.placeholder} full size`}
    >
      <span className="block aspect-square w-full relative bg-gradient-to-br from-secondary to-primary/40">
        {shouldLoad && (
          <img
            ref={imgRef}
            src={item.src}
            alt=""
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 z-10 ${
              loaded && !error || forceVisible ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
        )}
        {(!loaded || error) && !forceVisible && (
          <span className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs sm:text-sm font-medium z-0">
            {item.placeholder}
          </span>
        )}
      </span>
    </button>
  )
}

function StoryBlock({ text, index, onOpen }: Readonly<{ text: string; index: number; onOpen: () => void; key?: number }>) {
  const { ref, visible } = useIntersectionObserver()
  const delay = index * 0.08
  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: visible ? `${delay}s` : "0s",
      }}
    >
      <button
        type="button"
        onClick={onOpen}
        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent rounded-xl"
      >
        <Card className="glass border border-white/20 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 hover:border-primary/50 transition-all duration-300 overflow-hidden">
          <CardContent className="p-6 sm:p-7 text-foreground text-[1.05rem] leading-relaxed line-clamp-2">
            <p>{text}</p>
          </CardContent>
        </Card>
      </button>
    </div>
  )
}

function TimelineItem({ date, desc, index }: Readonly<{ date: string; desc: string; index: number; key?: number }>) {
  const { ref, visible } = useIntersectionObserver()
  const delay = index * 0.08
  return (
    <article
      ref={ref}
      className="group relative pl-6 sm:pl-8 pb-10 last:pb-0 transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-12px)",
        transitionDelay: visible ? `${delay}s` : "0s",
      }}
    >
      <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-white/20 shadow-md group-hover:scale-125 group-hover:bg-primary/90 transition-transform duration-300" style={{ transform: "translateX(-50%)" }} />
      <time className="block font-serif text-lg font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-200">
        {date}
      </time>
      <p className="text-muted-foreground text-[0.95rem] leading-relaxed">
        {desc}
      </p>
    </article>
  )
}
