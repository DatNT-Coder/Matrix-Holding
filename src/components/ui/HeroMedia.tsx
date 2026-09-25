import { useEffect, useRef, useState } from "react";

export function HeroMedia({ poster }: { poster: string }) {
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const isVisible = useRef(true);
  const [playing, setPlaying] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const source = "/videos/matrix-hero-pixverse.mp4";
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled || !container.current) return;

    const syncPlayback = () => {
      const media = video.current;
      if (!media) return;
      if (!isVisible.current || document.hidden || manuallyPaused.current) {
        media.pause();
        return;
      }
      void media.play().catch(() => setEnabled(false));
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting && entry.intersectionRatio >= 0.15;
        syncPlayback();
      },
      { threshold: [0, 0.15] },
    );
    observer.observe(container.current);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, [enabled]);

  const togglePlayback = () => {
    const media = video.current;
    if (!media) return;
    if (media.paused) {
      manuallyPaused.current = false;
      void media.play().catch(() => setEnabled(false));
    } else {
      manuallyPaused.current = true;
      media.pause();
    }
  };

  return <div ref={container} className="absolute inset-0">
    <img src={poster} alt="Biệt thự hiện đại bên hồ bơi" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-center" />
    {source && enabled && <>
      <video ref={video} src={source} poster={poster} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setEnabled(false)} className="absolute inset-0 h-full w-full object-cover" />
      <button type="button" onClick={togglePlayback} className="absolute right-6 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/60 bg-black/40 px-4 py-2 text-xs font-semibold text-white transition hover:bg-black/65 sm:right-8">{playing ? "Tạm dừng video" : "Phát video"}</button>
    </>}
  </div>;
}
