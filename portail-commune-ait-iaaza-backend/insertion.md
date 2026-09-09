## Le mot du President

INSERT INTO president_profile (
full_name,
message,
photo_url,
is_active
) VALUES (
-- full_name (JSONB)
'{
"AR": "السيد ابراهيم الباعلي",
"FR": "Monsieur Brahim Labaali"
}'::jsonb,

    -- message (JSONB)
    '{
        "AR": "بصفتي رئيساً لمجلس جماعة أيت إيعزة، يسعدني أن أرحب بكم في هذا الفضاء الرقمي المتجدد، الذي نعتبره جسراً للتواصل المباشر والفعال معكم. إن التزامنا تجاهكم يتجاوز مجرد تقديم الخدمات؛ بل هو عهد بالعمل المستمر من أجل تنمية شاملة ومستدامة تليق بتطلعات ساكنة منطقتنا الغالية. نهدف من خلال هذه المنصة إلى تكريس مبادئ الحكامة الجيدة والشفافية، وتقريب الإدارة من المرتفقين عبر رقمنة الخدمات وتسهيل الولوج إلى المعلومة. نحن نؤمن بأن بناء المستقبل يتطلب إصغاءً دائماً لمقترحاتكم وانشغالاتكم، لذا نجعل من الابتكار والتميز في الأداء الحكومي وسيلتنا لتحقيق رفاهيتكم وتطوير مدينتنا.",
        "FR": "En tant que Président du Conseil de la Commune d''Aït Iazza, je suis ravi de vous accueillir sur cette nouvelle plateforme numérique, conçue comme un véritable pont de communication directe et efficace avec vous. Notre engagement envers les citoyens dépasse la simple prestation de services ; c''est une promesse de travail acharné pour un développement global et durable à la hauteur des aspirations de notre chère population. À travers cet espace, nous visons à consacrer les principes de bonne gouvernance et de transparence, tout en rapprochant l''administration des usagers grâce à la digitalisation et la simplification de l''accès à l''information. Nous sommes convaincus que bâtir l''avenir nécessite une écoute constante de vos propositions. C''est pourquoi l''innovation et l''excellence de l''action publique restent nos priorités pour garantir votre bien-être et le rayonnement de notre commune."
    }'::jsonb,

    -- Optional fields
    '/uploads/images/p0.jpg',
    TRUE

);

## les activites du president
INSERT INTO
  president_activities (
    title,
    summary,
    content,
    activity_type,
    location,
    event_date,
    main_image,
    gallery_images,
    attachments,
    is_published,
    created_at,
    updated_at
  )
VALUES
  -- Activité 1
  (
    '{"FR": "Réunion de coordination sur la gestion de l''eau", "AR": "اجتماع تنسيقي حول تدبير الموارد المائية"}'::JSONB,
    '{"FR": "Le Président a présidé une séance de travail avec les services techniques pour optimiser la consommation d''eau dans la commune.", "AR": "ترأس السيد الرئيس جلسة عمل مع المصالح التقنية لترشيد استهلاك الماء بالجماعة."}'::JSONB,
    '{"FR": "Dans le cadre de la rationalisation des ressources en eau, le Président s''est réuni avec l''équipe technique pour examiner les mesures d''urgence à adopter et optimiser l''irrigation des espaces verts.", "AR": "في إطار ترشيد استعمال الموارد المائية، عقد السيد الرئيس اجتماعاً مع الفريق التقني لمناقشة التدابير المستعجلة لترشيد الاستهلاك وعقلنة سقي المساحات الخضراء."}'::JSONB,
    '{"FR": "Réunion", "AR": "اجتماع"}'::JSONB,
    '{"FR": "Siège de la Commune", "AR": "مقر الجماعة"}'::JSONB,
    '2026-02-12 10:00:00+00',
    '/uploads/activities/v1.jpeg',
    '[]'::JSONB,
    '[]'::JSONB,
    TRUE,
    NOW(),
    NOW()
  ),
  -- Activité 2
  (
    '{"FR": "Visite de terrain : Chantier de la Place Centrale", "AR": "زيارة ميدانية: ورش الساحة المركزية"}'::JSONB,
    '{"FR": "Suivi de l''état d''avancement des travaux d''aménagement pour garantir le respect des délais.", "AR": "متابعة حالة تقدم أشغال التهيئة لضمان احترام الآجال المحددة."}'::JSONB,
    '{"FR": "Une visite de terrain a été effectuée par le Président afin d''inspecter les travaux de réaménagement de la Place Centrale, d''évaluer la qualité des infrastructures et d''insister sur le respect des délais d''exécution.", "AR": "قام السيد الرئيس بزيارة ميدانية لتفقد أشغال إعادة تهيئة الساحة المركزية، والوقوف على جودة التجهيزات مع التأكيد على ضرورة الالتزام بالآجال المحددة للتسليم."}'::JSONB,
    '{"FR": "Visite", "AR": "زيارة ميدانية"}'::JSONB,
    '{"FR": "Place Centrale - Aït Iazza", "AR": "الساحة المركزية - أيت إيعزة"}'::JSONB,
    '2026-02-08 11:30:00+00',
    '/uploads/activities/v2.jpeg',
    '[]'::JSONB,
    '[]'::JSONB,
    TRUE,
    NOW(),
    NOW()
  ),
  -- Activité 3
  (
    '{"FR": "Réception d''une délégation d''investisseurs", "AR": "استقبال وفد من المستثمرين"}'::JSONB,
    '{"FR": "Échanges sur les opportunités économiques d''Aït Iazza et présentation des facilités accordées aux entreprises.", "AR": "تبادل الآراء حول الفرص الاقتصادية بأيت إيعزة وعرض التسهيلات الممنوحة للمقاولات."}'::JSONB,
    '{"FR": "Le Président a reçu une délégation d''investisseurs pour présenter le potentiel économique et industriel de la commune d''Aït Iazza, ainsi que les incitations mises en place pour encourager la création d''emplois locaux.", "AR": "استقبل السيد الرئيس وفداً من المستثمرين لبحث الإمكانيات الاقتصادية والصناعية التي تزخر بها جماعة أيت إيعزة، واستعراض التسهيلات المتاحة لتشجيع الاستثمار وخلق فرص الشغل."}'::JSONB,
    '{"FR": "Réception", "AR": "استقبال"}'::JSONB,
    '{"FR": "Salle des réunions - Commune d''Aït Iazza", "AR": "قاعة الاجتماعات - جماعة أيت إيعزة"}'::JSONB,
    '2026-02-01 15:00:00+00',
    '/uploads/activities/v3.jpg',
    '[]'::JSONB,
    '[]'::JSONB,
    TRUE,
    NOW(),
    NOW()
  ),
  -- Activité 4
  (
    '{"FR": "Inauguration du nouveau centre culturel municipal", "AR": "تدشين المركز الثقافي الجماعي الجديد"}'::JSONB,
    '{"FR": "Un projet majeur pour promouvoir l''accès à la culture et accompagner la jeunesse locale.", "AR": "مشروع هام لتعزيز الولوج للثقافة ومواكبة الشباب المحلي."}'::JSONB,
    '{"FR": "Le Président de la Commune a présidé ce mardi la cérémonie d''inauguration du nouveau centre culturel.\n\nCe nouvel espace comprend une bibliothèque, une salle de spectacle de 300 places, ainsi que des ateliers dédiés aux arts plastiques et à la musique.", "AR": "ترأس رئيس الجماعة يوم الثلاثاء حفل تدشين المركز الثقافي الجديد.\n\nويدم هذا الفضاء الجديد مكتبة وسائطية، وقاعة للعروض تتسع لـ 300 مقعد، بالإضافة إلى ورشات مخصصة للفنون التشكيلية والموسيقى."}'::JSONB,
    '{"FR": "Inauguration", "AR": "تدشين"}'::JSONB,
    '{"FR": "Quartier Administratif", "AR": "الحي الإداري"}'::JSONB,
    '2026-09-02T10:00:00.000Z',
    '/uploads/activities/main-culture.jpg',
    '["/uploads/activities/gallery-1.jpg", "/uploads/activities/gallery-2.jpg", "/uploads/activities/gallery-3.jpg"]'::JSONB,
    '[
      {
        "title": {"FR": "Programme Général du Centre", "AR": "البرنامج العام للمركز"},
        "url": "/uploads/documents/programme.pdf"
      },
      {
        "title": {"FR": "Règlement Intérieur de la Bibliothèque", "AR": "القانون الداخلي للمكتبة"},
        "url": "/uploads/documents/reglement.pdf"
      }
    ]'::JSONB,
    TRUE,
    NOW(),
    NOW()
  );

## les projets communales
INSERT INTO projects (
  title,
  description,
  category,
  status,
  start_date,
  completion_date,
  budget,
  location_zone,
  partners,
  progress_percentage,
  main_image,
  gallery_images,
  attachments,
  created_at,
  updated_at
) VALUES
-- Projet 1: Place Centrale
(
  '{"FR": "Aménagement de la Place Centrale", "AR": "تهيئة الساحة المركزية"}'::jsonb,
  '{"FR": "Projet de modernisation urbaine incluant de nouveaux espaces verts et zones piétonnes.", "AR": "مشروع تحديث حضري يشمل مساحات خضراء جديدة ومناطق مخصصة للمشاة."}'::jsonb,
  '{"FR": "Infrastructure", "AR": "البنية التحتية"}'::jsonb,
  '{"FR": "En cours", "AR": "في طور الإنجاز"}'::jsonb,
  '{"FR": "Janvier 2025", "AR": "يناير 2025"}'::jsonb,
  '{"FR": "4ème trimestre 2026", "AR": "الربع الرابع 2026"}'::jsonb,
  '{"FR": "85 MDH", "AR": "85 مليون درهم"}'::jsonb,
  '{"FR": "Centre Ville", "AR": "وسط المدينة"}'::jsonb,
  '{"FR": "Ministère de l''Intérieur, Conseil Régional, Commune d''Aït Iazza", "AR": "وزارة الداخلية، مجلس الجهة، جماعة أيت إيعزة"}'::jsonb,
  65,
  '/uploads/projets/p1.jpg',
  '["/uploads/projets/p1_1.jpg", "/uploads/projets/p1_2.jpg"]'::jsonb,
  '[]'::jsonb,
  NOW(),
  NOW()
),

-- Projet 2: Rénovation Éclairage Public
(
  '{"FR": "Rénovation de l''Éclairage Public", "AR": "تجديد الإنارة العمومية"}'::jsonb,
  '{"FR": "Installation de luminaires LED basse consommation sur l''ensemble du boulevard principal.", "AR": "تركيب مصابيح LED اقتصادية على طول الشارع الرئيسي للمدينة."}'::jsonb,
  '{"FR": "Énergie", "AR": "الطاقة"}'::jsonb,
  '{"FR": "Terminé", "AR": "مكتمل"}'::jsonb,
  '{"FR": "Mars 2024", "AR": "مارس 2024"}'::jsonb,
  '{"FR": "Février 2025", "AR": "فبراير 2025"}'::jsonb,
  '{"FR": "12 MDH", "AR": "12 مليون درهم"}'::jsonb,
  '{"FR": "Ensemble des quartiers", "AR": "مختلف الأحياء"}'::jsonb,
  '{"FR": "Agence Nationale pour l''Efficacité Énergétique (AMEE)", "AR": "الوكالة الوطنية للنجاعة الطاقية"}'::jsonb,
  100,
  '/uploads/projets/p2.jpg',
  '[]'::jsonb,
  '[]'::jsonb,
  NOW(),
  NOW()
),

-- Projet 3: Nouveau Complexe Sportif
(
  '{"FR": "Nouveau Complexe Sportif", "AR": "المركب الرياضي الجديد"}'::jsonb,
  '{"FR": "Un espace multisports moderne dédié aux jeunes de la commune et aux clubs locaux.", "AR": "فضاء رياضي متعدد الاختصاصات مخصص لشباب الجماعة والأندية المحلية."}'::jsonb,
  '{"FR": "Sport", "AR": "الرياضة"}'::jsonb,
  '{"FR": "Terminé", "AR": "مكتمل"}'::jsonb,
  '{"FR": "Juin 2024", "AR": "يونيو 2024"}'::jsonb,
  '{"FR": "Mai 2026", "AR": "ماي 2026"}'::jsonb,
  '{"FR": "25 MDH", "AR": "25 مليون درهم"}'::jsonb,
  '{"FR": "Quartier El Amal", "AR": "حي الأمل"}'::jsonb,
  '{"FR": "Ministère de la Jeunesse et des Sports", "AR": "وزارة الشباب والرياضة"}'::jsonb,
  100,
  '/uploads/projets/p5.jpg',
  '[]'::jsonb,
  '[]'::jsonb,
  NOW(),
  NOW()
),

-- Projet 4: Aménagement et goudronnage des routes
(
  '{"FR": "Aménagement et goudronnage des routes", "AR": "تهيئة وتعبيد الطرق"}'::jsonb,
  '{"FR": "Travaux de revêtement et de goudronnage des axes principaux pour améliorer la circulation et le désenclavement des quartiers.", "AR": "أشغال تكسية وتعبيد المحاور الرئيسية لتحسين حركة السير وفك العزلة عن الأحياء."}'::jsonb,
  '{"FR": "Infrastructure", "AR": "البنية التحتية"}'::jsonb,
  '{"FR": "En cours", "AR": "في طور الإنجاز"}'::jsonb,
  '{"FR": "Février 2026", "AR": "فبراير 2026"}'::jsonb,
  '{"FR": "3ème trimestre 2026", "AR": "الربع الثالث 2026"}'::jsonb,
  '{"FR": "40 MDH", "AR": "40 مليون درهم"}'::jsonb,
  '{"FR": "Axes principaux", "AR": "المحاور الرئيسية"}'::jsonb,
  '{"FR": "Ministère de l''Équipement et de l''Eau", "AR": "وزارة التجهيز والماء"}'::jsonb,
  45,
  '/uploads/projets/p4.jpg',
  '[]'::jsonb,
  '[]'::jsonb,
  NOW(),
  NOW()
);

## les procedures administratives detailles
INSERT INTO procedure_items (category_slug, title, description, requirements, processing_time, fees) VALUES

-- 1. ÉTAT CIVIL
('etat-civil',
'{"FR": "Extrait d''acte de naissance", "AR": "نسخة موجزة من رسم الولادة"}'::jsonb,
'{"FR": "Obtention de l''extrait de naissance original pour vos démarches.", "AR": "الحصول على نسخة موجزة من رسم الولادة الأصلي."}'::jsonb,
'{"FR": ["Livret de famille ou ancienne copie de l''acte de naissance", "Carte d''Identité Nationale (CNI) du demandeur"], "AR": ["الدفتر العائلي أو نسخة قديمة من رسم الولادة", "بطاقة التعريف الوطنية للمستفيد"]}'::jsonb,
'{"FR": "Immédiat (Séance tenante)", "AR": "فوري (في نفس الحين)"}'::jsonb,
'{"FR": "Gratuit (ou timbre fiscal selon format)", "AR": "مجاني (أو طابع جبائي حسب الفئة)"}'::jsonb),

('etat-civil',
'{"FR": "Copie intégrale", "AR": "نسخة كاملة من رسم الولادة"}'::jsonb,
'{"FR": "Copie complète contenant toutes les mentions marginales.", "AR": "نسخة كاملة تحتوي على جميع البيانات الهامشية."}'::jsonb,
'{"FR": ["Livret de famille", "Copie de la CNI du concerné ou d''un parent direct"], "AR": ["الدفتر العائلي", "نسخة من بطاقة التعريف الوطنية للمعني أو أحد الأقارب المباشرين"]}'::jsonb,
'{"FR": "24h à 48h", "AR": "24 إلى 48 ساعة"}'::jsonb,
'{"FR": "Gratuit", "AR": "مجاني"}'::jsonb),

('etat-civil',
'{"FR": "Acte de mariage", "AR": "عقد الزواج"}'::jsonb,
'{"FR": "Demande de copie ou d''extrait d''acte de mariage officiel.", "AR": "طلب نسخة أو مستخرج من عقد الزواج الرسمي."}'::jsonb,
'{"FR": ["Copie de la CNI des époux", "Livret de famille ou référence de l''acte au bureau d''état civil"], "AR": ["نسخة من بطاقة التعريف الوطنية للزوجين", "الدفتر العائلي أو مراجع العقد بمكتب الحالة المدنية"]}'::jsonb,
'{"FR": "24h", "AR": "24 ساعة"}'::jsonb,
'{"FR": "Gratuit", "AR": "مجاني"}'::jsonb),

-- 2. URBANISME
('urbanisme',
'{"FR": "Permis de construire", "AR": "رخصة البناء"}'::jsonb,
'{"FR": "Autorisation obligatoire pour toute nouvelle construction.", "AR": "الرخصة الواجبة لكل بناء جديد."}'::jsonb,
'{"FR": ["Demande adressée au Président de la Commune", "Titre de propriété ou attestation de possession", "Plan d''architecte agréé (3 exemplaires)", "Plan de situation de la parcelle"], "AR": ["طلب موجه إلى رئيس المجلس الجماعي", "شهادة الملكية أو وثيقة إثبات الملكية", "تصميم الهندسة المعمارية مصادق عليه (3 نسخ)", "تصميم الموقع"]}'::jsonb,
'{"FR": "15 à 30 jours (via plateforme Rokhas)", "AR": "15 إلى 30 يوماً (عبر منصة رخص)"}'::jsonb,
'{"FR": "Selon la superficie couverte (Taxe sur les opérations de construction)", "AR": "حسب المساحة المغطاة (الرسم على عمليات البناء)"}'::jsonb),

('urbanisme',
'{"FR": "Permis d''habiter", "AR": "رخصة السكن"}'::jsonb,
'{"FR": "Attestation de conformité pour l''occupation d''un bâtiment.", "AR": "شهادة المطابقة لاستغلال البناية."}'::jsonb,
'{"FR": ["Demande de permis d''habiter", "Attestation de fin de travaux délivrée par l''architecte", "Copie du permis de construire initial", "Plans récolement"], "AR": ["طلب الحصول على رخصة السكن", "شهادة انتهاء الأشغال مسلمة من المهندس المعماري", "نسخة من رخصة البناء الأصلية", "التصاميم المطابقة للبناء الإنجازي"]}'::jsonb,
'{"FR": "7 à 15 jours après visite de la commission", "AR": "7 إلى 15 يوماً بعد معاينة اللجنة"}'::jsonb,
'{"FR": "Variable selon la commune", "AR": "متغير حسب الجماعة"}'::jsonb),

-- 3. RACCORDEMENTS
('raccordements',
'{"FR": "Raccordement Eau Potable", "AR": "الربط بشبكة الماء الصالح للشرب"}'::jsonb,
'{"FR": "Demande de branchement au réseau d''eau communal.", "AR": "طلب الربط بشبكة الماء الصالح للشرب."}'::jsonb,
'{"FR": ["Demande de branchement", "Copie de la CNI du propriétaire", "Permis d''habiter ou autorisation de raccordement délivrée par la commune", "Titre de propriété"], "AR": ["طلب الربط بالشبكة", "نسخة من بطاقة التعريف الوطنية للمالك", "رخصة السكن أو إذن بالربط مسلم من الجماعة", "شهادة الملكية"]}'::jsonb,
'{"FR": "7 à 10 jours ouvrés", "AR": "7 إلى 10 أيام عمل"}'::jsonb,
'{"FR": "Selon devis technique de l''opérateur (Régie/ONEE)", "AR": "حسب المقايسة التقنية للمكتب/الوكالة"}'::jsonb),

('raccordements',
'{"FR": "Raccordement Électricité", "AR": "الربط بشبكة الكهرباء"}'::jsonb,
'{"FR": "Demande de branchement au réseau électrique.", "AR": "طلب الربط بشبكة الكهرباء."}'::jsonb,
'{"FR": ["Demande de raccordement électrique", "Permis d''habiter ou attestation communale", "Copie de la CNI", "Attestation de conformité de l''installation interne"], "AR": ["طلب الربط بالشبكة الكهربائية", "رخصة السكن أو شهادة جماعية", "نسخة من بطاقة التعريف الوطنية", "شهادة سلامة التركيبات الداخلية"]}'::jsonb,
'{"FR": "5 à 7 jours ouvrés", "AR": "5 إلى 7 أيام عمل"}'::jsonb,
'{"FR": "Selon la puissance demandée (kVA) et devis", "AR": "حسب القدرة المطلوبة والمقايسة"}'::jsonb),

-- 4. LÉGALISATION
('legalisation',
'{"FR": "Légalisation de signature", "AR": "المصادقة على التوقيع"}'::jsonb,
'{"FR": "Authentification de votre signature sur vos documents.", "AR": "تصديق توقيعكم على الوثائق الخاصة بكم."}'::jsonb,
'{"FR": ["Document original à signer sur place", "Carte d''Identité Nationale (CNI) valide ou Passeport"], "AR": ["الوثيقة الأصلية المراد توقيعها بعين المكان", "بطاقة التعريف الوطنية سارية المفعول أو جواز السفر"]}'::jsonb,
'{"FR": "Immédiat", "AR": "فوري"}'::jsonb,
'{"FR": "2 DH par document (Timbre fiscal)", "AR": "درهمان (2 دراهم) عن كل وثيقة"}'::jsonb),

('legalisation',
'{"FR": "Copie certifiée conforme", "AR": "نسخة مطابقة للأصل"}'::jsonb,
'{"FR": "Certification que la copie est identique à l''original.", "AR": "الإشهاد بأن النسخة مطابقة للأصل."}'::jsonb,
'{"FR": ["Document original", "Photocopies à certifier"], "AR": ["الوثيقة الأصلية", "النسخ الضوئية المراد الإشهاد بمطابقتها"]}'::jsonb,
'{"FR": "Immédiat", "AR": "فوري"}'::jsonb,
'{"FR": "2 DH par copie certifiée", "AR": "درهمان (2 دراهم) عن كل نسخة"}'::jsonb),

-- 5. ASSOCIATIONS
('associations',
'{"FR": "Constitution d''association", "AR": "تأسيس جمعية"}'::jsonb,
'{"FR": "Dépôt légal du dossier pour la création d''une association.", "AR": "الإيداع القانوني لملف تأسيس الجمعية."}'::jsonb,
'{"FR": ["Déclaration de constitution adressée à l''autorité locale", "Statuts de l''association (3 exemplaires)", "Procès-verbal de l''assemblée constituante", "Liste des membres du bureau exécutif avec copies CNI et fiches anthropométriques"], "AR": ["تصريح بالتأسيس موجه للسلطة المحلية", "القانون الأساسي للجمعية (3 نسخ)", "محضر الجمع العام التأسيسي", "لائحة أعضاء المكتب التنفيذي مرفوقة بنسخ بطاقات التعريف والبطاقة العدلية"]}'::jsonb,
'{"FR": "Récépissé provisoire immédiat / Récépissé définitif sous 60 jours", "AR": "وصل مؤقت فوري / وصل نهائي خلال 60 يوماً"}'::jsonb,
'{"FR": "Gratuit", "AR": "مجاني"}'::jsonb),

('associations',
'{"FR": "Demande de subvention", "AR": "طلب الدعم السنوي"}'::jsonb,
'{"FR": "Formulaire de demande d''aide financière annuelle.", "AR": "نموذج طلب المساعدة المالية السنوية."}'::jsonb,
'{"FR": ["Demande de subvention signée par le Président", "Récépissé définitif de l''association", "Rapport moral et financier du dernier exercice", "Programme d''action et budget prévisionnel", "Attestation de RIB bancaire de l''association"], "AR": ["طلب الدعم موقع من طرف رئيس الجمعية", "الوصل النهائي للجمعية", "التقريرين الأدبي والمالي للسنة الفارطة", "برنامج العمل والميزانية التقديرية", "شهادة التعريف البنكي (RIB) باسم الجمعية"]}'::jsonb,
'{"FR": "Selon le calendrier des sessions du Conseil communal", "AR": "حسب جدول دورات المجلس الجماعي"}'::jsonb,
'{"FR": "Gratuit", "AR": "مجاني"}'::jsonb),

-- 6. DOMAINE PUBLIC
('domaine-public',
'{"FR": "Occupation temporaire du domaine public", "AR": "الاحتلال المؤقت للملك العمومي"}'::jsonb,
'{"FR": "Autorisation pour l''installation de terrasses, kiosques ou étalages commerciaux.", "AR": "ترخيص لوضع المواعد، الأكشاك، أو المعروضات التجارية."}'::jsonb,
'{"FR": ["Demande d''autorisation indiquant la surface souhaitée", "Copie du registre de commerce / Patente", "Plan de masse ou croquis de l''emplacement", "Copie de la CNI du demandeur"], "AR": ["طلب الترخيص يبين المساحة المطلوبة", "نسخة من السجل التجاري / الضريبة المهنية (البتانتي)", "تصميم للموقع أو رسم بياني للمساحة المراد شغلها", "نسخة من بطاقة التعريف الوطنية"]}'::jsonb,
'{"FR": "10 à 20 jours après avis de la commission", "AR": "10 إلى 20 يوماً بعد رأي اللجنة"}'::jsonb,
'{"FR": "Redevance trimestrielle calculée au m²", "AR": "إتاوة quarterly تحسب بالفي المتر المربع"}'::jsonb),

('domaine-public',
'{"FR": "Autorisation de travaux sur voie publique", "AR": "رخصة القيام بأشغال على الطريق العامة"}'::jsonb,
'{"FR": "Demande pour effectuer des travaux nécessitant l''occupation de la chaussée ou du trottoir.", "AR": "طلب القيام بأشغال تتطلب احتلال الرصيف أو الطريق العامة."}'::jsonb,
'{"FR": ["Demande détaillée précisant la durée des travaux", "Plan de balisage et de sécurité routière", "Autorisation de construire ou de raccordement associée"], "AR": ["طلب مفصل يحدد مدة الأشغال", "مخطط التشوير والسلامة الطرقية", "رخصة البناء أو الربط المرتبطة بالأشغال"]}'::jsonb,
'{"FR": "5 à 10 jours", "AR": "5 إلى 10 أيام"}'::jsonb,
'{"FR": "Caution de remise en état + redevance d''occupation temporaire", "AR": "ضمانة إعادة الحالة إلى ما كانت عليه + إتاوة الاحتلال"}'::jsonb),

('domaine-public',
'{"FR": "Affichage publicitaire et enseignes", "AR": "اللوحات الإشهارية واللوحات الواجهة"}'::jsonb,
'{"FR": "Autorisation pour l''installation d''enseignes lumineuses ou de panneaux publicitaires.", "AR": "رخصة تثبيت اللوحات الإشهارية أو لوحات واجهة المحلات."}'::jsonb,
'{"FR": ["Demande d''autorisation d''affichage", "Descriptif technique et dimensions du panneau/enseigne", "Photo de la façade et plan d''implantation"], "AR": ["طلب ترخيص اللوحات الإشهارية", "بطاقة تقنية تحدد قياسات ومواصفات اللوحة", "صورة الواجهة وتصميم التثبيت"]}'::jsonb,
'{"FR": "10 à 15 jours", "AR": "10 إلى 15 يوماً"}'::jsonb,
'{"FR": "Taxe annuelle sur les emplacements publicitaires", "AR": "الرسم السنوي على المشروبات واللوحات الإشهارية"}'::jsonb),

('domaine-public',
'{"FR": "Demande de stationnement réservé", "AR": "طلب حجز موقف خاص"}'::jsonb,
'{"FR": "Réservation d''espace pour le chargement, déchargement ou zones de taxis.", "AR": "حجز مساحات للتفريغ، الشحن، أو مواقف سيارات الأجرة."}'::jsonb,
'{"FR": ["Demande motivée adressée à la commune", "Justificatif d''activité commerciale ou de service", "Plan d''aménagement souhaité"], "AR": ["طلب معلل موجه للجماعة", "وثيقة إثبات النشاط التجاري أو الخدماتي", "تصميم التهيئة المطلوبة"]}'::jsonb,
'{"FR": "15 jours", "AR": "15 يوماً"}'::jsonb,
'{"FR": "Redevance annuelle fixée par arrêté fiscal communal", "AR": "إتاوة سنوية محددة بموجب القرار الجبائي الجماعي"}'::jsonb);

## les membres du conseil
INSERT INTO council_members (full_name, role, political_party, photo_url, is_bureau_member, bureau_order) VALUES
-- Membres du Bureau
('{"FR": "Ahmad Mansouri", "AR": "أحمد المنصوري"}'::jsonb, '{"FR": "Président du Conseil", "AR": "رئيس المجلس"}'::jsonb, '{"FR": "RNI", "AR": "التجمع الوطني للأحرار"}'::jsonb, '/members/president.jpg', TRUE, 1),
('{"FR": "Fatima Zohra Alami", "AR": "فاطمة الزهراء العلمي"}'::jsonb, '{"FR": "1ère Vice-Présidente", "AR": "النائبة الأولى للرئيس"}'::jsonb, '{"FR": "PAM", "AR": "الأصالة والمعاصرة"}'::jsonb, '/members/vp1.jpg', TRUE, 2),
('{"FR": "Karim Bennani", "AR": "كريم بناني"}'::jsonb, '{"FR": "2ème Vice-Président", "AR": "النائب الثاني للرئيس"}'::jsonb, '{"FR": "Istiqlal", "AR": "الاستقلال"}'::jsonb, '/members/vp2.jpg', TRUE, 3),
('{"FR": "Omar Chraibi", "AR": "عمر الشرايبي"}'::jsonb, '{"FR": "Secrétaire du Conseil", "AR": "كاتب المجلس"}'::jsonb, '{"FR": "RNI", "AR": "التجمع الوطني للأحرار"}'::jsonb, '/members/secretaire.jpg', TRUE, 4),

-- Membres du Conseil (Hors bureau)
('{"FR": "Rachida Tazi", "AR": "رشيدة التازي"}'::jsonb, '{"FR": "Conseillère Communale", "AR": "مستشارة جماعية"}'::jsonb, '{"FR": "MP", "AR": "الحركة الشعبية"}'::jsonb, '/members/member1.jpg', FALSE, 0),
('{"FR": "Hassan Amrani", "AR": "حسن العمراني"}'::jsonb, '{"FR": "Conseiller Communal", "AR": "مستشار جماعي"}'::jsonb, '{"FR": "USFP", "AR": "الاتحاد الاشتراكي"}'::jsonb, '/members/member2.jpg', FALSE, 0);


## les rapports des sessions 
INSERT INTO session_reports (title, session_type, session_date, year, thumbnail_url, pdf_url, summary) VALUES
(
  '{"FR": "Session Ordinaire d''Octobre 2025 - Validation du Budget", "AR": "الدورة العادية لشهر أكتوبر 2025 - الاعتماد النهائي للميزانية"}'::jsonb,
  'ORDINARY',
  '2025-10-07',
  2025,
  'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&q=80',
  '/documents/raport1.pdf',
  '{"FR": "Examen et vote du budget municipal pour l''année fiscale 2026, ainsi que la révision des axes d''aménagement de la voirie urbaine.", "AR": "دراسة والتصويت على الميزانية الجماعية للسنة المالية 2026، ودراسة برنامج إعادة تهيئة الطرق والمسالك الجماعية."}'::jsonb
),
(
  '{"FR": "Session Extraordinaire de Juillet 2025 - Partenariats Economiques", "AR": "الدورة الاستثنائية لشهر يوليوز 2025 - اتفاقيات الشراكة الاقتصادية"}'::jsonb,
  'EXTRAORDINARY',
  '2025-07-15',
  2025,
  'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&q=80',
  '/documents/raport1.pdf',
  '{"FR": "Approbation de la convention cadre pour la création de la nouvelle zone d''activités artisanales et l''attraction des investissements.", "AR": "المصادقة على اتفاقية الإطار لإحداث منطقة الأنشطة الحرفية الجديدة وجلب الاستثمارات المحلية."}'::jsonb
),
(
  '{"FR": "Session Ordinaire de Mai 2025 - Compte Administratif", "AR": "الدورة العادية لشهر ماي 2025 - الحساب الإداري والخدمات الجماعية"}'::jsonb,
  'ORDINARY',
  '2025-05-06',
  2025,
  'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&q=80',
  '/documents/raport1.pdf',
  '{"FR": "Présentation et examen du compte administratif 2024 et débat sur la gestion des services d''assainissement et d''eau potable.", "AR": "عرض ودراسة الحساب الإداري لسنة 2024 ومناقشة وضعية قطاع النظافة والتزويد بالماء الصالح للشرب."}'::jsonb
),
(
  '{"FR": "Session Ordinaire de Février 2024 - Plan d''Action Communal", "AR": "الدورة العادية لشهر فبراير 2024 - برنامج عمل الجماعة"}'::jsonb,
  'ORDINARY',
  '2024-02-04',
  2024,
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  '/documents/raport1.pdf',
  '{"FR": "Mise à jour du Plan d''Action Communal (PAC) et attribution de subventions aux associations locales et sportives.", "AR": "تحيين برنامج عمل الجماعة وتوزيع الدعم والمنح المخصصة للجمعيات المحلية والرياضية."}'::jsonb
),
(
  '{"FR": "Session Ordinaire d''Octobre 2026 - Aménagement Foncier", "AR": "الدورة العادية لشهر أكتوبر 2026 - التخطيط العمراني"}'::jsonb,
  'ORDINARY',
  '2026-10-10',
  2026,
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80',
  '/documents/raport1.pdf',
  '{"FR": "Validation des plans d''aménagement urbain et négociation des acquisitions foncières pour les espaces publics.", "AR": "المصادقة على مخططات التهيئة العمرانية ودراسة اقتناء العقارات المخصصة للمرافق العمومية."}'::jsonb
);

## le reglement interieur 
INSERT INTO internal_regulations (
  title, 
  adoption_date, 
  mandate_period, 
  pdf_url, 
  is_active
) VALUES (
  '{"FR": "Règlement Intérieur du Conseil Communal", "AR": "النظام الداخلي للمجلس الجماعي"}'::jsonb,
  '2022-02-10',
  '2021 - 2027',
  '/documents/reglement_interieur.pdf',
  TRUE
);
