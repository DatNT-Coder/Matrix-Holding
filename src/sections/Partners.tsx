import { useEffect, useRef } from "react";

const partners = [
  "Masuto",
  "Techcombank",
  "Trioblade Việt Nam",
  "Vua Nệm",
  "Dream Pool Fitness & Yoga",
  "JBL",
  "Ely Wedding",
  "HoangHaMobile.com",
  "Hazal Beauty",
  "Bò Tơ Quán Mộc",
  "Shila Spa",
  "Khô Đa GMC",
  "Heros Fitness & Yoga",
  "Samie Beauty Center",
  "Infinity Fitness Without Limits",
  "Trống Đồng Palace Convention Center",
  "Royal International Aesthetic Hospital",
  "Farina",
] as const;

export function Partners() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, startX: 0, startScrollLeft: 0 });
  const hoverState = useRef(false);
  const logoItems = [...partners, ...partners];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationFrame = 0;
    let previousTime = performance.now();
    const move = (currentTime: number) => {
      const elapsed = Math.min(currentTime - previousTime, 40);
      previousTime = currentTime;

      if (!dragState.current.active && !hoverState.current && track.scrollWidth > track.clientWidth) {
        track.scrollLeft += elapsed * 0.035;
        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(move);
    };

    animationFrame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const startDragging = (clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    dragState.current = {
      active: true,
      startX: clientX,
      startScrollLeft: track.scrollLeft,
    };
  };

  const drag = (clientX: number) => {
    const track = trackRef.current;
    if (!track || !dragState.current.active) return;
    track.scrollLeft = dragState.current.startScrollLeft - (clientX - dragState.current.startX);
  };

  const stopDragging = () => {
    dragState.current.active = false;
  };

  return (
    <section className="overflow-hidden bg-[#dceefa] py-16 text-navy lg:py-20">
      <div className="mx-auto max-w-[1220px] px-6">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-brand">
              Đối tác & nhà tài trợ
            </p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Đồng hành cùng Matrix Holding
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted sm:text-right">
            Sự tin tưởng của các thương hiệu là động lực để chúng tôi tiếp tục
            kiến tạo những giá trị kinh doanh bền vững.
          </p>
        </div>

        <div className="mt-7 flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy/60">
            Tự động trượt · Rê chuột để dừng và kéo xem thêm
          </p>
          <span className="h-px flex-1 bg-navy/15" />
        </div>
        <div
          ref={trackRef}
          className="partner-scrollbar mt-5 flex cursor-grab gap-5 overflow-x-auto select-none active:cursor-grabbing"
          onPointerEnter={() => {
            hoverState.current = true;
          }}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            startDragging(event.clientX);
          }}
          onPointerMove={(event) => drag(event.clientX)}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
          onPointerLeave={() => {
            stopDragging();
            hoverState.current = false;
          }}
        >
          {logoItems.map((partner, index) => (
            <div
              key={`${partner}-${index}`}
              className="flex h-[118px] w-[208px] shrink-0 items-center justify-center rounded-2xl border border-navy/10 bg-white p-4 shadow-[0_10px_26px_rgba(5,31,69,0.08)] transition duration-300 hover:-translate-y-1 hover:border-blue-brand/40 hover:shadow-[0_16px_32px_rgba(5,31,69,0.14)]"
            >
              <img
                src={`/images/partner-${String((index % partners.length) + 1).padStart(2, "0")}.png`}
                alt={`Logo ${partner}`}
                loading={index < 6 ? "eager" : "lazy"}
                draggable={false}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
