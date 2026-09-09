"use client";

import { useLang } from "@/context/langContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Users, Map, Landmark, History, Quote, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import DisplayStatistique from "@/components/ui/displayStatistique";

const CounterK = ({
  value,
  duration = 2,
}: {
  value: string;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = numericValue;
      if (start === end) return;

      const totalMiliseconds = duration * 1000;
      const incrementTime = totalMiliseconds / end;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};



const PRESENTATION_CONTENT = {
  header: {
    subtitle: { FR: "Patrimoine et Territoire", AR: "التراث والمجال" },
    title: { FR: "Découvrir Aït Iazza", AR: "اكتشف أيت إيعزة" },
    description: {
      FR: "Entre les montagnes de l'Atlas et les plaines fertiles du Souss, Aït Iazza se dresse comme un carrefour de civilisations, alliant la sagesse du passé au dynamisme de demain.",
      AR: "بين جبال الأطلس وسهول سوس المعطاءة، تقف أيت إيعزة كملتقى للحضارات، تزاوج بين حكمة الماضي ودينامية المستقبل.",
    },
  },
  detailedHistory: {
    FR: [
      "L'histoire d'Aït Iazza est intimement liée à la dynamique caravanière du Souss. Depuis des siècles, ce territoire a servi de halte stratégique pour les commerçants, forgeant ainsi une culture de l'hospitalité et de l'échange.",
      "Au fil des décennies, la commune est passée d'un groupement rural centré sur l'agriculture irriguée à un centre urbain structuré, sans jamais perdre son âme. Cette transition a été marquée par la résilience de ses habitants face aux défis climatiques et leur capacité à moderniser leurs infrastructures tout en préservant le tissu social traditionnel.",
      "Aujourd'hui, Aït Iazza ne se contente plus d'être un carrefour ; elle devient un pôle d'attractivité économique majeur dans la province de Taroudant, portée par une jeunesse ambitieuse et un conseil municipal engagé dans le développement durable.",
    ],
    AR: [
      "يرتبط تاريخ أيت إيعزة ارتباطاً وثيقاً بحركية القوافل في منطقة سوس. لقرون طويلة، شكل هذا المجال محطة استراتيجية للتجار، مما ساهم في صياغة ثقافة الانفتاح والتبادل العريقة.",
      "على مر العقود، انتقلت الجماعة من تجمع قروي يعتمد على الفلاحة المسقية إلى مركز حضري مهيكل، دون أن تفقد هويتها الأصيلة. تميز هذا التحول بصمود سكانها وقدرتهم على تحديث البنيات التحتية مع الحفاظ على الروابط الاجتماعية التقليدية.",
      "اليوم، لا تكتفي أيت إيعزة بكونها مفترق طرق فحسب؛ بل أصبحت قطبًا اقتصاديًا صاعدًا بإقليم تارودانت، مدفوعة بطموح شبابها والتزام مجلسها الجماعي بمسار التنمية المستدامة.",
    ],
  },
};

export default function PresentationPage() {
  const { lang } = useLang();
  const isAr = lang === "AR";

  return (
    <main
      className="relative min-h-screen  overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url('/zelij.png')`,
          backgroundSize: "200px",
          mixBlendMode: "multiply",
        }}
      />
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/aitiazzaMarket.jpg"
          fill
          className="object-cover brightness-50"
          alt="Vue aérienne Aït Iazza"
          priority
        />
        <div className="relative z-10 text-center text-white px-6">
          <h1
            className={`text-4xl md:text-6xl font-black mb-4 ${isAr ? "font-arabic" : ""}`}
          >
            {isAr ? "جماعة أيت إيعزة" : "Commune d'Aït Iazza"}
          </h1>
          <p className="text-xl opacity-90 tracking-widest uppercase">
            {isAr ? "أرض العطاء والمستقبل" : "Terre de partage & d'avenir"}
          </p>
        </div>
      </section>

      {/* 2. BANDE BEIGE AVEC COMPTEURS (Effet Ouf) */}
      <section className="max-w-7xl mx-auto px-6 -mt-24 md:-mt-32 relative z-30">
        <DisplayStatistique lang={lang} />
      </section>

      {/* 3. HISTOIRE DÉTAILLÉE (Récit profond) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Utilisation de ton SectionHeader */}
          <SectionHeader
            isAr={isAr}
            subtitle={PRESENTATION_CONTENT.header.subtitle}
            title={PRESENTATION_CONTENT.header.title}
            description={PRESENTATION_CONTENT.header.description}
            showDescription={true}
          />

          {/* Corps de l'histoire détaillé */}
          <div
            className={`mt-20 flex flex-col lg:flex-row gap-16 items-center ${isAr ? "lg:flex-row-reverse" : ""}`}
          >
            {/* Colonne Texte */}
            <div className="w-full lg:w-3/5 space-y-6">
              {(isAr
                ? PRESENTATION_CONTENT.detailedHistory.AR
                : PRESENTATION_CONTENT.detailedHistory.FR
              ).map((para, index) => (
                <p
                  key={index}
                  className={`text-lg md:text-xl text-slate-600 leading-relaxed ${isAr ? "font-arabic text-right" : "text-left"}`}
                >
                  {para}
                </p>
              ))}

              {/* Petit élément décoratif pour "finir" le texte */}
              <div
                className={`flex ${isAr ? "justify-end" : "justify-start"} mt-10`}
              >
                <div className="h-1 w-20 bg-gate-beige rounded-full" />
              </div>
            </div>

            {/* Colonne Image Artistique */}
            <div className="w-full lg:w-2/5">
              <div className="relative h-137.5 w-full">
                <div
                  className={`absolute inset-0 bg-gate-beige/10 rounded-[4rem] translate-y-6 ${isAr ? "-translate-x-6" : "translate-x-6"}`}
                />

                <div className="relative h-full w-full rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white">
                  <Image
                    src="/cultureaitiazza.jpg"
                    fill
                    className="object-cover"
                    alt="Histoire locale"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* CITATION FINALE */}
      <section className="py-20 text-center max-w-4xl mx-auto px-6">
        <Quote size={50} className="mx-auto text-[#d4a574]/20 mb-8" />
        <h3
          className={`text-2xl md:text-3xl  italic text-slate-800 ${isAr ? "font-arabic" : "font-serif"}`}
        >
          {isAr
            ? '"أيت إيعزة ليست مجرد مكان نسكنه، بل هي فخر يسكننا ويهمنا مستقبله"'
            : "\"Aït Iazza n'est pas seulement un lieu où nous habitons, c'est une fierté qui nous habite et dont l'avenir nous appartient.\""}
        </h3>
      </section>
    </main>
  );
}
