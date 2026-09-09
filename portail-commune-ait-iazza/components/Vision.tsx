"use client";

import { ArrowRight } from "lucide-react";
import SmartLink from "./ui/SmartLink";
import ButtonShowMore from "./ui/ButtonShowMore";
import { visions } from "@/data/vision";
import { SectionHeader } from "./ui/SectionHeader";

export default function CommuneVision({
  lang,
  primaryPage,
}: {
  lang: "FR" | "AR";
  primaryPage: boolean;
}) {
  const isAr = lang === "AR";
  const displayedVision = primaryPage ? visions : visions.slice(0, 3);

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Background style */}
      {!primaryPage && (
        <div className="absolute inset-0 bg-linear-to-b from-[#F1D9A8]/30 via-transparent to-[#F1D9A8]/10 pointer-events-none" />
      )}


      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {!primaryPage && (
          <SectionHeader
            isAr={isAr}
            subtitle={{
              FR: "Vision & Développement",
              AR: "الرؤية والتنمية",
            }}
            title={{
              FR: "Plan d'Action Communal",
              AR: "برنامج عمل الجماعة",
            }}
            showDescription={false}
          />
        )}

        {/* The 4 category cards */}
        <div
          className="flex flex-wrap justify-center gap-8"
          dir={isAr ? "rtl" : "ltr"}
        >
          {displayedVision.map((vision) => (
            <SmartLink
              // had filter ba9i makhdam
              href={`/projets-commune?category=${vision.slug}`}
              key={vision.id}
              className="group relative w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-2rem)] min-h-105 flex"
            >
              <div className="absolute inset-0 bg-white rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] transition-all duration-700 group-hover:shadow-[0_40px_100px_-20px_rgba(212,180,118,0.3)] group-hover:-rotate-1" />

              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-[#F1D9A8] rounded-b-full group-hover:h-3 group-hover:w-48 transition-all duration-500 z-20" />

              <div className="relative z-10 p-10 flex flex-col justify-between w-full">
                <div>
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-[#d4b476] mb-8 border border-slate-100 group-hover:bg-[#d4b476] group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-lg group-hover:-translate-y-2">
                    <vision.icon size={34} strokeWidth={1.5} />
                  </div>

                  <h3
                    className={`text-2xl font-black text-slate-900 mb-4 leading-tight ${isAr ? "font-arabic" : ""}`}
                  >
                    {vision.title[lang]}
                  </h3>

                  <div
                    className={`w-12 h-1 bg-[#F1D9A8] mb-6 group-hover:w-24 transition-all duration-500 ${isAr ? "ml-auto" : "mr-auto"}`}
                  />

                  <p
                    className={`text-slate-500 text-[16px] leading-relaxed font-medium ${isAr ? "text-right font-arabic" : "text-left"}`}
                  >
                    {vision.description[lang]}
                  </p>
                </div>

                <div
                  className={`flex ${isAr ? "justify-start font-arabic" : "justify-end"}`}
                >
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-900 transition-colors">
                    <span>{isAr ? "عرض المشاريع" : "Voir les projets"}</span>
                    <div className="w-8 h-px bg-slate-200 group-hover:w-12 group-hover:bg-amber-500 transition-all duration-500" />
                    <ArrowRight
                      size={16}
                      className={`transition-transform duration-300 ${isAr ? "rotate-180 group-hover:-translate-x-2" : "group-hover:translate-x-2"}`}
                    />
                  </div>
                </div>
              </div>
            </SmartLink>
          ))}
        </div>

        {!primaryPage && (
          <ButtonShowMore
            isAr={isAr}
            titre={{
              FR: "Découvrir Notre vision",
              AR: "إكتشف رؤيتنا",
            }}
            href={"/plan-action-communale"}
          />
        )}
      </div>
    </section>
  );
}
