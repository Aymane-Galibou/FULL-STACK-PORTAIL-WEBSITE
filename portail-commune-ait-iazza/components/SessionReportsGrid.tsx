"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, Calendar, Filter, FileText } from "lucide-react";
import { SessionReport } from "@/types/session";
import { handleDirectDownload } from "@/utils/downloads";
import { getFormatedUrl } from "@/utils/urlFormating";

interface Props {
  reports: SessionReport[];
  lang: "FR" | "AR";
}

export default function SessionReportsGrid({ reports, lang }: Props) {
  const isAr = lang === "AR";

  const years = Array.from(new Set(reports.map((r) => r.year))).sort((a, b) => b - a);
  const [selectedYear, setSelectedYear] = useState<number | "ALL">("ALL");

  const filteredReports = selectedYear === "ALL"
    ? reports
    : reports.filter((r) => r.year === selectedYear);

  return (
    <div className="py-12 max-w-375 mx-auto px-6 space-y-10" dir={isAr ? "rtl" : "ltr"}>
      
      {/* Barre de filtrage par année */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm">
        <div className="flex items-center gap-2.5 text-slate-800 font-bold text-sm">
          <Filter size={20} className="text-amber-700" />
          <span>{isAr ? "تصفية حسب السنة:" : "Filtrer par année :"}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedYear("ALL")}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              selectedYear === "ALL"
                ? "bg-gate-beige text-slate-900 shadow-md shadow-gate-beige/30"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {isAr ? "الكل" : "Tous"}
          </button>
          {years.map((yr) => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                selectedYear === yr
                  ? "bg-gate-beige text-slate-900 shadow-md shadow-gate-beige/30"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {yr}
            </button>
          ))}
        </div>
      </div>

      {/* Grille des cartes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredReports.map((item) => {
          const isOrdinary = item.sessionType === "ORDINARY";

          return (
            <div
              key={item.id}
              className="group bg-white border border-slate-200/80 hover:border-gate-beige/60 rounded-[2.5rem] p-7 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                {/* Image Agrandie */}
                <div className="w-full h-64 rounded-3xl overflow-hidden border border-slate-100 bg-slate-50 relative mb-6 group-hover:shadow-md transition-shadow duration-300">
                  {item.thumbnailUrl ? (
                    <Image
                      src={item.thumbnailUrl}
                      alt={item.title[lang]}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-300 gap-2">
                      <FileText size={56} />
                    </div>
                  )}

                  {/* Badges discrets et élégants */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm backdrop-blur-md ${
                        isOrdinary 
                          ? "bg-white/90 text-slate-900 border border-slate-200" 
                          : "bg-slate-900/90 text-white"
                      }`}
                    >
                      {isOrdinary
                        ? isAr ? "دورة عادية" : "Session Ordinaire"
                        : isAr ? "دورة استثنائية" : "Session Extraordinaire"}
                    </span>
                  </div>
                </div>

                {/* Date et Titre */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                    <Calendar size={15} className="text-amber-700" />
                    <span>{new Date(item.sessionDate).toLocaleDateString(isAr ? "ar-MA" : "fr-FR")}</span>
                  </div>

                  <h3 className={`text-2xl font-black text-slate-900 leading-snug ${isAr ? "font-arabic" : ""}`}>
                    {item.title[lang]}
                  </h3>

                  {item.summary && (
                    <p className={`text-slate-500 text-sm font-light line-clamp-3 leading-relaxed ${isAr ? "font-arabic" : ""}`}>
                      {item.summary[lang]}
                    </p>
                  )}
                </div>
              </div>

              {/* Bouton Beige avec texte sombre (haute lisibilité) */}
              <button
                onClick={()=> handleDirectDownload(getFormatedUrl(item.pdfUrl),`session-${item.sessionType}-${item.sessionDate}`)}
                className="w-full inline-flex items-center justify-center gap-2.5 font-bold text-sm py-4 px-6 rounded-2xl transition-all duration-300 mt-2 bg-gate-beige hover:bg-[#e4c995] text-slate-900 active:scale-[0.98] hover:shadow-md hover:shadow-gate-beige/40 border border-amber-200/40"
              >
                <Download size={18} />
                <span>{isAr ? "تحميل المحضر (PDF)" : "Télécharger le PV"}</span>
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
}