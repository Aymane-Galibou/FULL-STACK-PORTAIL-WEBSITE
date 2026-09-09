"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Calendar,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";

const news = [
  {
    id: 1,
    title: "Modernisation de l'éclairage public à Aït Iazza",
    titleAr: "تحديث شبكة الإنارة العمومية بآيت إيعزة",
    date: "02 FÉV 2026",
    accent: "#65AB0C",
    image: "/news1.jpg",
  },
  {
    id: 2,
    title: "Digitalisation complète de l'état civil",
    titleAr: "الرقمنة الشاملة لخدمات الحالة المدنية",
    date: "28 JAN 2026",
    accent: "#3D6ADD",
    image: "/news2.jpg",
  },
];

export default function NewsSlider({ lang }: { lang: "FR" | "AR" }) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const isAr = lang === "AR";

  const next = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === news.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const prev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === 0 ? news.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      className="relative w-full py-12 lg:py-16 overflow-hidden bg-slate-50"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Fond décoratif réduit pour Desktop */}
      <div
        className={`absolute top-0 h-full w-full md:w-[35%] bg-[#F1D9A8]/20 z-0 ${isAr ? "right-0" : "left-0"}`}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* Header - Plus compact sur desktop */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-4">
          <div className={isAr ? "text-right" : "text-left"}>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              {isAr ? "آخر الأخبار" : "ACTUALITÉS"}
            </h2>
            <div
              className={`h-1.5 w-16 bg-amber-500 mt-3 ${isAr ? "mr-0 ml-auto" : ""}`}
            />
          </div>

          <div className="flex gap-1">
            <button
              onClick={prev}
              className="p-3 bg-white border border-slate-200 hover:bg-slate-900 hover:text-white transition-all"
            >
              {isAr ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
            <button
              onClick={next}
              className="p-3 bg-white border border-slate-200 hover:bg-slate-900 hover:text-white transition-all"
            >
              {isAr ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>
        </div>

        {/* Corps du Slider - Hauteur contrainte sur Desktop (max-h) */}
        <div className="relative flex flex-col lg:flex-row bg-white shadow-xl overflow-hidden rounded-xl border border-slate-100 lg:max-h-145">
          {/* Section Image - Format 16/9 sur mobile, Auto sur desktop */}
          <div className="w-full lg:w-[55%] h-70 md:h-100 overflow-hidden relative">
            <Image
              key={`img-${current}`}
              src={news[current].image}
              fill
              alt="news"
              className={`object-cover transition-all duration-700 ease-in-out ${isAnimating ? "scale-105 opacity-80" : "scale-100 opacity-100"}`}
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
            />
            <div
              className="absolute inset-y-0 left-0 w-1.5"
              style={{ backgroundColor: news[current].accent }}
            />
          </div>

          {/* Section Texte - Padding réduit pour éviter l'effet "gros" */}
          <div className="w-full lg:w-[45%] p-6 md:p-10 lg:p-12 flex flex-col justify-center bg-white relative">
            <div
              className={`flex items-center gap-2 text-slate-400 mb-4 text-xs font-bold tracking-widest ${isAr ? "flex-row-reverse" : ""}`}
            >
              <Calendar size={14} className="text-amber-600" />
              <span>{news[current].date}</span>
            </div>

            <h3
              className={`text-2xl md:text-3xl font-bold ${isAr ? "font-arabic" : ""} text-slate-900 mb-5 leading-[1.3] transition-all duration-500 ${isAnimating ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"}`}
            >
              {isAr ? news[current].titleAr : news[current].title}
            </h3>

            <p
              className={`text-slate-500 ${isAr ? "font-arabic" : ""} text-sm md:text-base leading-relaxed mb-8 transition-all duration-500 delay-75 ${isAnimating ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"}`}
            >
              {isAr
                ? "تواصل جماعة آيت إيعزة تنزيل مخططاتها التنموية لتعزيز البنية التحتية وتحسين جودة الفضاءات العمomية لفائدة الساكنة."
                : "La commune d’Aït Iazza poursuit la mise en œuvre de ses plans de développement pour renforcer les infrastructures et améliorer les espaces publics."}
            </p>

            <div className={isAr ? "text-right" : "text-left"}>
              <button className="group relative inline-flex items-center gap-3 text-slate-900 font-bold uppercase tracking-wider transition-all">
                <span
                  className={`pb-1 border-b-2 border-slate-900 group-hover:border-amber-500 group-hover:text-amber-600 transition-all ${isAr ? "text-base font-arabic" : "text-[11px]"}`}
                >
                  {isAr ? "تفاصيل الخبر" : "Lire la suite"}
                </span>
                {isAr ? (
                  <ArrowLeft
                    size={16}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                ) : (
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Indicateurs simplifiés */}
        <div className="flex justify-center gap-2 mt-6">
          {news.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 transition-all duration-500 rounded-full ${current === i ? "w-10 bg-amber-500" : "w-2 bg-slate-300"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
