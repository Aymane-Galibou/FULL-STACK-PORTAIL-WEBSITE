"use client";

import { useLang } from "@/context/langContext";
import Link from "next/link";

function Page() {
  const { lang } = useLang();
  const isAr = lang === "AR";

  return (
    <main className="fixed inset-0 z-9999 bg-slate-50 overflow-hidden flex items-center justify-center px-6">
      {/* --- Éléments décoratifs d'arrière-plan (Blobs) --- */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-200/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-[120px] animate-bounce duration-[10s]" />

      <div className="relative flex flex-col items-center text-center max-w-2xl">
        {/* --- Badge / Icone --- */}
        <div className="mb-8 p-4 rounded-full bg-white shadow-xl shadow-amber-900/5 border border-amber-100 animate-bounce">
          <svg
            className="w-8 h-8 text-amber-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* --- Titre principal --- */}
        <h1
          className={`
          text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight
          ${isAr ? "font-arabic" : "uppercase"}
        `}
        >
          {isAr
            ? "الموقع دخل مرحلة الصيانة الأخيرة"
            : "Le site web est en dernière phase de maintenance"}
        </h1>

        {/* --- Sous-texte --- */}
        <p className="mt-6 text-slate-500 text-lg md:text-xl font-medium max-w-md">
          {isAr
            ? "نحن نعمل بجد لنقدم لكم أفضل تجربة ممكنة. شكرا لصبركم."
            : "Nous travaillons dur pour vous offrir la meilleure expérience possible. Merci de votre patience."}
        </p>

        {/* --- Barre de progression décorative --- */}
        <div className="mt-10 w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-amber-500 w-1/3 animate-loading-bar" />
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(250%);
          }
        }
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}

export default Page;
