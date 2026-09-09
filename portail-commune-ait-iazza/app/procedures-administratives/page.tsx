"use client";
import AdministrativeProcedures from "@/components/ProceduAdmin";
import { useLang } from "@/context/langContext";

function page() {
  const { lang } = useLang();
  return <AdministrativeProcedures primaryPage={true} lang={lang} />;
}

export default page;
