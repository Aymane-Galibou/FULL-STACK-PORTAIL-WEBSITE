"use client";

import SafeImage from "@/components/ui/SafeImage";
import SmartLink from "@/components/ui/SmartLink";
import { useLang } from "@/context/langContext";
import { PresidentActivityAttributes } from "@/types/presidentActivity";
import { handleDirectDownload } from "@/utils/downloads";
import { BACKEND_DOMAIN, getFormatedUrl } from "@/utils/urlFormating";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";



export default function PresidentActivityDetailPage() {
  const { id } = useParams();
  const { lang } = useLang();
  const isAr = lang === "AR";

  const [activity, setActivity] = useState<PresidentActivityAttributes | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;
    const controller = new AbortController();

    const fetchActivityDetail = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BACKEND_DOMAIN}/president-activity/${id}`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Failed to load activity");

        const result = await res.json();
        if (isMounted && result.ok) {
          setActivity(result.data);
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError" && isMounted) {
          setHasError(true);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchActivityDetail();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [id]);



  if (isLoading) {
    return (
      <div className="py-24 flex justify-center items-center min-h-125">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (hasError || !activity) {
    return (
      <div className="py-24 text-center">
        <p className="text-gray-500 text-lg">
          {isAr ? "لم يتم العثور على النشاط المطلوب" : "Activité non trouvée."}
        </p>
        <SmartLink
          href="/activites-president"
          className="mt-4 inline-block text-primary underline"
        >
          {isAr ? "العودة إلى قائمة الأنشطة" : "Retour aux activités"}
        </SmartLink>
      </div>
    );
  }

  const formattedDate = new Date(activity.eventDate).toLocaleDateString(
    isAr ? "ar-MA" : "fr-FR",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <article className="max-w-5xl mx-auto px-6 py-12">
      {/* Retour */}
      <div className={`mb-6 ${isAr ? "text-right font-arabic" : "text-left"}`}>
        <Link
          href="/activites-president"
          className="text-sm text-gray-500 hover:text-primary transition-colors"
        >
          {isAr ? "← العودة للأنشطة" : "← Retour aux activités"}
        </Link>
      </div>

      {/* En-tête */}
      <header
        className={`mb-8 ${isAr ? "text-right font-arabic" : "text-left"}`}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {/* Type d'activité */}
          <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
            {isAr ? activity.activityType?.AR : activity.activityType?.FR}
          </span>
          {/* Date */}
          <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
            {formattedDate}
          </span>
          {/* Localisation si présente */}
          {activity.location && (
            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
              {isAr ? activity.location.AR : activity.location.FR}
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          {isAr ? activity.title?.AR : activity.title?.FR}
        </h1>
      </header>

      {/* Image Principale */}
      {activity.mainImage && (
        <div className="relative w-full h-87.5 md:h-125 rounded-2xl overflow-hidden shadow-xl mb-8">
          <SafeImage
            src={getFormatedUrl(activity.mainImage)}
            alt={isAr ? activity.title?.AR : activity.title?.FR}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1000px"
            className="object-cover"
          />
        </div>
      )}

      {/* Résumé / Summary */}
      {activity.summary && (
        <div
          className={`p-6 bg-gray-50 rounded-xl border-s-4 border-primary mb-8 ${
            isAr ? "text-right font-arabic" : "text-left"
          }`}
        >
          <p className="text-gray-700 italic text-lg leading-relaxed">
            {isAr ? activity.summary.AR : activity.summary.FR}
          </p>
        </div>
      )}

      {/* Contenu principal */}
      <section
        className={`prose max-w-none text-gray-800 leading-relaxed text-lg mb-12 ${
          isAr ? "text-right font-arabic" : "text-left"
        }`}
      >
        <div className="whitespace-pre-line">
          {isAr ? activity.content?.AR : activity.content?.FR}
        </div>
      </section>

      {/* Galerie de photos */}
      <section className="mb-12 border-t pt-8">
        <h2
          className={`text-2xl font-bold text-gray-900 mb-6 ${
            isAr ? "text-right font-arabic" : "text-left"
          }`}
        >
          {isAr ? "معرض الصور" : "Galerie Photos"}
        </h2>

        {activity.galleryImages && activity.galleryImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {activity.galleryImages.map((imgUrl, index) => (
              <div
                key={index}
                className="relative h-48 rounded-xl overflow-hidden shadow-md group"
              >
                <SafeImage
                  src={getFormatedUrl(imgUrl)}
                  alt={`Photo ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 border-2 border-dashed border-gray-200 rounded-xl text-center">
            <p className="text-gray-500 text-sm">
              {isAr
                ? "لا توجد صور إضافية متوفرة لهذا النشاط حاليا"
                : "Aucune photo disponible dans la galerie pour le moment."}
            </p>
          </div>
        )}
      </section>

      {/* Documents attachés */}
      <section className="border-t pt-8">
  <h2
    className={`text-2xl font-bold text-gray-900 mb-6 ${
      isAr ? "text-right font-arabic" : "text-left"
    }`}
  >
    {isAr ? "الوثائق والمرفقات" : "Documents & Pièces Jointes"}
  </h2>

  {activity.attachments && activity.attachments.length > 0 ? (
    <div className="space-y-3">
      {activity.attachments.map((file, index) => {
        // Build the complete path to your Express static route
        const staticFileUrl = getFormatedUrl(file.url)

        const documentTitle = isAr ? file.title?.AR : file.title?.FR;

        return (
          <div
            key={index}
            className={`flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border transition-colors ${
              isAr ? "flex-row-reverse" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-800">
                {documentTitle}
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleDirectDownload(staticFileUrl, `${documentTitle}.pdf`)}
              className="text-sm font-semibold text-primary hover:underline cursor-pointer"
            >
              {isAr ? "تحميل" : "Télécharger"}
            </button>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="p-8 border-2 border-dashed border-gray-200 rounded-xl text-center">
      <p className="text-gray-500 text-sm">
        {isAr
          ? "لا توجد وثائق مرفقة بهذا النشاط"
          : "Aucun document joint à cet article."}
      </p>
    </div>
  )}
</section>

    </article>
  );
}
