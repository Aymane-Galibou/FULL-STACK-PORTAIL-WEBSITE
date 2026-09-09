"use client";
import Bureau from "@/components/Bureau";
import NewsSlider from "@/components/NewsSlider";
import AdministrativeProcedures from "@/components/ProceduAdmin";
import StatisticsSection from "@/components/Statistiques";
import CommuneVision from "@/components/Vision";
import { useLang } from "@/context/langContext";
import PresidentActivities from "@/components/ActivitePresidents";
import ProjectsList from "@/components/projects/ProjctsList";

export default function Home() {
  const { lang } = useLang();

  return (
    <>
      <div className="relative flex flex-col gap-8 min-h-screen">

        <div
        className="absolute inset-0 opacity-[0.1] pointer-events-none z-1"
        style={{
          backgroundImage: `url('/zelij.png')`,
          backgroundSize: "200px",
          mixBlendMode: "multiply",
        }}
      />
      
        {/* hero section */}
        <div className="relative h-screen w-full overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover opacity-60" // object-cover fait que la vidéo remplit tout sans se déformer
            >
              <source src="/teaser.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* L'Overlay de couleur (Optionnel - pour aider la lecture) */}
          <div className="absolute inset-0 z-10 bg-linear-to-b from-black/20 via-transparent to-black/60" />

          {/* Le Contenu Textuel Centré */}
          <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center">
            {/* Arabe */}
            <h1 className="mb-2 font-cairo text-4xl font-bold text-white md:text-6xl lg:text-7xl font-arabic">
              جماعة مدينة ايت ايعزة
            </h1>

            {/*  Tamazight */}
            <h2 className="mb-4 font-tifinagh text-xl font-bold text-amber-500 md:text-2xl lg:text-4xl tracking-widest">
              ⵜⴰⴳⵔⴰⵡⵜ ⵜⴰⵎⴷⵉⵏⵜ ⴰⵢⵜ ⵉⵄⵣⴰ
            </h2>

            {/*  Français */}
            <p className="max-w-2xl font-cairo text-lg font-medium text-slate-200 md:text-2xl lg:text-3xl uppercase tracking-tight">
              Commune de la ville d'Aït Iazza
            </p>
          </div>
        </div>

        {/* the slider of news  */}
        <NewsSlider lang={lang} />

        {/* bureau communale */}
        <Bureau lang={lang} />

        {/* vision part */}
        <CommuneVision primaryPage={false} lang={lang} />

        {/* galerie */}
        <ProjectsList limit={3} primaryPage={false}/>

        <PresidentActivities lang={lang} primaryPage={false} />

        {/* les procedures administratives */}
        <AdministrativeProcedures primaryPage={false} lang={lang} />

        {/* statistics part  */}
        <StatisticsSection lang={lang} />
      </div>
    </>
  );
}
