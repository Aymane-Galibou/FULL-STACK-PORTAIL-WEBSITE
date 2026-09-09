"use client";
import PresidentActivities from "@/components/ActivitePresidents";
import { useLang } from "@/context/langContext";

function page() {
  const { lang } = useLang();
  return <PresidentActivities primaryPage={true} lang={lang} />;
}

export default page;
