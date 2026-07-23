import { MILESTONE_STATS } from "@/data/content";

const offsets = ["lg:mt-0", "lg:mt-12", "lg:mt-4", "lg:mt-16"];

export function Milestone() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-5">
          {MILESTONE_STATS.map((s, i) => (
            <div
              key={s.label}
              className={`rounded-2xl bg-white p-6 shadow-card ${offsets[i]}`}
            >
              <p className="text-3xl font-extrabold text-navy lg:text-4xl">
                {s.value}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="h-4 w-1 rounded-full bg-yellow-brand" />
                <p className="text-sm font-semibold text-muted">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6" />
      </div>
    </section>
  );
}
