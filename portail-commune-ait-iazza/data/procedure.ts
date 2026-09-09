import {
  FileText,
  Users,
  Home,
  Zap,
  Scale,
  MapPin,
  LucideIcon
} from "lucide-react";

export interface BilingualText {
  FR: string;
  AR: string;
}

export interface CategoryConfig {
  slug: string;
  title: BilingualText;
  desc: BilingualText;
  icon: LucideIcon;
  color: string;
  href: string;
}

export interface ProcedureItem {
  id?: number;
  category_slug: string;
  title: BilingualText;
  description: BilingualText;
  requirements?: { FR: string[]; AR: string[] };
  processing_time?: BilingualText;
  fees?: BilingualText;
}

// the six official procedures category 
export const procedures: CategoryConfig[] = [
  {
    slug: "etat-civil",
    title: { FR: "État Civil", AR: "الحالة المدنية" },
    desc: {
      FR: "Extraits d'acte de naissance, certificats de résidence...",
      AR: "عقود الازدياد، شهادة السكنى...",
    },
    icon: FileText,
    color: "bg-blue-50 text-blue-600",
    href: "/procedures-administratives/etat-civil",
  },
  {
    slug: "urbanisme",
    title: { FR: "Urbanisme", AR: "التعمير" },
    desc: {
      FR: "Permis de construire, plans de situation...",
      AR: "رخص البناء، تصاميم الموقع...",
    },
    icon: Home,
    color: "bg-emerald-50 text-emerald-600",
    href: "/procedures-administratives/urbanisme",
  },
  {
    slug: "raccordements",
    title: { FR: "Raccordements", AR: "الربط بالشبكات" },
    desc: {
      FR: "Demandes d'eau, d'électricité et assainissement.",
      AR: "طلبات الماء، الكهرباء والتطهير السائل.",
    },
    icon: Zap,
    color: "bg-amber-50 text-amber-600",
    href: "/procedures-administratives/raccordements",
  },
  {
    slug: "legalisation",
    title: { FR: "Légalisation", AR: "المصادقة على التوقيع" },
    desc: {
      FR: "Légalisation de signature et copies conformes.",
      AR: "المصادقة على التوقيع ومطابقة النسخ.",
    },
    icon: Scale,
    color: "bg-purple-50 text-purple-600",
    href: "/procedures-administratives/legalisation",
  },
  {
    slug: "associations",
    title: { FR: "Associations", AR: "العمل الجمعوي" },
    desc: {
      FR: "Subventions et autorisations d'occupation d'espace.",
      AR: "المنح وتراخيص استغلال الفضاءات.",
    },
    icon: Users,
    color: "bg-rose-50 text-rose-600",
    href: "/procedures-administratives/associations",
  },
  {
    slug: "domaine-public",
    title: { FR: "Domaine Public", AR: "الملك العمومي" },
    desc: {
      FR: "Autorisations d'occupation temporaire, terrasses et activités commerciales.",
      AR: "تراخيص الاحتلال المؤقت، المرابد، والأنشطة التجارية في الفضاء العام.",
    },
    icon: MapPin,
    color: "bg-indigo-50 text-indigo-600",
    href: "/procedures-administratives/domaine-public",
  },
];

// open data for simulation 
export const procedureDetails: Record<string, ProcedureItem[]> = {
  "etat-civil": [
    {
      id:1,
      category_slug: "etat-civil",
      title: { FR: "Extrait d'acte de naissance", AR: "نسخة موجزة من رسم الولادة" },
      description: { FR: "Obtention de l'extrait de naissance original pour vos démarches.", AR: "الحصول على نسخة موجزة من رسم الولادة الأصلي." },
      requirements: {
        FR: ["Livret de famille ou ancienne copie de l'acte de naissance", "Carte d'Identité Nationale (CNI) du demandeur"],
        AR: ["الدفتر العائلي أو نسخة قديمة من رسم الولادة", "بطاقة التعريف الوطنية للمستفيد"]
      },
      processing_time: { FR: "Immédiat (Séance tenante)", AR: "فوري (في نفس الحين)" },
      fees: { FR: "Gratuit (ou timbre fiscal selon format)", AR: "مجاني (أو طابع جبائي حسب الفئة)" }
    },
    {
      id:2,
      category_slug: "etat-civil",
      title: { FR: "Copie intégrale", AR: "نسخة كاملة من رسم الولادة" },
      description: { FR: "Copie complète contenant toutes les mentions marginales.", AR: "نسخة كاملة تحتوي على جميع البيانات الهامشية." },
      requirements: {
        FR: ["Livret de famille", "Copie de la CNI du concerné ou d'un parent direct"],
        AR: ["الدفتر العائلي", "نسخة من بطاقة التعريف الوطنية للمعني أو أحد الأقارب المباشرين"]
      },
      processing_time: { FR: "24h à 48h", AR: "24 إلى 48 ساعة" },
      fees: { FR: "Gratuit", AR: "مجاني" }
    },
    {
      id:3,
      category_slug: "etat-civil",
      title: { FR: "Acte de mariage", AR: "عقد الزواج" },
      description: { FR: "Demande de copie ou d'extrait d'acte de mariage officiel.", AR: "طلب نسخة أو مستخرج من عقد الزواج الرسمي." },
      requirements: {
        FR: ["Copie de la CNI des époux", "Livret de famille ou référence de l'acte au bureau d'état civil"],
        AR: ["نسخة من بطاقة التعريف الوطنية للزوجين", "الدفتر العائلي أو مراجع العقد بمكتب الحالة المدنية"]
      },
      processing_time: { FR: "24h", AR: "24 ساعة" },
      fees: { FR: "Gratuit", AR: "مجاني" }
    }
  ],

  "urbanisme": [
    {
      id:1,
      category_slug: "urbanisme",
      title: { FR: "Permis de construire", AR: "رخصة البناء" },
      description: { FR: "Autorisation obligatoire pour toute nouvelle construction.", AR: "الرخصة الواجبة لكل بناء جديد." },
      requirements: {
        FR: [
          "Demande adressée au Président de la Commune",
          "Titre de propriété ou attestation de possession",
          "Plan d'architecte agréé (3 exemplaires)",
          "Plan de situation de la parcelle"
        ],
        AR: [
          "طلب موجه إلى رئيس المجلس الجماعي",
          "شهادة الملكية أو وثيقة إثبات الملكية",
          "تصميم الهندسة المعمارية مصادق عليه (3 نسخ)",
          "تصميم الموقع"
        ]
      },
      processing_time: { FR: "15 à 30 jours (via plateforme Rokhas)", AR: "15 إلى 30 يوماً (عبر منصة رخص)" },
      fees: { FR: "Selon la superficie couverte (Taxe sur les opérations de construction)", AR: "حسب المساحة المغطاة (الرسم على عمليات البناء)" }
    },
    {
      id:2,
      category_slug: "urbanisme",
      title: { FR: "Permis d'habiter", AR: "رخصة السكن" },
      description: { FR: "Attestation de conformité pour l'occupation d'un bâtiment.", AR: "شهادة المطابقة لاستغلال البناية." },
      requirements: {
        FR: [
          "Demande de permis d'habiter",
          "Attestation de fin de travaux délivrée par l'architecte",
          "Copie du permis de construire initial",
          "Plans récolement"
        ],
        AR: [
          "طلب الحصول على رخصة السكن",
          "شهادة انتهاء الأشغال مسلمة من المهندس المعماري",
          "نسخة من رخصة البناء الأصلية",
          "التصاميم المطابقة للبناء الإنجازي"
        ]
      },
      processing_time: { FR: "7 à 15 jours après visite de la commission", AR: "7 إلى 15 يوماً بعد معاينة اللجنة" },
      fees: { FR: "Variable selon la commune", AR: "متغير حسب الجماعة" }
    }
  ],

  "raccordements": [
    {
      id:1,
      category_slug: "raccordements",
      title: { FR: "Raccordement Eau Potable", AR: "الربط بشبكة الماء الصالح للشرب" },
      description: { FR: "Demande de branchement au réseau d'eau communal.", AR: "طلب الربط بشبكة الماء الصالح للشرب." },
      requirements: {
        FR: [
          "Demande de branchement",
          "Copie de la CNI du propriétaire",
          "Permis d'habiter ou autorisation de raccordement délivrée par la commune",
          "Titre de propriété"
        ],
        AR: [
          "طلب الربط بالشبكة",
          "نسخة من بطاقة التعريف الوطنية للمالك",
          "رخصة السكن أو إذن بالربط مسلم من الجماعة",
          "شهادة الملكية"
        ]
      },
      processing_time: { FR: "7 à 10 jours ouvrés", AR: "7 إلى 10 أيام عمل" },
      fees: { FR: "Selon devis technique de l'opérateur (Régie/ONEE)", AR: "حسب المقايسة التقنية للمكتب/الوكالة" }
    },
    {
      id:2,
      category_slug: "raccordements",
      title: { FR: "Raccordement Électricité", AR: "الربط بشبكة الكهرباء" },
      description: { FR: "Demande de branchement au réseau électrique.", AR: "طلب الربط بشبكة الكهرباء." },
      requirements: {
        FR: [
          "Demande de raccordement électrique",
          "Permis d'habiter ou attestation communale",
          "Copie de la CNI",
          "Attestation de conformité de l'installation interne"
        ],
        AR: [
          "طلب الربط بالشبكة الكهربائية",
          "رخصة السكن أو شهادة جماعية",
          "نسخة من بطاقة التعريف الوطنية",
          "شهادة سلامة التركيبات الداخلية"
        ]
      },
      processing_time: { FR: "5 à 7 jours ouvrés", AR: "5 إلى 7 أيام عمل" },
      fees: { FR: "Selon la puissance demandée (kVA) et devis", AR: "حسب القدرة المطلوبة والمقايسة" }
    }
  ],

  "legalisation": [
    {
      id:1,
      category_slug: "legalisation",
      title: { FR: "Légalisation de signature", AR: "المصادقة على التوقيع" },
      description: { FR: "Authentification de votre signature sur vos documents.", AR: "تصديق توقيعكم على الوثائق الخاصة بكم." },
      requirements: {
        FR: [
          "Document original à signer sur place",
          "Carte d'Identité Nationale (CNI) valide ou Passeport"
        ],
        AR: [
          "الوثيقة الأصلية المراد توقيعها بعين المكان",
          "بطاقة التعريف الوطنية سارية المفعول أو جواز السفر"
        ]
      },
      processing_time: { FR: "Immédiat", AR: "فوري" },
      fees: { FR: "2 DH par document (Timbre fiscal)", AR: "درهمان (2 دراهم) عن كل وثيقة" }
    },
    {
      id:2,
      category_slug: "legalisation",
      title: { FR: "Copie certifiée conforme", AR: "نسخة مطابقة للأصل" },
      description: { FR: "Certification que la copie est identique à l'original.", AR: "الإشهاد بأن النسخة مطابقة للأصل." },
      requirements: {
        FR: [
          "Document original",
          "Photocopies à certifier"
        ],
        AR: [
          "الوثيقة الأصلية",
          "النسخ الضوئية المراد الإشهاد بمطابقتها"
        ]
      },
      processing_time: { FR: "Immédiat", AR: "فوري" },
      fees: { FR: "2 DH par copie certifiée", AR: "درهمان (2 دراهم) عن كل نسخة" }
    }
  ],

  "associations": [
    {
      id:1,
      category_slug: "associations",
      title: { FR: "Constitution d'association", AR: "تأسيس جمعية" },
      description: { FR: "Dépôt légal du dossier pour la création d'une association.", AR: "الإيداع القانوني لملف تأسيس الجمعية." },
      requirements: {
        FR: [
          "Déclaration de constitution adressée à l'autorité locale",
          "Statuts de l'association (3 exemplaires)",
          "Procès-verbal de l'assemblée constituante",
          "Liste des membres du bureau exécutif avec copies CNI et fiches anthropométriques"
        ],
        AR: [
          "تصريح بالتأسيس موجه للسلطة المحلية",
          "القانون الأساسي للجمعية (3 نسخ)",
          "محضر الجمع العام التأسيسي",
          "لائحة أعضاء المكتب التنفيذي مرفوقة بنسخ بطاقات التعريف والبطاقة العدلية"
        ]
      },
      processing_time: { FR: "Récépissé provisoire immédiat / Récépissé définitif sous 60 jours", AR: "وصل مؤقت فوري / وصل نهائي خلال 60 يوماً" },
      fees: { FR: "Gratuit", AR: "مجاني" }
    },
    {
      id:2,
      category_slug: "associations",
      title: { FR: "Demande de subvention", AR: "طلب الدعم السنوي" },
      description: { FR: "Formulaire de demande d'aide financière annuelle.", AR: "نموذج طلب المساعدة المالية السنوية." },
      requirements: {
        FR: [
          "Demande de subvention signée par le Président",
          "Récépissé définitif de l'association",
          "Rapport moral et financier du dernier exercice",
          "Programme d'action et budget prévisionnel",
          "Attestation de RIB bancaire de l'association"
        ],
        AR: [
          "طلب الدعم موقع من طرف رئيس الجمعية",
          "الوصل النهائي للجمعية",
          "التقريرين الأدبي والمالي للسنة الفارطة",
          "برنامج العمل والميزانية التقديرية",
          "شهادة التعريف البنكي (RIB) باسم الجمعية"
        ]
      },
      processing_time: { FR: "Selon le calendrier des sessions du Conseil communal", AR: "حسب جدول دورات المجلس الجماعي" },
      fees: { FR: "Gratuit", AR: "مجاني" }
    }
  ],

  "domaine-public": [
    { id:1,
      category_slug: "domaine-public",
      title: { FR: "Occupation temporaire du domaine public", AR: "الاحتلال المؤقت للملك العمومي" },
      description: { 
        FR: "Autorisation pour l'installation de terrasses, kiosques ou étalages commerciaux.", 
        AR: "ترخيص لوضع المواعد، الأكشاك، أو المعروضات التجارية." 
      },
      requirements: {
        FR: [
          "Demande d'autorisation indiquant la surface souhaitée",
          "Copie du registre de commerce / Patente",
          "Plan de masse ou croquis de l'emplacement",
          "Copie de la CNI du demandeur"
        ],
        AR: [
          "طلب الترخيص يبين المساحة المطلوبة",
          "نسخة من السجل التجاري / الضريبة المهنية (البتانتي)",
          "تصميم للموقع أو رسم بياني للمساحة المراد شغلها",
          "نسخة من بطاقة التعريف الوطنية"
        ]
      },
      processing_time: { FR: "10 à 20 jours après avis de la commission", AR: "10 إلى 20 يوماً بعد رأي اللجنة" },
      fees: { FR: "Redevance trimestrielle calculée au m²", AR: "إتاوة quarterly تحسب بالفي المتر المربع" }
    },
    {id:2,
      category_slug: "domaine-public",
      title: { FR: "Autorisation de travaux sur voie publique", AR: "رخصة القيام بأشغال على الطريق العامة" },
      description: { 
        FR: "Demande pour effectuer des travaux nécessitant l'occupation de la chaussée ou du trottoir.", 
        AR: "طلب القيام بأشغال تتطلب احتلال الرصيف أو الطريق العامة." 
      },
      requirements: {
        FR: [
          "Demande détaillée précisant la durée des travaux",
          "Plan de balisage et de sécurité routière",
          "Autorisation de construire ou de raccordement associée"
        ],
        AR: [
          "طلب مفصل يحدد مدة الأشغال",
          "مخطط التشوير والسلامة الطرقية",
          "رخصة البناء أو الربط المرتبطة بالأشغال"
        ]
      },
      processing_time: { FR: "5 à 10 jours", AR: "5 إلى 10 أيام" },
      fees: { FR: "Caution de remise en état + redevance d'occupation temporaire", AR: "ضمانة إعادة الحالة إلى ما كانت عليه + إتاوة الاحتلال" }
    },
    {id:3,
      category_slug: "domaine-public",
      title: { FR: "Affichage publicitaire et enseignes", AR: "اللوحات الإشهارية واللوحات الواجهة" },
      description: { 
        FR: "Autorisation pour l'installation d'enseignes lumineuses ou de panneaux publicitaires.", 
        AR: "رخصة تثبيت اللوحات الإشهارية أو لوحات واجهة المحلات." 
      },
      requirements: {
        FR: [
          "Demande d'autorisation d'affichage",
          "Descriptif technique et dimensions du panneau/enseigne",
          "Photo de la façade et plan d'implantation"
        ],
        AR: [
          "طلب ترخيص اللوحات الإشهارية",
          "بطاقة تقنية تحدد قياسات ومواصفات اللوحة",
          "صورة الواجهة وتصميم التثبيت"
        ]
      },
      processing_time: { FR: "10 à 15 jours", AR: "10 إلى 15 يوماً" },
      fees: { FR: "Taxe annuelle sur les emplacements publicitaires", AR: "الرسم السنوي على المشروبات واللوحات الإشهارية" }
    },
    {id:4,
      category_slug: "domaine-public",
      title: { FR: "Demande de stationnement réservé", AR: "طلب حجز موقف خاص" },
      description: { 
        FR: "Réservation d'espace pour le chargement, déchargement ou zones de taxis.", 
        AR: "حجز مساحات للتفريغ، الشحن، أو مواقف سيارات الأجرة." 
      },
      requirements: {
        FR: [
          "Demande motivée adressée à la commune",
          "Justificatif d'activité commerciale ou de service",
          "Plan d'aménagement souhaité"
        ],
        AR: [
          "طلب معلل موجه للجماعة",
          "وثيقة إثبات النشاط التجاري أو الخدماتي",
          "تصميم التهيئة المطلوبة"
        ]
      },
      processing_time: { FR: "15 jours", AR: "15 يوماً" },
      fees: { FR: "Redevance annuelle fixée par arrêté fiscal communal", AR: "إتاوة سنوية محددة بموجب القرار الجبائي الجماعي" }
    }
  ]
};