"use client";

import Image from "next/image";
import { User, Award } from "lucide-react";
import { CouncilMember } from "@/types/concil";
import { getFormatedUrl } from "@/utils/urlFormating";
import SafeImage from "./ui/SafeImage";

interface Props {
  members: CouncilMember[];
  lang: "FR" | "AR";
}

export default function CouncilMembersGrid({ members, lang, }: Props) {
  const isAr = lang === "AR";

  // Extraction du président (ordre = 1)
  const president = members.find((m) => m.bureauOrder === 1);

  const otherMembers = members.filter((m) => m.id !== president?.id);

  return (
    <div className="py-12 max-w-7xl mx-auto px-6 space-y-16" dir={isAr ? "rtl font-arabic" : "ltr"}>
      
      {/* SECTION PRÉSIDENT (HERO IMPOSANT) */}
      {president && (
        <div className="relative overflow-hidden bg-white border border-slate-200/80 rounded-[3rem] p-8 md:p-14 shadow-xl shadow-slate-100/60">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            
            {/* Portrait Géant du Président */}
            <div className="relative shrink-0">
              <div className="w-56 h-56 md:w-64 md:h-64 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-slate-50 relative group">
                {president.photoUrl ? (
                  <SafeImage
                    src={getFormatedUrl(president.photoUrl)}
                    alt={president.fullName[lang]}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                    <User size={80} />
                  </div>
                )}
              </div>
            </div>

            {/* Infos du Président */}
            <div className={`text-center lg:text-left flex-1 space-y-3 ${isAr ? "lg:text-right" : ""}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-800 text-[16px] font-bold uppercase tracking-wider">
                <Award size={16} className="text-amber-600" />
                <span>{president.role[lang]}</span>
              </div>

              <h2 className={`text-3xl md:text-5xl font-black text-slate-900 ${isAr ? "font-arabic" : "tracking-tight"}`}>
                {president.fullName[lang]}
              </h2>

              {president.politicalParty && (
                <p className={`text-slate-500 text-lg font-medium ${isAr ? "font-arabic" : ""}`}>
                  {president.politicalParty[lang]}
                </p>
              )}
            </div>

          </div>
        </div>
      )}

      {/* GRILLE DES AUTRES MEMBRES (CARTES LARGES & PORTRAITS AGRANDIS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {otherMembers.map((member) => (
          <div
            key={member.id}
            className="group bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-sm hover:shadow-2xl hover:border-slate-300 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
          >
            {/* Badge Rôle */}
            <span className="mb-6 px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-[14px] font-bold uppercase tracking-wider">
              {member.role[lang]}
            </span>

            {/* Photo Grand Format (48x48 / 52x52) */}
            <div className="w-48 h-48 md:w-52 md:h-52 rounded-3xl overflow-hidden border-2 border-slate-100 bg-slate-50 relative shadow-md mb-6 group-hover:shadow-xl transition-all duration-300 shrink-0">
              {member.photoUrl ? (
                <SafeImage
                  src={getFormatedUrl(member.photoUrl)}
                  alt={member.fullName[lang]}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <User size={64} />
                </div>
              )}
            </div>

            {/* Nom et Parti */}
            <div className="w-full space-y-1">
              <h3 className={`text-2xl font-black text-slate-900 ${isAr ? "font-arabic" : "tracking-tight"}`}>
                {member.fullName[lang]}
              </h3>

              {member.politicalParty && (
                <p className={`text-slate-400 text-sm font-medium ${isAr ? "font-arabic" : ""}`}>
                  {member.politicalParty[lang]}
                </p>
              )}
            </div>

            {/* Ligne accent au survol */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1.5 bg-gate-beige group-hover:w-1/2 transition-all duration-300 rounded-full" />
          </div>
        ))}
      </div>

    </div>
  );
}