interface SectionHeaderProps {
  isAr: boolean;
  subtitle: { FR: string; AR: string };
  title: { FR: string; AR: string };
  description?: { FR: string; AR: string }; // Optional
  showDescription?: boolean;
}
import { motion } from "framer-motion"; // Pour l'animation d'entrée

export const SectionHeader = ({
  isAr,
  subtitle,
  title,
  description,
  showDescription,
}: SectionHeaderProps) => {
  return (
    <div className={`relative mb-20 flex flex-col items-center w-full`}>
      <div 
      className={`absolute top-30 left-1/2  -translate-x-1/2 rotate-20 -z-1
        ${isAr ? "text-[100px] md:text-[150px] lg:text-[200px]" : "text-[100px] md:text-[100px] lg:text-[200px]"}  
        font-black text-slate-200
       select-none hidden md:block pointer-events-none whitespace-nowrap`}>
        
        {isAr ? "جماعة ايت ايعزة" : "AIT IAZZA"}
      </div>

      {/* 1. Subtitle avec effet de "Badge" professionnel */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-6"
      >
          <span className="h-px w-6 bg-slate-300" />
        <span
          className={`text-slate-600 font-extrabold uppercase ${isAr && "font-arabic"} tracking-[0.2em] text-xs sm:text-sm`}
        >
          {isAr ? subtitle.AR : subtitle.FR}
        </span>
          <span className="h-px w-6 bg-slate-300" />
      </motion.div>

      {/* 2. Titre avec "Ombre de texte" discrète et Typographie forte */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        <h2
          className={`text-5xl md:text-6xl font-black text-slate-900 leading-tight text-center 
          ${isAr ? "font-arabic tracking-normal" : "tracking-tighter"}`}
        >
          {isAr ? title.AR : title.FR}
        </h2>

        <div
          className={`h-1.5 w-20 bg-gate-beige mt-4 mx-auto rounded-full opacity-80`}
        />
      </motion.div>

      {/* 3. Description avec encadré subtil (Uniquement pour PrimaryPage) */}
      {showDescription && description && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 relative max-w-3xl"
        >
          {/* Guillemet décoratif en arrière-plan */}
          <span className="absolute -top-6 -left-8 text-8xl text-slate-200 select-none font-serif opacity-50">
            “
          </span>

          <p
            className={`text-xl text-slate-500 text-center leading-[1.8] font-light italic
            ${isAr ? "font-arabic leading-loose" : ""}`}
          >
            {isAr ? description.AR : description.FR}
          </p>
        </motion.div>
      )}
    </div>
  );
};
