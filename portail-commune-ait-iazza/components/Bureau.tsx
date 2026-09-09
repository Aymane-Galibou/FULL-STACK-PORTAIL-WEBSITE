"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { fetchCouncilMembers } from "@/services/councilMember";
import { CouncilMember } from "@/types/concil";
import { getFormatedUrl } from "@/utils/urlFormating";
import SafeImage from "./ui/SafeImage";

export default function Bureau({ lang }: { lang: "FR" | "AR" }) {
  const isAr = lang === "AR";
  const swiperRef = useRef<SwiperType | null>(null);

  const [members, setMembers] = useState<CouncilMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function loadMembers() {
      setIsLoading(true);
      const data = await fetchCouncilMembers(true);

      if (isMounted) {
        setMembers(data || []);
        setIsLoading(false);
      }
    }

    loadMembers();

    return () => {
      isMounted = false;
    };
  }, []);

  // Duplicate items if count is small (<= 6) so Swiper loop fills both sides seamlessly
  const displayMembers = useMemo(() => {
    if (members.length > 0 && members.length <= 6) {
      return [...members, ...members];
    }
    return members;
  }, [members]);

  const shouldLoop = displayMembers.length > 3;

  return (
    <section
      className="relative py-12 bg-slate-50 overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-linear-to-b from-[#F1D9A8]/30 via-transparent to-[#F1D9A8]/10 pointer-events-none" />
      {/* <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url('/zelij.png')`,
          backgroundSize: "180px",
          backgroundRepeat: "repeat",
        }}
      /> */}

      {/* Header */}
      <header className="relative max-w-4xl mx-auto px-4 mb-10 text-center">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="h-px w-6 bg-slate-300" />
          <span
            className={`text-slate-600 font-bold tracking-widest text-xs ${
              isAr ? "font-arabic" : "uppercase"
            }`}
          >
            {isAr ? "الهيكل التنظيمي" : "L'Exécutif"}
          </span>
          <span className="h-px w-6 bg-slate-300" />
        </div>

        <h2
          className={`text-3xl md:text-5xl font-black text-slate-900 leading-tight ${
            isAr ? "font-arabic" : ""
          }`}
        >
          {isAr ? "مكتب المجلس الجماعي" : "Le Bureau du Conseil"}
        </h2>

        <div className="mt-3 h-1 w-16 bg-amber-600 rounded-full mx-auto" />
      </header>

      {/* Slider Container */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-12 md:px-16">
        {/* Navigation Controls */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className={`absolute top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-slate-100 text-slate-800 border border-slate-200 transition-all active:scale-95 ${
            isAr ? "right-1 md:right-3" : "left-1 md:left-3"
          }`}
          aria-label="Previous"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d={isAr ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
            />
          </svg>
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className={`absolute top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-slate-100 text-slate-800 border border-slate-200 transition-all active:scale-95 ${
            isAr ? "left-1 md:left-3" : "right-1 md:right-3"
          }`}
          aria-label="Next"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d={isAr ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
            />
          </svg>
        </button>

        {!isLoading && displayMembers.length > 0 && (
          <Swiper
            key={`swiper-${lang}-${displayMembers.length}`}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setTimeout(() => swiper.update(), 50);
            }}
            modules={[Pagination, Autoplay, Navigation]}
            pagination={{ clickable: true }}
            autoplay={
              shouldLoop ? { delay: 4000, disableOnInteraction: false } : false
            }
            loop={shouldLoop}
            centeredSlides={true}
            slidesPerView={1.2}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 1.3, spaceBetween: 24 },
              1024: { slidesPerView: 1.6, spaceBetween: 32 },
            }}
            className="bureau-swiper pb-14! pt-2!"
          >
            {displayMembers.map((member: CouncilMember, idx) => (
              <SwiperSlide key={`${member.id}-${idx}`}>
                {({ isActive }) => (
                  <article
                    className={`transition-all duration-500 rounded-3xl overflow-hidden shadow-md border border-slate-200 flex flex-col md:flex-row min-h-76 ${
                      isActive
                        ? "scale-100 opacity-100 bg-white shadow-xl"
                        : "scale-90 opacity-80 bg-slate-100/90 grayscale-40"
                    }`}
                  >
                    {/* Member Image */}
                    <div className="relative w-full md:w-1/2 h-60 md:h-auto overflow-hidden bg-stone-100">
                      <SafeImage
                        src={getFormatedUrl(member.photoUrl)}
                        alt={member.fullName[lang]}
                        fill
                        className="object-cover object-top transition-transform duration-700 hover:scale-105"
                      />
                    </div>

                    {/* Content Section */}
                    <div
                      className={`w-full md:w-1/2 bg-[#F6E6C6] p-6 md:p-8 flex flex-col justify-center relative ${
                        isAr ? "text-right" : "text-left"
                      }`}
                    >
                      <div
                        className="absolute inset-0 opacity-[0.05] pointer-events-none"
                        style={{
                          backgroundImage: `url('/zelij.png')`,
                          backgroundSize: "140px",
                        }}
                      />

                      <div className="relative z-10 space-y-3">
                        <span className="inline-block px-3 py-1 rounded-full bg-amber-900 text-[#F1D9A8] text-[10px] font-bold uppercase tracking-wider shadow-xs">
                          {member.role[lang]}
                        </span>

                        <h3
                          className={`text-slate-900 text-xl md:text-3xl font-black leading-tight ${
                            isAr ? "font-arabic" : ""
                          }`}
                        >
                          {member.fullName[lang]}
                        </h3>

                        <div
                          className={`h-1 w-12 bg-amber-900/20 rounded-full ${
                            isAr ? "mr-0 ml-auto" : ""
                          }`}
                        />

                        <div
                          className={`flex items-center gap-2 pt-1 ${
                            isAr ? "flex-row-reverse" : ""
                          }`}
                        >
                          <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                          <p className="text-slate-800 text-xs font-bold">
                            {member?.politicalParty[lang]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <style jsx global>{`
        .bureau-swiper {
          overflow: visible !important;
        }
        .swiper-pagination-bullet {
          background: #d97706 !important;
          opacity: 0.3;
        }
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          width: 22px !important;
          border-radius: 99px !important;
        }
      `}</style>
    </section>
  );
}
