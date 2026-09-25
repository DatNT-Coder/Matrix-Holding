import { useEffect, useRef, useState } from "react";

export function HeroMedia({ poster }: { poster: string }) {
  const video = useRef<HTMLVideoElement>(null);
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
  return <>
    <img src={poster} alt="Biệt thự hiện đại bên hồ bơi" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-center" />
    {source && enabled && <>
      <video ref={video} src={source} poster={poster} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setEnabled(false)} className="absolute inset-0 h-full w-full object-cover" />
      <button type="button" onClick={() => { if (video.current?.paused) { void video.current.play().catch(() => setEnabled(false)); } else { video.current?.pause(); } }} className="absolute right-6 top-6 z-20 rounded-full border border-white/60 bg-black/40 px-4 py-2 text-xs font-semibold text-white hover:bg-black/65">{playing ? "Tạm dừng video" : "Phát video"}</button>
    </>}
  </>;
}
