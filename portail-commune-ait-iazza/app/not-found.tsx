"use client";

import { useLang } from "@/context/langContext";
import Link from "next/link";

function Page() {
  const { lang } = useLang();
  const isAr = lang === "AR";

  return (
    <main className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-slate-50 px-6">
      {/* --- Éléments décoratifs d'arrière-plan (Blobs) --- */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gate-beige/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-[120px] animate-bounce duration-[10s]" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        {/* --- Badge / Icone --- */}
        <div className="mb-8 p-4 rounded-full bg-white shadow-xl shadow-gate-beige/10 border border-gate-beige/20 animate-bounce">
          <svg
            className="w-8 h-8 text-gate-beige"
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
            ? "هذه الصفحة ستكون متاحة قريبا"
            : "Cette Page sera Bientôt Disponible"}
        </h1>

        {/* --- Sous-texte --- */}
        <p className="mt-6 text-slate-500 text-lg md:text-xl font-medium max-w-md">
          {isAr
            ? "نحن نعمل بجد لنقدم لكم أفضل تجربة ممكنة. شكرا لصبركم."
            : "Nous travaillons dur pour vous offrir la meilleure expérience possible. Merci de votre patience."}
        </p>

        {/* --- Barre de progression décorative --- */}
        <div className="mt-10 w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-gate-beige w-1/3 animate-[loading_2s_ease-in-out_infinite]" />
        </div>

        {/* --- Bouton Retour --- */}
        <Link
          href="/"
          className="mt-12 px-8 py-3 bg-white border border-slate-200 rounded-full text-slate-600 font-semibold hover:bg-slate-50 hover:border-gate-beige transition-all duration-300 shadow-sm"
        >
          {isAr ? "العودة للرئيسية" : "Retour à l'accueil"}
        </Link>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(250%);
          }
        }
      `}</style>
    </main>
  );
}

export default Page;
