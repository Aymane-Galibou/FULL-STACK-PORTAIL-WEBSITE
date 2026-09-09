import {
  Landmark,
  TreePine,
  GraduationCap,
  LayoutGrid,
  LucideIcon,
} from "lucide-react";


export interface VisionCategory {
  id: number;
  slug: string;
  title: { AR: string; FR: string };
  icon: LucideIcon;
  description: { AR: string; FR: string };
}

export const visions: VisionCategory[] = [
  {
    id: 1,
    slug: "amenagement-urbain",
    title: { FR: "Aménagement Urbain", AR: "التهيئة الحضرية" },
    icon: Landmark,
    description: {
      FR: "Modernisation des infrastructures et renforcement de l'attractivité territoriale pour une ville connectée et accessible.",
      AR: "تحديث البنيات التحتية وتعزيز جاذبية المجال الترابي من أجل مدينة متصلة وسهلة الولوج للجميع.",
    },
  },
  {
    id: 2,
    slug: "espaces-verts",
    title: { FR: "Espaces Verts", AR: "المساحات الخضراء" },
    icon: TreePine,
    description: {
      FR: "Préservation de l'environnement et création de lieux de détente durables pour améliorer la qualité de vie des citoyens.",
      AR: "الحفاظ على البيئة وإحداث فضاءات ترفيهية مستدامة من أجل تحسين جودة حياة المواطنين.",
    },
  },
  {
    id: 3,
    slug: "education-jeunesse",
    title: { FR: "Éducation & Jeunesse", AR: "التعليم والشباب" },
    icon: GraduationCap,
    description: {
      FR: "Soutien aux initiatives éducatives et sportives pour favoriser l'épanouissement et l'insertion des jeunes talents.",
      AR: "دعم المبادرات التعليمية والرياضية لتعزيز تفتح وإدماج الكفاءات الشابة في المجتمع.",
    },
  },
  {
    id: 4,
    slug: "autres-domaines",
    title: { FR: "Autres domaines", AR: "ميادين أخرى" },
    icon: LayoutGrid,
    description: {
      FR: "Actions transversales incluant la digitalisation, la santé et le développement économique local.",
      AR: "مبادرات متعددة القطاعات تشمل التحول الرقمي والصحة العامة وتعزيز التنمية الاقتصادية المحلية.",
    },
  },
];