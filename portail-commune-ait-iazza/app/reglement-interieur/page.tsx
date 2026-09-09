"use client";
import InternalRegulationsView from "@/components/InternalRegulationsView";
import { useLang } from "@/context/langContext";
import { InternalRegulation } from "@/types/regulation";
import { BACKEND_DOMAIN } from "@/utils/urlFormating";
import { useEffect, useState } from "react";
import { Controller } from "swiper/modules";

export default function InternalRegulationPage() {
  const { lang } = useLang();
  const isAr = lang === "AR";

  const [internalRegulationData, setinternalRegulationData] = useState<
    InternalRegulation[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();

    const getInternalsRegulation = async () => {
      try {
        const response = await fetch(`${BACKEND_DOMAIN}/internal-regulation`);

        if (!response.ok)
          throw new Error(
            "Something went wrong while fetching internal regulation",
          );

        const result = await response.json();

        if (result.ok) setinternalRegulationData(result.data);
      } catch (error) {
        console.log(`Something went wrong ${error}`);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getInternalsRegulation();

    return () => controller.abort();
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
  if (hasError) {
    return (
      <div className="py-20 text-center text-gray-500">
        {isAr
          ? "تعذر تحميل القانون الداخلي للمجلس"
          : "Impossible de charger les reglements interieur du conseil."}
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-slate-50/50 py-8">
      <InternalRegulationsView
        regulation={internalRegulationData}
        lang={lang || "FR"}
      />
    </main>
  );
}
