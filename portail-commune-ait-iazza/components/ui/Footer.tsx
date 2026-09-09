"use client"
import { useLang } from "@/context/langContext";
import { Facebook, Instagram, Twitter} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const {lang} = useLang();

  const t = {
    desc: {
      FR: "Une vision d'excellence pour transformer notre paysage urbain et valoriser notre patrimoine.",
      AR: "رؤية متميزة لتحويل مشهدنا الحضري وتثمين تراثنا."
    },
    navTitle: { FR: "Navigation", AR: "الملاحة" },
    links: {
      accueil: { FR: "Accueil", AR: "الرئيسية" },
      projets: { FR: "Projets", AR: "المشاريع" },
      stats: { FR: "Statistiques", AR: "الإحصائيات" },
    },
    devBy: { FR: "Développé par", AR: " تطوير من طرف" },
    social: { FR: "Réseaux Sociaux", AR: "تواصل معنا" },
    location: { FR: "Ait Iazza, Taroudant, Maroc", AR: "آيت إعزة، تارودانت، المغرب" },
    privacy: { FR: "Confidentialité", AR: "الخصوصية" },
    legal: { FR: "Mentions Légales", AR: "شروط الاستخدام" },
    copyright:{ FR: `© ${currentYear} Portail Ait Iazza`, AR: `الجماعة الحضرية ايت ايعزة ${currentYear} ©` }
  };

  return (
    <section 
      className="relative pt-24 pb-12 bg-[#FCF7ED] text-slate-900 overflow-hidden border-t border-[#F1D9A8]/20" 
      dir={lang === "AR" ? "rtl" : "ltr"}
    >
      {/* 1. ZELIJ LAYER - Fixed path to root / */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.7]"
        style={{
          backgroundImage: `url('/zelij.png')`, 
          backgroundSize: '200px',
          backgroundRepeat: 'repeat',
          WebkitMaskImage: 'linear-gradient(to top, black, transparent 80%)',
          maskImage: 'linear-gradient(to top, black, transparent 80%)'
        }}
      />
      
      {/* 2. GRADIENT OVERLAY - Fixed class name */}
      <div className="absolute inset-0 bg-linear-to-b from-gate-beige/30 via-gate-beige/50 to-gate-beige/80 pointer-events-none" />
      
      {/* 3. TEXTURE GRAIN */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom_left,var(--tw-gradient-stops))] from-white/60 via-transparent to-black/5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-block">
               {/* Replaced gate-beige with hex for stability */}
               <div className="bg-slate-900 text-[#F1D9A8] px-6 py-2 shadow-xl -rotate-1 font-black text-2xl uppercase tracking-tighter">
                 PortailAitIazza
               </div>
            </div>
            
            <p className={`text-slate-800 font-medium text-lg leading-relaxed max-w-md ${lang === "AR" ? "font-arabic" : ""}`}>
              {t.desc[lang]}
            </p>
          </div>

          {/* Links & Contacts */}
          <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Navigation */}
            <div>
              <h4 className={`text-xs font-black uppercase tracking-[0.3em] text-slate-900/40 mb-8 ${lang === "AR" ? "font-arabic" : ""}`}>
                {t.navTitle[lang]}
              </h4>
              <ul className={`space-y-4 font-bold text-slate-900 ${lang === "AR" ? "font-arabic" : ""}`}>
                <li><a href="#" className="hover:text-[#d4a574] transition-colors">{t.links.accueil[lang]}</a></li>
                <li><a href="#" className="hover:text-[#d4a574] transition-colors">{t.links.projets[lang]}</a></li>
                <li><a href="#" className="hover:text-[#d4a574] transition-colors">{t.links.stats[lang]}</a></li>
                <li className="font-tifinagh text-slate-900/60 hover:text-slate-900 cursor-pointer transition-colors">ⵜⴰⵎⴰⵣⵉⵖⵜ</li>
              </ul>
            </div>

            {/* Social & Contact */}
            <div className="space-y-8">
              <div>
                <h4 className={`text-xs font-black uppercase tracking-[0.3em] text-slate-900/40 mb-8 ${lang === "AR" ? "font-arabic" : ""}`}>
                    {t.social[lang]}
                </h4>
                <div className="flex gap-4">
                  {[Facebook, Instagram, Twitter].map((Icon, i) => (
                    <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/50 backdrop-blur-md border border-[#F1D9A8]/30 flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-[#F1D9A8] transition-all duration-500 shadow-sm">
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
              
              <div className={`space-y-2 text-sm font-bold text-slate-900 ${lang === "AR" ? "font-arabic" : ""}`}>
                <p className="flex items-center gap-2 underline decoration-[#F1D9A8] underline-offset-4 cursor-pointer hover:text-[#d4a574]">contact@aitiazza.ma</p>
                <p>{t.location[lang]}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-black uppercase tracking-widest text-slate-900 ${lang === "AR" ? "font-arabic text-[12px]" : ""}`}>
              {t.copyright[lang]}
            </span>
            <span className="text-slate-900/20">|</span>
            <span className={`text-[10px] font-black uppercase tracking-widest text-slate-900/60 ${lang === "AR" ? "font-arabic" : ""}`}>
              {t.devBy[lang]} Aymane Galibou
            </span>
          </div>

          <div className={`flex gap-8 ${lang === "AR" ? "flex-row-reverse font-arabic" : ""}`}>
            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-900/60 hover:text-slate-900 transition-colors">{t.privacy[lang]}</a>
            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-900/60 hover:text-slate-900 transition-colors">{t.legal[lang]}</a>
          </div>
        </div>
      </div>
    </section>
  );
}