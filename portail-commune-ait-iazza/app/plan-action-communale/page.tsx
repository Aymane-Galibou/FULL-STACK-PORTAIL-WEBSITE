"use client";

import { useEffect, useState, useMemo } from "react";
import CommuneVision from "@/components/Vision";
import { useLang } from "@/context/langContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Download, Calendar, ShieldCheck, Loader2 } from "lucide-react";
import { BACKEND_DOMAIN, getFormatedUrl } from "@/utils/urlFormating";
import { handleDirectDownload } from "@/utils/downloads";

interface PacData {
  title: { AR: string; FR: string };
  subtitle: { AR: string; FR: string };
  mandateYears: string;
  pdfFileUrl: string;
  pdfFileSize?: string;
  visionText?: { AR: string; FR: string };
}

export default function PlanActionPage() {
  const { lang } = useLang();
  const isAr = lang === "AR";

  const [pacData, setPacData] = useState<PacData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPdfAvailable, setIsPdfAvailable] = useState<boolean>(false);

  // 1. Fetch PAC Metadata
  useEffect(() => {
    const fetchPacInfo = async () => {
      try {
        const res = await fetch(`${BACKEND_DOMAIN}/pac/info`);
        const json = await res.json();

        if (json.ok && json.data) {
          setPacData(json.data);
        }
      } catch (error) {
        console.error("Erreur chargement PAC info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPacInfo();
  }, []);

  //  Format URL cleanly using useMemo
  const formattedPdfUrl = useMemo(() => {
    return getFormatedUrl(pacData?.pdfFileUrl, "pdf") 
  }, [pacData?.pdfFileUrl]);

  //  Verify PDF Availability on Backend via HEAD request
  useEffect(() => {
    if (!formattedPdfUrl) {
      setIsPdfAvailable(false);
      return;
    }

    const controller = new AbortController();

    fetch(formattedPdfUrl, { method: "HEAD", signal: controller.signal })
      .then((res) => {
        const contentType = res.headers.get("content-type");
        if (res.ok && (contentType?.includes("pdf") || res.type === "basic")) {
          setIsPdfAvailable(true);
        } else {
          setIsPdfAvailable(false);
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setIsPdfAvailable(false);
        }
      });

    return () => controller.abort();
  }, [formattedPdfUrl]);

  return (
    <main className="min-h-screen bg-slate-50/50 pt-10 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* header section */}
        <SectionHeader
          isAr={isAr}
          subtitle={{
            FR: pacData?.subtitle?.FR || "Vision & Développement",
            AR: pacData?.subtitle?.AR || "الرؤية والتنمية",
          }}
          title={{
            FR: pacData?.title?.FR || "Plan d'Action Communal",
            AR: pacData?.title?.AR || "برنامج عمل الجماعة",
          }}
          description={{
            FR:
              pacData?.visionText?.FR ||
              "Notre stratégie globale pour les 6 ans à venir : un engagement ferme pour moderniser les infrastructures, dynamiser le sport et renforcer la cohésion sociale à Ait Iazza.",
            AR:
              pacData?.visionText?.AR ||
              "استراتيجيتنا الشاملة للسنوات الست المقبلة: التزام راسخ بتحديث البنيات التحتية، تنشيط القطاع الرياضي، وتعزيز التماسك الاجتماعي بأيت إيعزة.",
          }}
          showDescription={true}
        />

        {/* downloading card*/}
        <div className="mt-8 mb-12 bg-white z-1 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
          <div
            className={`flex flex-col md:flex-row md:items-center justify-between gap-6 ${
              isAr ? "text-right" : "text-left"
            }`}
            dir={isAr ? "rtl" : "ltr"}
          >
            {/* Infos du document */}
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-[#b58e3e] rounded-full text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>
                  {isAr
                    ? `الولاية : ${pacData?.mandateYears || "2021 - 2027"}`
                    : `MANDAT : ${pacData?.mandateYears || "2021 - 2027"}`}
                </span>
              </div>

              <h2
                className={`text-2xl sm:text-3xl font-black text-slate-900 tracking-tight ${
                  isAr ? "font-arabic" : ""
                }`}
              >
                {pacData?.title?.[lang] ||
                  (isAr ? "برنامج عمل الجماعة" : "Plan d'Action Communal")}
              </h2>

              <div className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm font-semibold">
                <Calendar className="w-4 h-4 text-amber-600/80 shrink-0" />
                <span>
                  {isAr
                    ? "تاريخ المصادقة : 10/02/2022"
                    : "Date d'adoption : 10/02/2022"}
                </span>
              </div>
            </div>

            {/* Boutons d'actions */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 min-w-70 shrink-0">
              {loading ? (
                <div className="flex items-center justify-center p-4 bg-slate-100 rounded-2xl text-slate-400 text-sm font-medium">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  <span>{isAr ? "جاري التحميل..." : "Chargement..."}</span>
                </div>
              ) : isPdfAvailable ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      handleDirectDownload(
                        formattedPdfUrl,
                        `PAC_Ait_Iazza_${pacData?.mandateYears || "2021-2027"}.pdf`
                      )
                    }
                    className="cursor-pointer inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#f2e1b1] hover:bg-[#eacb88] active:scale-[0.99] text-slate-900 font-bold rounded-2xl transition-all text-sm shadow-2xs"
                  >
                    <Download className="w-4 h-4 text-slate-800" />
                    <span>
                      {isAr
                        ? "تحميل البرنامج (PDF)"
                        : "Télécharger le Plan (PDF)"}
                    </span>
                  </button>

                </>
              ) : (
                <div className="text-center p-3.5 bg-slate-50 text-slate-400 text-xs rounded-2xl border border-slate-100 font-medium">
                  {isAr
                    ? "الوثيقة غير متوفرة حالياً"
                    : "Document non disponible"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cartes de catégories */}
      <CommuneVision lang={lang} primaryPage={true} />
    </main>
  );
}