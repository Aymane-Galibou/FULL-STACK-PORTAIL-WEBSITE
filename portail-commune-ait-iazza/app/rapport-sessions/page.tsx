"use client";
import SessionReportsGrid from "@/components/SessionReportsGrid";
import { useLang } from "@/context/langContext";
import { SessionReport } from "@/types/session";
import { BACKEND_DOMAIN } from "@/utils/urlFormating";
import { useEffect, useState } from "react";


export default function SessionsPage() {
  const [sessionReportData, setsessionReportData] = useState<SessionReport[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const { lang } = useLang();
  const isAr = lang === "AR";

  useEffect(() => {
    let isMounted = true;
    const getSessionReports = async () => {
      try {
        const response = await fetch(`${BACKEND_DOMAIN}/session-reports`);

        if (!response.ok) throw new Error("Failed To Fetch");

        const result = await response.json();

        if (isMounted && result.ok) {
          setsessionReportData(result.data);
        }
      } catch (error) {
        console.log("Something went wrong while fetching the sessions reports");
        if (isMounted) setHasError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    getSessionReports()
    return ()=> {
      isMounted=false
    }
  }, []);
    // Handling Loading State
  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  //  Handling Error or Missing Data State
  if (hasError || !sessionReportData) {
    return (
      <div className="py-20 text-center text-gray-500">
        {isAr
          ? "تعذر تحميل أنشطة رئيس المجلس"
          : "Impossible de charger les activites du président."}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/50 py-16">
      {/* En-tête de section */}
      <div
        className="max-w-7xl mx-auto px-6 mb-12 text-center"
        dir={isAr ? "rtl" : "ltr"}
      >
        <span className="px-4 py-1.5 rounded-full bg-slate-200/60 text-slate-700 text-xs font-bold uppercase tracking-wider inline-block mb-3">
          {isAr ? "الشفافية والحكامة" : "Transparence & Gouvernance"}
        </span>
        <h1
          className={`text-3xl md:text-5xl font-black text-slate-900 ${isAr ? "font-arabic" : ""}`}
        >
          {isAr ? "محاضر دورات المجلس الجماعي" : "Procès-Verbaux des Sessions"}
        </h1>
        <p
          className={`mt-4 text-slate-500 max-w-2xl mx-auto text-sm md:text-base ${isAr ? "font-arabic" : ""}`}
        >
          {isAr
            ? "طلع على جميع قرارات ومحاضر الدورات العادية والاستثنائية للمجلس الجماعي وقم بتحميلها مباشرة."
            : "Consultez et téléchargez l'ensemble des procès-verbaux des sessions ordinaires et extraordinaires du conseil."}
        </p>
      </div>

      {/* Grille des sessions */}
      <SessionReportsGrid reports={sessionReportData} lang={lang} />
    </main>
  );
}
