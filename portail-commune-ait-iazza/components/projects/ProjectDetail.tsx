"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  Coins,
  ChevronLeft,
  TrendingUp,
  Paperclip,
  Clock,
} from "lucide-react";
import { useLang } from "@/context/langContext";
import { Project } from "@/types/project";
import SafeImage from "../ui/SafeImage";
import { getFormatedUrl } from "@/utils/urlFormating";

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const { lang } = useLang();
  const isAr = lang === "AR";

  // Centralisation de la typographie arabe et ajustement dynamique de taille
  const arabicFontClass = isAr ? "font-arabic text-[1.05em]" : "";

  return (
    <div className={`space-y-8 ${arabicFontClass}`} dir={isAr ? "rtl" : "ltr"}>
      {/* Bouton Retour */}
      <Link
        href="/projets-commune"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white hover:bg-stone-100 px-4 py-2.5 rounded-xl border border-slate-200/80 shadow-sm transition-all duration-200"
      >
        <ChevronLeft size={16} className={isAr ? "rotate-180" : ""} />
        <span>{isAr ? "العودة إلى قائمة المشاريع" : "Retour aux projets"}</span>
      </Link>

      {/* Fiche Principale du Projet */}
      <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-6 md:p-10 shadow-sm space-y-8">
        
        {/* Bannière / Image Principale */}
        <div className="relative w-full h-72 md:h-96 rounded-4xl overflow-hidden bg-stone-100">
          <SafeImage
            src={getFormatedUrl(project.mainImage)}
            alt={project.title[lang]}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md border border-white/20">
                {project.category[lang]}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  project.progressPercentage === 100
                    ? "bg-emerald-600"
                    : "bg-amber-600"
                }`}
              >
                {project.status[lang]}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black">
              {project.title[lang]}
            </h1>
          </div>
        </div>

        {/* Avancement */}
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between text-sm font-bold text-slate-800">
            <span className="flex items-center gap-2">
              <TrendingUp size={18} className="text-amber-800" />
              <span>
                {isAr ? "مستوى تقدم الأشغال" : "État d'avancement des travaux"}
              </span>
            </span>
            <span className="text-base font-black text-amber-800">
              {project.progressPercentage}%
            </span>
          </div>
          <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden">
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

        {/* Données Ouvertes (Spécifications en 4 colonnes) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-stone-50/70 border border-stone-200/60 space-y-1">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5">
              <Coins size={14} className="text-amber-800" />
              {isAr ? "الميزانية المخصصة" : "Budget Alloué"}
            </span>
            <span className="text-slate-900 font-bold text-sm block">
              {project.budget[lang]}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50/70 border border-stone-200/60 space-y-1">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5">
              <MapPin size={14} className="text-amber-800" />
              {isAr ? "الموقع / المنطقة" : "Zone / Localisation"}
            </span>
            <span className="text-slate-900 font-bold text-sm block">
              {project.locationZone[lang]}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50/70 border border-stone-200/60 space-y-1">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5">
              <Calendar size={14} className="text-amber-800" />
              {isAr ? "تاريخ البداية" : "Date de Début"}
            </span>
            <span className="text-slate-900 font-bold text-sm block">
              {project.startDate[lang]}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50/70 border border-stone-200/60 space-y-1">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5">
              <Clock size={14} className="text-amber-800" />
              {isAr ? "تاريخ التسليم المتوقع" : "Date d'Achevèment"}
            </span>
            <span className="text-slate-900 font-bold text-sm block">
              {project.completionDate[lang]}
            </span>
          </div>
        </div>

        {/* Description détaillée */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {isAr ? "الوصف التفصيلي للمشروع" : "Description détaillée du Projet"}
          </h3>
          <p className="text-slate-700 text-sm leading-relaxed">
            {project.description[lang]}
          </p>
        </div>

        {/* Partenaires */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {isAr ? "الشركاء والجهات الممولة" : "Partenaires & Institutions"}
          </h3>
          <div className="flex items-start gap-3 text-slate-700 text-sm p-4 rounded-2xl bg-stone-50 border border-stone-200/60">
            <Users size={18} className="text-amber-800 shrink-0 mt-0.5" />
            <span className="font-semibold">{project.partners[lang]}</span>
          </div>
        </div>

        {/* Galerie photos (Grand format h-64 à h-80) */}
        {project.galleryImages && project.galleryImages.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {isAr ? "معرض صور الأشغال" : "Galerie d'avancement des travaux"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.galleryImages.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative h-64 md:h-80 rounded-2xl overflow-hidden border border-slate-200 bg-stone-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <SafeImage
                    src={getFormatedUrl(imgUrl)}
                    alt={`Photo ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fichiers joints */}
        {project.attachments && project.attachments.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {isAr ? "الوثائق والمستندات المرفقة" : "Documents & Fichiers rattachés"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.attachments.map((doc, idx) => (
                <a
                  key={idx}
                  href={doc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-100 hover:bg-gate-beige text-slate-800 text-xs font-bold transition-colors border border-stone-200/60"
                >
                  <Paperclip size={14} className="text-amber-800" />
                  <span>{isAr ? `وثيقة ${idx + 1}` : `Document ${idx + 1}`}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}