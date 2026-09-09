export type NavItems = {
  id: number;
  titre: string;
  children: { id: number; childTitre: string,href:string }[];
};

export type navElements = {
  FR: NavItems[];
  AR: NavItems[];
};

export const navElement: navElements = {
  FR: [
    {
      id: 1,
      titre: "Le Président",
      children: [
        { id: 1, childTitre: "Mot du Président",href:"/mot-president" },
        { id: 2, childTitre: "Activités Présidentielles",href:"/activites-president" },
      ],
    },
    {
      id: 2,
      titre: "La Commune",
      children: [
        { id: 1, childTitre: "Présentation de la Commune",href:"/presentation-commune" },
        { id: 2, childTitre: "Plan d'Action Communal",href:"/plan-action-communale"},
        { id: 3, childTitre: "Projets Communaux",href:"/projets-commune" },
        { id: 4, childTitre: "Procédures Administratives",href:"/procedures-administratives" },
      ],
    },
    {
      id: 3,
      titre: "Le Conseil Communal",
      children: [
        { id: 1, childTitre: "Membres du Conseil",href:"/membre-du-conseil" },
        { id: 2, childTitre: "Bureau du Conseil",href:"/bureau-du-conseil" },
        { id: 3, childTitre: "Règlement Intérieur",href:"/reglement-interieur"},
        { id: 4, childTitre: "Rapports de Sessions",href:"/rapport-sessions" },
      ],
    },
    {
      id: 4,
      titre: "La Ville",
      children: [
        { id: 1, childTitre: "Découvrir la Ville",href:"/projets-commune" },
        { id: 2, childTitre: "Actualités",href:"/projets-commune" },
        { id: 3, childTitre: "Réclamations Citoyennes",href:"/projets-commune" },
      ],
    },
    {
      id: 5,
      titre: "Budget et Finances",
      children: [
        { id: 1, childTitre: "Budget Communal",href:"/projets-commune" },
        { id: 2, childTitre: "Rapports Financiers",href:"/projets-commune" },
      ],
    },
    {
      id: 6,
      titre: "Coopération",
      children: [
        { id: 1, childTitre: "Partenaires Institutionnels",href:"/projets-commune" },
        { id: 2, childTitre: "Partenariats Public-Privé",href:"/projets-commune" },
        { id: 3, childTitre: "Associations et Société Civile",href:"/projets-commune" },
      ],
    },
  ],
  AR: [
    {
      id: 1,
      titre: "الرئيس",
      children: [
        { id: 1, childTitre: "كلمة الرئيس",href:"/mot-president" },
        { id: 2, childTitre: "أنشطة الرئيس",href:"/activites-president" },
      ],
    },
    {
      id: 2,
      titre: "الجماعة",
      children: [
        { id: 1, childTitre: "تعريف بالجماعة",href:"/presentation-commune" },
        { id: 2, childTitre: "برنامج عمل الجماعة",href:"/plan-action-communale" },
        { id: 3, childTitre: "مشاريع الجماعة",href:"/projets-commune" },
        { id: 4, childTitre: "المساطر الادارية",href:"/procedures-administratives"  },
      ],
    },
    {
      id: 3,
      titre: "المجلس الجماعي",
      children: [
        { id: 1, childTitre: "أعضـاء المجلس",href:"/membre-du-conseil" },
        { id: 2, childTitre: "مكتب المجلس",href:"/bureau-du-conseil"},
        { id: 3, childTitre: "النظام الداخلي للمجلس",href:"/reglement-interieur"},
        { id: 4, childTitre: "محاضر الدورات",href:"/rapport-sessions" },
      ],
    },
    {
      id: 4,
      titre: "المدينة",
      children: [
        { id: 1, childTitre: "مقدمة عن المدينة",href:"/projetsCommune" },
        { id: 2, childTitre: "الأخبار",href:"/projetsCommune" },
        { id: 3, childTitre: "شكايات المواطنين",href:"/projetsCommune" },
      ],
    },
    {
      id: 5,
      titre: "الميزانية",
      children: [
        { id: 1, childTitre: "الميزانية",href:"/projetsCommune" },
        { id: 2, childTitre: "التقارير المالية",href:"/projetsCommune" },
      ],
    },
    {
      id: 6,
      titre: "التعاون والشراكات",
      children: [
        { id: 1, childTitre: "الشركاء المؤسساتيون",href:"/projetsCommune" },
        { id: 2, childTitre: "شراكات مع القطاع الخاص",href:"/projetsCommune" },
        { id: 3, childTitre: "الجمعيات والمجتمع المدني",href:"/projetsCommune" },
      ],
    },
  ],
};
