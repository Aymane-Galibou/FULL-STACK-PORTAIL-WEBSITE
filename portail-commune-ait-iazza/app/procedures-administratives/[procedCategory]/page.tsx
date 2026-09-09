"use client";

import { useParams } from "next/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLang } from "@/context/langContext";
import { ProcedureItem, procedures } from "@/data/procedure";
import SmartLink from "@/components/ui/SmartLink";
import { ArrowRight, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { BACKEND_DOMAIN } from "@/utils/urlFormating";

function Page() {
  // getting parameter lang , category 
  const params = useParams();
  const { lang } = useLang();
  const isAr = lang === "AR";

  const procId = params.procedCategory as string;

  // getting the current category 
  const currentCategory = procedures.find((p) => p.slug === procId);
  const CategoryIcon = currentCategory?.icon || FileText;
  const categoryColor = currentCategory?.color || "bg-blue-50 text-blue-600";

  // procedures items of the current category 
  const [procedureItemsData, setprocedureItemsData] = useState<ProcedureItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);


  useEffect(()=>{
    let isMounted = true ; 
    const getProcedureItems = async ()=>{
      try {
        const response = await fetch(`${BACKEND_DOMAIN}/procedure-items?category=${procId}`)
        if(!response.ok) throw new Error("Error to fetch the procedures")
        
          const result = await response.json()
          
          if(result.ok && isMounted){
            setprocedureItemsData(result.data)
          }
      } catch (error) {
        console.log(`Something went wrong while fetching the procedures of this category ${error}`)
        if(isMounted)setHasError(true)
      }finally{
        if(isMounted) setIsLoading(false)
    }
    }
    getProcedureItems()
    
    return ()=> {
      isMounted=false
    }
  },[])

    if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  //  Handling Error or Missing Data State
  if (hasError) {
    return (
      <div className="py-20 text-center text-gray-500">
        {isAr
          ? "تعذر تحميل المساطر الإدارية"
          : "Impossible de charger les procedures administratives."}
      </div>
    );
  }

  return (
    <div
      className="relative py-20 max-w-7xl mx-auto px-6"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Bouton Retour */}
      <SmartLink
        href="/procedures-administratives"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-gate-beige mb-10 transition-colors font-bold text-sm uppercase tracking-widest"
      >
        {isAr ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        {isAr ? "العودة للمساطر" : "Retour aux catégories"}
      </SmartLink>

      <SectionHeader
        isAr={isAr}
        subtitle={{
          FR: "Services aux citoyens",
          AR: "خدمات المواطنين",
        }}
        title={{
          FR: currentCategory?.title.FR || "Procédures",
          AR: currentCategory?.title.AR || "المساطر",
        }}
      />

      {procedureItemsData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {procedureItemsData.map((item) => (
            <div
              key={item.id}
              className="group relative bg-linear-to-b from-gate-beige/60 via-gate-beige/40 to-gate-beige/20 border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-gate-beige/20 transition-all duration-500 hover:-translate-y-2"
            >
              <div
                className="absolute inset-0 opacity-[0.09] pointer-events-none"
                style={{
                  backgroundImage: `url('/zelij.png')`,
                  backgroundSize: "200px",
                  mixBlendMode: "multiply",
                }}
              />
              <SmartLink
                href={`/procedures-administratives/${procId}/${item.id}`}
              >
                {/* Boîte d'icône (Héritée de la catégorie) */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 ${categoryColor} group-hover:bg-gate-beige group-hover:text-white`}
                >
                  <CategoryIcon size={30} />
                </div>

                <h3
                  className={`text-xl font-black text-slate-900 mb-4 ${
                    isAr ? "font-arabic" : "tracking-tight"
                  }`}
                >
                  {item.title[lang]}
                </h3>
                <p
                  className={`text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6 ${
                    isAr ? "font-arabic" : "font-light"
                  }`}
                >
                  {item.description
                    ? item.description[lang]
                    : isAr
                    ? "دليل شامل حول الوثائق والمراحل..."
                    : "Guide complet sur les documents et étapes..."}
                </p>

                {/* Action Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <span
                    className={`${categoryColor.split(" ")[1]} font-black text-[10px] uppercase tracking-[0.2em] ${
                      isAr ? "font-arabic" : ""
                    }`}
                  >
                    {isAr ? "اقرأ المزيد" : "Voir les détails"}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-gate-beige/20 flex items-center justify-center group-hover:bg-gate-beige group-hover:text-white transition-all">
                    <ArrowRight
                      size={14}
                      className={isAr ? "rotate-180" : ""}
                    />
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-32 h-32 bg-gate-beige/5 rounded-full -mr-16 -mt-16 scale-0 group-hover:scale-100 transition-transform duration-700" />
              </SmartLink>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-400 italic">
          {isAr
            ? "لا توجد مساطر متوفرة حاليا"
            : "Aucune procédure disponible pour le moment."}
        </div>
      )}
    </div>
  );
}

export default Page;