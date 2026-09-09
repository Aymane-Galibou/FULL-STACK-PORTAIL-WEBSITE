"use client";


import { InternalRegulation } from "@/types/regulation";
import RegulationCard from "./RegulationCard";

interface Props {
  regulation: InternalRegulation[];
  lang: "FR" | "AR";
}

export default function InternalRegulationsView({ regulation, lang }: Props) {
  const isAr = lang === "AR";

  return (
    <div
      className="py-12 max-w-375 mx-auto px-6 space-y-8"
      dir={isAr ? "rtl" : "ltr"}
    >
      {regulation.map((item) => (
        <RegulationCard key={item.id} item={item} lang={lang} isAr={isAr} />
      ))}
    </div>
  );
}