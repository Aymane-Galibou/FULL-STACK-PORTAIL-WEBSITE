"use client";

import Image from "next/image";
import { Calendar, ArrowRight, User } from "lucide-react";
import { SectionHeader } from "./ui/SectionHeader";
import ButtonShowMore from "./ui/ButtonShowMore";
import { useEffect, useState } from "react";
import { PresidentActivityAttributes } from "@/types/presidentActivity";
import SmartLink from "./ui/SmartLink";
import { getFormatedUrl } from "@/utils/urlFormating";
import SafeImage from "./ui/SafeImage";

const BACKEND_DOMAIN =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export default function PresidentActivities({
  lang,
  primaryPage,
}: {
  lang: "FR" | "AR";
  primaryPage: boolean;
}) {
  const isAr = lang === "AR";

  const [presidentAcitvityData, setpresidentAcitvityData] = useState<
    PresidentActivityAttributes[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const getPresidentActivities = async () => {
      try {
        const response = await fetch(`${BACKEND_DOMAIN}/president-activity`);

        if (!response.ok) throw new Error("Failed to fetch");

        const result = await response.json();

        if (isMounted && result.ok) {
          setpresidentAcitvityData(result.data);
        }
      } catch (error) {
        console.error("Error loading president activities:", error);
        if (isMounted) setHasError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    getPresidentActivities();
    return () => {
      isMounted = false;
    };
  }, []);

  // Handling Loading State
  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  //  Handling Error or Missing Data State
  if (hasError || !presidentAcitvityData) {
    return (
      <div className="py-20 text-center text-gray-500">
        {isAr
          ? "تعذر تحميل أنشطة رئيس المجلس"
          : "Impossible de charger les activites du président."}
      </div>
    );
  }

  const displayedActivities = primaryPage
    ? presidentAcitvityData
    : presidentAcitvityData.slice(0, 2);

  return (
    <section
      className="relative py-20 bg-slate-50/50"
      dir={isAr ? "rtl" : "ltr"}
    >
      {!primaryPage && (
        <div className="absolute inset-0 bg-linear-to-b from-[#F1D9A8]/30 via-transparent to-[#F1D9A8]/10 pointer-events-none" />
      )}
      <div className="flex flex-col max-w-7xl mx-auto px-6">
        {/* Header */}
        <SectionHeader
          isAr={isAr}
          subtitle={{ AR: "نشاطات الرئاسة", FR: "Activités de la Présidence" }}
          title={{ AR: "آخر المستجدات", FR: "Actualités Récentes" }}
        />

        {/* List of Activity Cards */}
        <div className="flex flex-col gap-10 mt-12">
          {displayedActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white z-1 rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row"
            >
              {/* Section Image  */}
              <div className="relative w-full md:w-5/12 h-64 md:h-80 overflow-hidden">
                <SafeImage
                  src={getFormatedUrl(activity.mainImage)}
                  alt={activity.title[lang]}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                {/* Badge Type - Flottant sur l'image */}
                <div
                  className={`absolute top-4 ${isAr ? "left-4" : "right-4"} bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm`}
                >
                  <span className="text-[10px] font-black text-[#d4a574] uppercase tracking-widest">
                    {activity.activityType[lang]}
                  </span>
                </div>
              </div>

              {/* Section Contenu  */}
              <div className="p-8 md:p-10 flex-1 flex flex-col justify-center">
                <div
                  className={`flex items-center gap-4 mb-4 text-slate-400 font-bold text-xs ${isAr ? "flex-row-reverse justify-end" : ""}`}
                >
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-[#d4a574]" />
                    <span>
                      {new Date(activity.eventDate).toLocaleDateString(
                        isAr ? "ar-MA" : "fr-FR",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                  <div className="flex items-center gap-1.5">
                    <User size={14} className="text-[#d4a574]" />
                    <span>M. le Président</span>
                  </div>
                </div>

                <h3
                  className={`text-2xl md:text-3xl font-black text-slate-900 mb-4 transition-colors duration-300 hover:text-[#d4a574] ${isAr ? "font-arabic leading-snug" : ""}`}
                >
                  {activity.title[lang]}
                </h3>

                <p
                  className={`text-slate-500 leading-relaxed mb-6 text-base md:text-lg line-clamp-3 ${isAr ? "font-arabic" : ""}`}
                >
                  {activity.summary[lang]}
                </p>

                <div
                  className={`mt-auto pt-6 border-t border-slate-50 flex ${isAr ? "justify-start" : "justify-end"}`}
                >
                  <SmartLink
                    href={`/activites-president/${activity.id}`}
                    className={`flex items-center cursor-pointer gap-2 font-black text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-[#d4a574] transition-all duration-300 group ${isAr ? "flex-row-reverse font-arabic" : ""}`}
                  >
                    <span>
                      {isAr ? "تفاصيل النشاط" : "Détails de l'activité"}
                    </span>
                    <ArrowRight
                      size={18}
                      className={`transition-transform duration-300 ${isAr ? "group-hover:-translate-x-2 rotate-180" : "group-hover:translate-x-2"}`}
                    />
                  </SmartLink>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        {!primaryPage && (
          <ButtonShowMore
            href="/activites-president"
            isAr={isAr}
            titre={{
              AR: "عرض الأرشيف كاملاً",
              FR: "Consulter toutes les activités",
            }}
          />
        )}
      </div>
    </section>
  );
}
