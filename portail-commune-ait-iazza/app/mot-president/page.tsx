"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLang } from "@/context/langContext";
import { PresidentProfile } from "@/types/presidentProfile";
import { getFormatedUrl } from "@/utils/urlFormating";
import Image from "next/image";
import { useEffect, useState } from "react";

const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export default function PresidentProfilePage() {
  const { lang } = useLang();
  const isAr = lang === "AR";

  const [presidentProfileData, setPresidentProfileData] = useState<PresidentProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const getPresidentProfile = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BACKEND_DOMAIN}/president-profile`);
        
        if (!response.ok) throw new Error("Failed to fetch");

        const result = await response.json();
        
        if (isMounted && result.ok) {
          setPresidentProfileData(result.data);
        }

      } catch (error) {
        console.error("Error loading president profile:", error);
        if (isMounted) setHasError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    getPresidentProfile();

    return () => {
      isMounted = false; // Prevent state updates on unmounted component
    };
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
  if (hasError || !presidentProfileData) {
    return (
      <div className="py-20 text-center text-gray-500">
        {isAr ? "تعذر تحميل معطيات رئيس المجلس" : "Impossible de charger le profil du président."}
      </div>
    );
  }


  return (
    <div className="relative py-20">
      <SectionHeader
        isAr={isAr}
        subtitle={{
          FR: "Mot du Président",
          AR: "كلمة الرئيس",
        }}
        title={{
          FR: presidentProfileData.fullName?.FR ?? "",
          AR: presidentProfileData.fullName?.AR ?? "",
        }}
      />

      <div
        className={`flex flex-col md:flex-row max-w-7xl mx-auto px-6 items-center gap-12 mt-12 ${
          isAr ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Image Container */}
        <div className="relative w-full max-w-100 h-100 md:h-125 md:w-1/3 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
          <Image
            src={getFormatedUrl(presidentProfileData.photoUrl)}
            priority
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
            alt={isAr ? "صورة رئيس المجلس" : "Photo du président"}
          />
        </div>

        {/* Content Section */}
        <div className={`w-full md:w-2/3 ${isAr ? "text-right font-arabic" : "text-left"}`}>
          <div className="relative">
            <span
              className={`text-6xl text-primary/20 absolute -top-8 ${
                isAr ? "-right-4" : "-left-4"
              }`}
            >
              "
            </span>

            <div className="space-y-6 relative z-10">
              <p className="text-gray-700 text-lg leading-12 ">
                {isAr
                  ? presidentProfileData.message?.AR
                  : presidentProfileData.message?.FR}
              </p>
            </div>

            <div
              className={`mt-8 pt-6 border-t border-gray-200 ${
                isAr ? "text-right" : "text-left"
              }`}
            >
              <p className="font-bold text-xl text-primary uppercase tracking-wider">
                {isAr
                  ? presidentProfileData.fullName?.AR
                  : presidentProfileData.fullName?.FR}
              </p>
              <p className="text-gray-500 italic">
                {isAr ? "رئيس الجماعة الترابية" : "Président du Conseil Communal"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}