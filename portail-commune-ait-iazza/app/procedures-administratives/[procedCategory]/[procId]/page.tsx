"use client";

import { useParams } from "next/navigation";
import { useLang } from "@/context/langContext";
import { procedureDetails, ProcedureItem, procedures } from "@/data/procedure";
import SmartLink from "@/components/ui/SmartLink";
import { 
  ChevronLeft, 
  ChevronRight, 
  FileCheck, 
  Clock, 
  Coins, 
  FileText,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import { BACKEND_DOMAIN } from "@/utils/urlFormating";

export default function ProcedureDetailPage() {
  const params = useParams();
  const { lang } = useLang();
  const isAr = lang === "AR";

  const procedCategory = params.procedCategory as string;
  const procId = Number(params.procId);

  // getting the current category with its icon and color 
  const currentCategory = procedures.find((p) => p.slug === procedCategory);
  const CategoryIcon = currentCategory?.icon || FileText;
  const categoryColor = currentCategory?.color || "bg-blue-50 text-blue-600";


  // procedures items of the current category 
  const [procedureItem, setprocedureItem] = useState<ProcedureItem|null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);


  useEffect(()=>{
    let isMounted = true ; 
    const getProcedureItems = async ()=>{
      try {
        const response = await fetch(`${BACKEND_DOMAIN}/procedure-items?category=${procedCategory}&id=${procId}`)
        if(!response.ok) throw new Error("Error to fetch the procedures")
        
          const result = await response.json()
          
          if(result.ok && isMounted){
            setprocedureItem(result.data[0])
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
          ? "تعذر تحميل هده المسطرة الإدارية"
          : "Impossible de charger cette procedure administrative."}
      </div>
    );
  }

  return (
    <div
      className="relative py-16 max-w-5xl mx-auto px-6"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Bouton Retour vers la catégorie */}
      <SmartLink
        href={`/procedures-administratives/${procedCategory}`}
        className="inline-flex items-center gap-2 text-slate-400 hover:text-gate-beige mb-8 transition-colors font-bold text-sm uppercase tracking-widest"
      >
        {isAr ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        {isAr 
          ? `العودة إلى ${currentCategory?.title.AR || "المساطر"}`
          : `Retour à ${currentCategory?.title.FR || "Catégories"}`
        }
      </SmartLink>

      {/* En-tête de la procédure */}
      <div className="relative bg-linear-to-b from-gate-beige/60 via-gate-beige/30 to-gate-beige/10 border border-slate-100 p-8 md:p-12 rounded-[2.5rem] shadow-sm mb-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `url('/zelij.png')`,
            backgroundSize: "200px",
            mixBlendMode: "multiply",
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${categoryColor}`}>
            <CategoryIcon size={32} />
          </div>

          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] block mb-1">
              {currentCategory?.title[lang]}
            </span>
            <h1 className={`text-2xl md:text-4xl font-black text-slate-900 mb-3 ${isAr ? "font-arabic" : "tracking-tight"}`}>
              {procedureItem?.title[lang]}
            </h1>
            <p className={`text-slate-600 leading-relaxed ${isAr ? "font-arabic" : "font-light"}`}>
              {procedureItem?.description[lang]}
            </p>
          </div>
        </div>
      </div>

      {/* Grille d'informations (Documents, Délais, Frais) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* Documents Requis */}
        <div className="md:col-span-2 bg-white border border-slate-200 p-8 rounded-4xl shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
            <div className="p-2.5 rounded-xl bg-gate-beige/10 text-gate-beige">
              <FileCheck size={22} />
            </div>
            <h2 className={`text-lg font-bold text-slate-900 ${isAr ? "font-arabic" : ""}`}>
              {isAr ? "الوثائق المطلوبة" : "Documents requis"}
            </h2>
          </div>

          {procedureItem?.requirements && procedureItem?.requirements[lang]?.length > 0 ? (
            <ul className="space-y-3">
              {procedureItem.requirements[lang].map((doc, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm">
                  <CheckCircle2 size={18} className="text-gate-beige shrink-0 mt-0.5" />
                  <span className={isAr ? "font-arabic" : ""}>{doc}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400 italic text-sm">
              {isAr ? "لا توجد وثائق محددة" : "Aucun document spécifique requis."}
            </p>
          )}
        </div>

        {/* Délais et Frais */}
        <div className="space-y-6">
          
          {/* Delais */}
          <div className="bg-white border border-slate-200 p-6 rounded-4xl shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Clock size={20} />
              </div>
              <h3 className={`font-bold text-slate-900 text-sm ${isAr ? "font-arabic" : ""}`}>
                {isAr ? "آجال المعالجة" : "Délai de traitement"}
              </h3>
            </div>
            <p className={`text-slate-700 font-semibold text-base ${isAr ? "font-arabic" : ""}`}>
              {procedureItem?.processing_time ? procedureItem?.processing_time[lang] : (isAr ? "غير محدد" : "Non spécifié")}
            </p>
          </div>

          {/* Frais */}
          <div className="bg-white border border-slate-200 p-6 rounded-4xl shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <Coins size={20} />
              </div>
              <h3 className={`font-bold text-slate-900 text-sm ${isAr ? "font-arabic" : ""}`}>
                {isAr ? "الرسوم والواجبات" : "Frais de procédure"}
              </h3>
            </div>
            <p className={`text-slate-700 font-semibold text-base ${isAr ? "font-arabic" : ""}`}>
              {procedureItem?.fees ? procedureItem?.fees[lang] : (isAr ? "مجاني" : "Gratuit")}
            </p>
          </div>

        </div>
      </div>

      {/* Note d'information administrative */}
      <div className="bg-slate-50 border border-slate-200/80 p-6 rounded-2xl flex items-start gap-4 text-slate-500 text-xs">
        <AlertCircle size={20} className="text-gate-beige shrink-0" />
        <p className={`leading-relaxed ${isAr ? "font-arabic" : ""}`}>
          {isAr
            ? "يرجى التأكد من إحضار أصول الوثائق المصادق عليها عند التوجه إلى مصلحة الجماعة لتفادي أي تأخير في معالجة طلبكم."
            : "Veuillez vous assurer de présenter les originaux des documents certifiés lors de votre passage au service communal afin d'éviter tout retard dans le traitement de votre demande."}
        </p>
      </div>
    </div>
  );
}