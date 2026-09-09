import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/context/langContext";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";

const keywords = [
  // Français
  "Conseil Municipal",
  "Commune de ait iazza",
  "Mairie ait iazza",
  "communeaitiazza",
  "aitiazza",
  "Bureau du Conseil",
  "Services administratifs",
  "État civil en ligne",

  // Arabe
  "المجلس الجماعي",
  "جماعة ايت ايعزة",
  "مكتب المجلس",
  "الخدمات الجماعية",
  "مشاريع التنمية",
  "أخبار الجماعة",
  "الإدارة المحلية",
];
export const metadata: Metadata = {
  metadataBase: new URL("https://portailaitiazza.vercel.app"),
  title: {
    default: "Commune ait iazza",
    template: "%s | Conseil Municipal de ait iazza",
  },
  verification: {
    google: "5VAr-JYXHo-fd-ZlKq34g4cf183l-PoltAsARwwKjZw",
  },
  description:
    "Accédez aux services en ligne, actualités, projets de développement et informations officielles du Conseil Municipal de ait iazza. Votre portail pour une ville connectée.",
  keywords: keywords,
  authors: [{ name: "aitiazza" }],
  creator: "un jeune d'ait iazza",
  other: {
    site_name: "Commune ait iazza",
  },
  applicationName: "Commune Ait Iazza",
  appleWebApp: {
    title: "Commune Ait Iazza",
    statusBarStyle: "default",
    capable: true,
  },

  // Open Graph pour le partage sur Facebook/LinkedIn
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://portailaitiazza.vercel.app/",
    title: "Conseil Municipal de ait iazza - Portail Officiel",
    description:
      "Découvrez les membres du bureau, les projets en cours et les services administratifs de votre commune.",
    siteName: "Conseil Municipal de ait iazza",
    images: [
      {
        url: "https://portailaitiazza.vercel.app/ti3za.png", // Image qui s'affiche lors du partage
        width: 1200,
        height: 630,
        alt: "Vue du Conseil Municipal",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Conseil Municipal de ait iazza",
    description: "Services et actualités de votre commune en un clic.",
    images: [{ url: "https://portailaitiazza.vercel.app/ti3za.png" }],
  },

  // Pour l'indexation Google
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.png", // For search engine results
    shortcut: "/icon.png",
    apple: "/icon.png", // For iPhone home screens
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <LangProvider>
          <Navbar />
          {children}
          {/* footer */}
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
//  beige : #F1D9A8
// green : #65AB0C
//  bleu : #3D6ADD
// orange : #F59E0B
