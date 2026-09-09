"use client";

import { ArrowRight } from "lucide-react";
import SmartLink from "./ui/SmartLink";
import { SectionHeader } from "./ui/SectionHeader";
import ButtonShowMore from "./ui/ButtonShowMore";
import { procedures } from "@/data/procedure";

export default function AdministrativeProcedures({
  lang,
  primaryPage,
}: {
  lang: "AR" | "FR";
  primaryPage: boolean;
}) {
  const isAr = lang === "AR";
  const displayedProcedures = primaryPage ? procedures : procedures.slice(0, 3);

  return (
    <section
      className="relative py-20 overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      {!primaryPage && (
        <div className="absolute inset-0 bg-linear-to-b from-[#F1D9A8]/30 via-transparent to-[#F1D9A8]/10 pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <SectionHeader
          isAr={isAr}
          subtitle={{
            FR: "Guide du Citoyen",
            AR: "دليل المواطن",
          }}
          title={{
            FR: "Procédures Administratives",
            AR: "المساطر الإدارية",
          }}
          description={{
            AR: "كل المعلومات والوثائق اللازمة للقيام بإجراءاتكم الإدارية بكل سهولة.",
            FR: "Toutes les informations et documents nécessaires pour effectuer vos démarches administratives en toute simplicité.",
          }}
          showDescription={primaryPage}
        />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {displayedProcedures.map((item) => {
            const IconComponent = item.icon;

            return (
              <SmartLink
                href={item.href}
                key={item.slug} /* Utilisation de item.slug comme clé unique */
                className="group relative bg-white border border-slate-300 p-8 rounded-3xl hover:shadow-2xl hover:shadow-[#F1D9A8]/20 transition-all duration-500 hover:-translate-y-1 cursor-pointer"
              >
                {/* Icon Box */}
                <div
                  className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <IconComponent size={28} />
                </div>

                {/* Content */}
                <h3
                  className={`text-xl font-bold text-slate-900 mb-3 ${
                    isAr ? "font-arabic" : ""
                  }`}
                >
                  {item.title[lang]}
                </h3>
                <p
                  className={`text-slate-500 text-sm leading-relaxed mb-6 ${
                    isAr ? "font-arabic" : ""
                  }`}
                >
                  {item.desc[lang]}
                </p>

                {/* Action */}
                <div className="flex items-center gap-2 text-[#d4a574] font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                  <span>{isAr ? "اقرأ المزيد" : "Voir les détails"}</span>
                  <ArrowRight size={16} className={isAr ? "rotate-180" : ""} />
                </div>

                {/* Subtle bottom accent line */}
                <div className="absolute bottom-0 left-8 right-8 h-1 bg-[#F1D9A8] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-full" />
              </SmartLink>
            );
          })}
        </div>

        {!primaryPage && (
          <ButtonShowMore
            href="/procedures-administratives"
            isAr={isAr}
            titre={{ AR: "عرض جميع المساطر", FR: "Voir toutes les procédures" }}
          />
        )}
      </div>
    </section>
  );
}