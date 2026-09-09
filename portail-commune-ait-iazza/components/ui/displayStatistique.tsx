import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { Users, Map, Building2, Landmark } from "lucide-react";

const CounterK = ({ value }: { value: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const numericValue = parseInt(value.match(/\d+/)?.[0] || "0");
  const suffix = value.replace(/\d+/g, "");

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = numericValue;
      const duration = 1.5;
      const timer = setInterval(() => {
        start += Math.ceil(end / 50); // Animation fluide
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const stats = [
  {
    id: 1,
    label: { FR: "Habitants", AR: "نسمة" },
    value: "10K+",
    icon: <Users size={28} />,
  },
  {
    id: 2,
    label: { FR: "Superficie", AR: "المساحة" },
    value: "12km²",
    icon: <Map size={28} />,
  },
  {
    id: 3,
    label: { FR: "Associations", AR: "جمعية" },
    value: "45+",
    icon: <Building2 size={28} />,
  },
  {
    id: 4,
    label: { FR: "Projets Actifs", AR: "مشروع حالي" },
    value: "12+",
    icon: <Landmark size={28} />,
  },
];
function DisplayStatistique({ lang }: { lang: "AR" | "FR" }) {
  const isAr = lang === "AR";
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="group relative bg-white rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(212,165,116,0.2)]"
        >
          <div className="flex flex-col items-center text-center">
            {/* Icon Container avec ta couleur gate-beige */}
            <div className="mb-6 p-4 rounded-2xl bg-gate-beige/10 text-gate-beige group-hover:bg-gate-beige group-hover:text-white transition-all duration-500">
              {stat.icon}
            </div>

            <div className="space-y-2">
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">
                <CounterK value={stat.value} />
              </h3>

              {/* Divider stylisé */}
              <div className="h-1 w-6 bg-gate-beige mx-auto rounded-full group-hover:w-16 transition-all duration-500" />

              <p
                className={`text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pt-3 ${isAr ? "font-arabic text-xs" : ""}`}
              >
                {stat.label[lang]}
              </p>
            </div>
          </div>

          {/* Barre de progression décorative au survol */}
          <div className="absolute bottom-0 left-0 h-1.5 bg-gate-beige w-0 group-hover:w-full transition-all duration-500 rounded-b-3xl" />
        </div>
      ))}
    </div>
  );
}

export default DisplayStatistique;
