import { useState, useEffect } from "react";
import {
  Download,
  Calendar,
  ShieldCheck,
  ExternalLink,
  FileText,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import { getFormatedUrl } from "@/utils/urlFormating";
import { handleDirectDownload } from "@/utils/downloads";
import { InternalRegulation } from "@/types/regulation";


export default function RegulationCard({
  item,
  lang,
  isAr,
}: {
  item: InternalRegulation;
  lang: "FR" | "AR";
  isAr: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPdfAvailable, setIsPdfAvailable] = useState<boolean | null>(null);

  const formattedUrl = getFormatedUrl(item.pdfUrl,'pdf');

  // Check PDF existence safely client-side
  useEffect(() => {
    let isMounted = true;

    async function checkPdf() {
      if (!formattedUrl) {
        setIsPdfAvailable(false);
        return;
      }
      try {
        const res = await fetch(formattedUrl, { method: "HEAD" });
        const contentType = res.headers.get("content-type");
        const isValid =
          res.ok && (contentType?.includes("pdf") || res.type === "basic");
        if (isMounted) setIsPdfAvailable(isValid);
      } catch {
        if (isMounted) setIsPdfAvailable(false);
      }
    }

    checkPdf();
    return () => {
      isMounted = false;
    };
  }, [formattedUrl]);

  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-12 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100 text-stone-700 text-xs font-bold uppercase tracking-wider border border-stone-200/60">
            <ShieldCheck size={16} className="text-amber-800" />
            <span>
              {isAr ? "الولاية الانتدابية" : "Mandat"} : {item.mandatePeriod}
            </span>
          </div>

          <h1
            className={`text-3xl md:text-4xl font-black text-slate-900 ${
              isAr ? "font-arabic" : ""
            }`}
          >
            {item.title[lang]}
          </h1>

          <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold pt-1">
            <Calendar size={16} className="text-amber-800" />
            <span>
              {isAr
                ? `تاريخ المصادقة: ${item.adoptionDate}`
                : `Date d'adoption : ${item.adoptionDate}`}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
          <button
            disabled={isPdfAvailable === false}
            onClick={() =>
              handleDirectDownload(
                formattedUrl,
                `reglement-${item.adoptionDate}`
              )
            }
            className={`inline-flex items-center justify-center gap-3 font-bold text-base py-4 px-8 rounded-2xl transition-all duration-300 shadow-sm ${
              isPdfAvailable === false
                ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                : "bg-gate-beige hover:bg-[#e4c995] text-slate-900 active:scale-[0.98] border border-amber-200/40"
            }`}
          >
            <Download size={20} className="text-slate-800" />
            <span>
              {isAr
                ? "تحميل الوثيقة الرسمية (PDF)"
                : "Télécharger le Règlement (PDF)"}
            </span>
          </button>

          <button
            disabled={isPdfAvailable === false}
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center justify-center gap-2.5 bg-stone-100 hover:bg-stone-200/70 text-slate-800 font-bold text-sm py-4 px-8 rounded-2xl transition-all duration-300 active:scale-[0.98] border border-stone-200/50"
          >
            {isOpen ? (
              <EyeOff size={18} className="text-slate-600" />
            ) : (
              <Eye size={18} className="text-slate-600" />
            )}
            <span>
              {isOpen
                ? isAr
                  ? "إخفاء المعاينة"
                  : "Masquer l'aperçu"
                : isAr
                ? "معاينة الوثيقة"
                : "Afficher l'aperçu"}
            </span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
              <FileText size={18} className="text-amber-700" />
              <span>
                {isAr
                  ? "معاينة الوثيقة الرسمية"
                  : "Aperçu du document officiel"}
              </span>
            </div>

            {isPdfAvailable && (
              <a
                href={item.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:underline"
              >
                <span>
                  {isAr
                    ? "فتح في نافذة جديدة"
                    : "Ouvrir dans un nouvel onglet"}
                </span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>

          <div className="w-full h-162.5 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 relative">
            {isPdfAvailable === false ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center space-y-3 bg-slate-50/80">
                <div className="p-4 rounded-full bg-amber-100/60 text-amber-800">
                  <AlertCircle size={40} />
                </div>
                <h3
                  className={`text-lg font-bold text-slate-800 ${
                    isAr ? "font-arabic" : ""
                  }`}
                >
                  {isAr
                    ? "الوثيقة غير متوفرة حالياً"
                    : "Document non disponible"}
                </h3>
                <p
                  className={`text-sm text-slate-500 max-w-md ${
                    isAr ? "font-arabic" : ""
                  }`}
                >
                  {isAr
                    ? "عذراً، يتعذر تحميل ملف الوثيقة الرسمية حالياً."
                    : "Désolé, le fichier du règlement officiel est introuvable."}
                </p>
              </div>
            ) : (
              <iframe
                src={`${formattedUrl}#toolbar=1&navpanes=0`}
                className="w-full h-full border-none"
                title={item.title[lang]}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}