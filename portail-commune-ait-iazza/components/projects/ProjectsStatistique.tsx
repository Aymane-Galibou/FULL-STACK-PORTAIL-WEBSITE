"use client"
import { useLang } from '@/context/langContext';
import { Project } from '@/types/project';
import { Building2 } from 'lucide-react';
import React from 'react'

function ProjectsStatistique({ projects}: {projects :Project[]}) {
    const { lang } = useLang();
  const isAr = lang === "AR";
  return (
      <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-12 shadow-sm flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100 text-stone-700 text-xs font-bold uppercase tracking-wider border border-stone-200/60">
            <Building2 size={16} className="text-amber-800" />
            <span>{isAr ? "البيانات المفتوحة" : "Open Data"}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900">
            {isAr ? "مشاريع الجماعة" : "Projets Communaux"}
          </h1>
          <p className="text-slate-500 text-base leading-relaxed">
            {isAr
              ? "متابعة شفافة لتطور المشاريع التنموية والبنيوية داخل الجماعة."
              : "Suivi transparent de l'avancement des projets d'aménagement et d'infrastructures de la commune."}
          </p>
        </div>

        <div className="flex items-center gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-200/60 shrink-0">
          <div className="text-center px-4">
            <span className="block text-2xl font-black text-slate-900">{projects.length}</span>
            <span className="text-xs font-bold text-slate-500">{isAr ? "إجمالي المشاريع" : "Total Projets"}</span>
          </div>
          <div className="h-8 w-px bg-stone-200" />
          <div className="text-center px-4">
            <span className="block text-2xl font-black text-amber-800">
              {projects.filter((p) => p.progressPercentage === 100).length}
            </span>
            <span className="text-xs font-bold text-slate-500">{isAr ? "مكتملة" : "Terminés"}</span>
          </div>
        </div>
      </div>  )
}

export default ProjectsStatistique