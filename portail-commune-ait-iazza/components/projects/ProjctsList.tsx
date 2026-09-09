"use client";

import Link from "next/link";
import { Coins, MapPin, ChevronRight, ArrowUpRight } from "lucide-react";
import { useLang } from "@/context/langContext";
import ProjectsStatistique from "./ProjectsStatistique";
import { SectionHeader } from "../ui/SectionHeader";
import ButtonShowMore from "../ui/ButtonShowMore";
import SafeImage from "../ui/SafeImage";
import { getFormatedUrl } from "@/utils/urlFormating";
import { useEffect, useState } from "react";
import { getProjects } from "@/services/projects";
import { Project } from "@/types/project";

export default function ProjectsList({
  primaryPage,
  limit,
}: {
  primaryPage: boolean;
  limit?: number;
}) {
  const { lang } = useLang();
  const isAr = lang === "AR";

  const [projects, setProjects] = useState<Project[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setLoading(true);
      const data = await getProjects();

      if (isMounted) {
        setProjects(limit ? data.slice(0, limit) : data);
        setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [limit]);

  const arabicFontClass = isAr ? "font-arabic text-[1.05em]" : "";
  if (loading) {
    return (
      <div className="py-12 text-center text-slate-500">
        Chargement des projets...
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="py-12 text-center text-slate-500">
        Aucun projet trouvé.
      </div>
    );
  }

  return (
    <section
      className={`relative py-12 ${!primaryPage ? "bg-slate-50 py-20" : ""}`}
      dir={isAr ? "rtl" : "ltr"}
    >
      {!primaryPage && (
        <div className="absolute inset-0 bg-linear-to-b from-[#F1D9A8]/30 via-transparent to-[#F1D9A8]/10 pointer-events-none" />
      )}

      <div
        className={`flex flex-col ${!primaryPage ? "max-w-7xl mx-auto px-6" : "space-y-10"} ${arabicFontClass}`}
      >
        {/* En-tête conditionnel */}
        {primaryPage ? (
          <ProjectsStatistique projects={projects} />
        ) : (
          <SectionHeader
            isAr={isAr}
            subtitle={{ AR: "إنجازاتنا", FR: "Nos Réalisations" }}
            title={{ AR: "مشاريع و أنشطة", FR: "Projets et Activités" }}
            showDescription={false}
          />
        )}

        {/* Grille des Projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-4xl overflow-hidden border border-slate-200/80 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.1)] hover:border-amber-200/80 transition-all duration-500 flex flex-col"
            >
              {/* Image & Badges */}
              <div className="relative h-64 w-full bg-stone-100 overflow-hidden">
                <SafeImage
                  src={getFormatedUrl(project.mainImage)}
                  alt={project.title[lang]}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div
                  className="absolute top-4 left-4 right-4 flex items-center justify-between z-10"
                  dir="ltr"
                >
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-slate-800 shadow-sm">
                    {project.category[lang]}
                  </span>
                  <span
                    className={`px-3.5 py-1 rounded-full text-xs font-bold shadow-sm ${
                      project.progressPercentage === 100
                        ? "bg-emerald-700 text-white"
                        : "bg-amber-700 text-white"
                    }`}
                  >
                    {project.status[lang]}
                  </span>
                </div>
              </div>

              {/* Contenu de la Carte */}
              <div className="p-6 md:p-8 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 line-clamp-1 group-hover:text-amber-800 transition-colors duration-300">
                    {project.title[lang]}
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed line-clamp-2">
                    {project.description[lang]}
                  </p>
                </div>

                {/* Barre d'avancement */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-500">
                      {isAr ? "نسبة الإنجاز" : "Avancement"}
                    </span>
                    <span className="text-slate-900">
                      {project.progressPercentage}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        project.progressPercentage === 100
                          ? "bg-emerald-700"
                          : "bg-gate-beige"
                      }`}
                      style={{ width: `${project.progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Métadonnées (Budget & Localisation) */}
                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div className="flex items-center gap-1.5 text-slate-600 truncate">
                    <Coins size={14} className="text-amber-800 shrink-0" />
                    <span className="font-semibold truncate">
                      {project.budget[lang]}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600 truncate">
                    <MapPin size={14} className="text-amber-800 shrink-0" />
                    <span className="font-semibold truncate">
                      {project.locationZone[lang]}
                    </span>
                  </div>
                </div>

                {/* Action / Lien vers la fiche du projet */}
                <div className="pt-2">
                  <Link
                    href={`/projets-commune/${project.id}`}
                    className="w-full inline-flex items-center justify-between bg-stone-100 hover:bg-gate-beige hover:text-slate-900 text-slate-800 font-bold text-xs py-3.5 px-5 rounded-xl transition-all duration-300 active:scale-[0.98] border border-stone-200/50 group/btn"
                  >
                    <span>
                      {isAr
                        ? "التفاصيل الكاملة للمشروع"
                        : "Consulter la fiche projet"}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover/btn:bg-amber-800 transition-colors duration-300">
                      <ArrowUpRight
                        size={16}
                        className={`transition-transform duration-300 group-hover/btn:rotate-45 ${
                          isAr ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton "Voir plus" pour la Landing Page */}
        {!primaryPage && (
          <div className="mt-12 text-center">
            <ButtonShowMore
              href="/projets-commune"
              isAr={isAr}
              titre={{ AR: "عرض جميع المشاريع", FR: "Voir tous les projets" }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
