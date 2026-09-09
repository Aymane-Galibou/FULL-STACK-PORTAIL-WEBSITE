"use client";

import DisplayStatistique from "./ui/displayStatistique";


export default function StatisticsSection({ lang }: { lang: "FR" | "AR" }) {
  const isAr = lang === "AR";
  


  return (
    <section className="relative py-24 bg-slate-50/30 overflow-hidden" dir={isAr ? "rtl" : "ltr"}>
      {/* Background décoratif discret */}
      <div className="absolute top-0 left-0 w-full h-64 bg-linear-to-b from-gate-beige/50 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header de la section ajusté */}
        <div className={`flex flex-col mb-20 ${isAr ? "items-start text-right" : "items-start text-left"}`}>
          <h2 className={`text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] ${isAr ? "font-arabic" : "font-sans uppercase tracking-tighter"}`}>
            {isAr ? "أيت إيعزة" : "Aït Iazza"} <br/>
            
            <span className="relative inline-block mt-4">
              {/* Le texte en boîte noire */}
              <span className="relative z-20 block bg-slate-900 text-gate-beige px-6 py-2 shadow-xl">
                {isAr ? "في أرقام" : "En Chiffres"}
              </span>
              {/* Bordure décalée (Decorative Offset) */}
              <span className={`absolute inset-0 border-2 border-slate-900 z-10 translate-y-2 ${isAr ? "-translate-x-2" : "translate-x-2"}`} aria-hidden="true" />
            </span>
          </h2>
        </div>

        {/* Grille de statistiques */}
        <DisplayStatistique lang={lang}/>

      </div>
    </section>
  );
}