-- Extension pour la génération d'identifiants uniques si nécessaire
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

### 1. NAVIGATION & MENU DE NAVIGATION
CREATE TABLE navigation_items (
    id SERIAL PRIMARY KEY,
    parent_id INT REFERENCES navigation_items(id) ON DELETE CASCADE,
    title JSONB NOT NULL,       -- Example: {"FR": "La Commune", "AR": "الجماعة"}
    href VARCHAR(255) NOT NULL, -- Endpoint URL
    position INT DEFAULT 0,     -- Ordre d'affichage
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

### 2. MOT DU PRÉSIDENT ET INFOS PRÉSIDENTIELLES
CREATE TABLE president_profile (
    id SERIAL PRIMARY KEY,
    full_name JSONB NOT NULL,   -- {"FR": "Monsieur Brahim Labaali", "AR": "السيد ابراهيم الباعلي"}
    message JSONB NOT NULL,     -- Textes du mot du président en FR et AR
    photo_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

### 3. ACTIVITÉS PRÉSIDENTIELLES
CREATE TABLE president_activities (
    id SERIAL PRIMARY KEY,

    -- Titre, résumé court et contenu long multilingues (JSONB)
    title JSONB NOT NULL,
    summary JSONB NOT NULL,
    content JSONB NOT NULL,
    
    -- Classification et détails
    activity_type JSONB NOT NULL,
    location JSONB,                         
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    
    -- Médias
    main_image VARCHAR(255) NOT NULL,       -- Image principale de couverture
    gallery_images JSONB DEFAULT '[]'::jsonb, -- Liste d'images : ["/img1.jpg", "/img2.jpg"]
    attachments JSONB DEFAULT '[]'::jsonb,   -- Documents PDF joints : [{"title":{"FR":"...","AR":"..."}, "url":"..."}]
    
    -- Gestion éditoriale
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index pour accélérer les recherches par slug et par date
CREATE INDEX idx_president_activities_date ON president_activities(event_date DESC);

### 4. VISION ET AXES STRATÉGIQUES (PLAN D'ACTION , optionel a inserer dans la DB car sont statique)
CREATE TABLE visions (
    id SERIAL PRIMARY KEY,
    title JSONB NOT NULL,
    description JSONB NOT NULL,
    icon_name VARCHAR(50) NOT NULL, -- Ex: 'Landmark', 'TreePine', etc.
    position INT DEFAULT 0
);

### 5. PROJETS COMMUNAUX
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title JSONB NOT NULL,
    description JSONB NOT NULL,
    category JSONB NOT NULL,
    status JSONB NOT NULL,
    
    -- Dates & Métadonnées
    start_date JSONB,                     -- ex: {"FR": "Janvier 2024", "AR": "يناير 2024"}
    completion_date JSONB,                -- ex: {"FR": "4ème trimestre 2026", "AR": "الربع الرابع 2026"}
    budget JSONB,
    location_zone JSONB,
    partners JSONB,
    progress_percentage INT DEFAULT 0,
    
    -- Médias & Documents
    main_image VARCHAR(255) NOT NULL,
    gallery_images JSONB DEFAULT '[]'::jsonb,
    attachments JSONB DEFAULT '[]'::jsonb,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)

## 6. CATÉGORIES ET DÉTAILS DES PROCÉDURES ADMINISTRATIVES (optionel)
CREATE TABLE procedure_items (
    -- Clé primaire unique utilisée pour les routes (ex: /etat-civil/101)
    id SERIAL PRIMARY KEY,
    
    -- Rattachement à la catégorie statique frontend ('etat-civil', 'urbanisme', etc.)
    category_slug VARCHAR(50) NOT NULL,
    
    -- Textes bilingues : {"FR": "...", "AR": "..."}
    title JSONB NOT NULL,
    description JSONB NOT NULL,
    
    -- Détails de la démarche bilingues
    requirements JSONB,      -- ex: {"FR": ["Carte d'identité", "Justificatif"], "AR": ["بطاقة الهوية", ...]}
    processing_time JSONB,   -- ex: {"FR": "24 heures", "AR": "24 ساعة"}
    fees JSONB,              -- ex: {"FR": "Gratuit", "AR": "مجاني"} (Optionnel)
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index pour optimiser les requêtes d'affichage d'une catégorie
CREATE INDEX idx_procedure_items_category ON procedure_items(category_slug);

## 7. CONSEIL COMMUNAL (MEMBRES ET DÉCISIONS - MANQUANT DANS LE CODE DE DÉPART)
CREATE TABLE council_members (
    id SERIAL PRIMARY KEY,
    full_name JSONB NOT NULL,                -- {"FR": "Nom Prénom", "AR": "الاسم الكامل"}
    role JSONB NOT NULL,                     -- {"FR": "Président", "AR": "الرئيس"}
    political_party JSONB,                   -- {"FR": "RNI", "AR": "التجمع الوطني للأحرار"}
    photo_url VARCHAR(255),
    is_bureau_member BOOLEAN DEFAULT FALSE,  -- TRUE = Affiché dans le bureau, FALSE = Conseil uniquement
    bureau_order INT DEFAULT 0,              -- Ordre dans le bureau (1=Président, 2=1er VP...)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_bureau_members ON council_members(is_bureau_member, bureau_order);

## 8. les rapports des sessions 
CREATE TABLE session_reports (
    id SERIAL PRIMARY KEY,
    title JSONB NOT NULL,                -- {"FR": "Session Ordinaire d'Octobre 2025", "AR": "الدورة العادية لشهر أكتوبر 2025"}
    session_type VARCHAR(20) NOT NULL,   -- 'ORDINARY' ou 'EXTRAORDINARY'
    session_date DATE NOT NULL,          -- Date de la session
    year INT NOT NULL,                   -- Année (ex: 2025)
    thumbnail_url VARCHAR(255),          -- Miniature de la session / couverture
    pdf_url VARCHAR(255) NOT NULL,       -- Fichier PDF à télécharger
    summary JSONB,                       -- Ordre du jour / Résumé
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sessions_year ON session_reports(year DESC);

## 9 . le reglement interieur du conseil 
CREATE TABLE internal_regulations (
    id SERIAL PRIMARY KEY,
    title JSONB NOT NULL,                -- Ex: {"FR": "Règlement Intérieur du Conseil", "AR": "النظام الداخلي للمجلس"}
    adoption_date DATE NOT NULL,         -- Date d'adoption en session
    mandate_period VARCHAR(50) NOT NULL, -- Ex: '2021-2027'
    pdf_url VARCHAR(255) NOT NULL,       -- Fichier PDF téléversé par l'administrateur
    is_active BOOLEAN DEFAULT TRUE,      -- Permet de définir la version actuellement en vigueur
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

## 10 le plan d'action communale 
CREATE TABLE pac_info (
    id SERIAL PRIMARY KEY,
    title JSONB NOT NULL,             
    subtitle JSONB,                     
    mandate_years VARCHAR(50) NOT NULL, 
    pdf_file_url VARCHAR(255) NOT NULL, 
    vision_text JSONB,                  
    is_active BOOLEAN DEFAULT TRUE,     
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

##  11. RÉCLAMATIONS CITOYENNES (MANQUANT DANS LE CODE DE DÉPART)
CREATE TABLE citizen_complaints (
    id SERIAL PRIMARY KEY,
    ticket_number VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    subject VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(30) DEFAULT 'PENDING', -- PENDING, IN_PROGRESS, RESOLVED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


## downloading a file 
import { Router, type Request, type Response } from "express";
import path from "path";
import fs from "fs";

export const downloadsRouter = Router();

downloadsRouter.get("/download", (req: Request, res: Response) => {
  const filePath = req.query.file as string;

  if (!filePath) {
    return res.status(400).json({ ok: false, message: "File path required" });
  }

  // Resolve file path safely within uploads folder
  const absolutePath = path.join(__dirname, "../../uploads", path.basename(filePath));

console.log(absolutePath)

  // Verify file existence
  if (!fs.existsSync(absolutePath)) {
    return res.status(404).json({ ok: false, message: "File not found" });
  }

  // Force browser to download the file directly
  return res.download(absolutePath, (err) => {
    if (err && !res.headersSent) {
      return res.status(500).json({ ok: false, message: "Download failed" });
    }
  });
});