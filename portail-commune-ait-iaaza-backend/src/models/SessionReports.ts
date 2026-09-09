import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import { sequelize } from "../config/database.ts"; 
import type { LocalizedField } from "../interfaces/LocalizedField.ts";


// Type énuméré pour les types de session
export type SessionType = "ORDINARY" | "EXTRAORDINARY";

// Interface décrivant toutes les propriétés du modèle
export interface SessionReportAttributes {
  id: number;
  title: LocalizedField;
  sessionType: SessionType;
  sessionDate: Date | string;
  year: number;
  thumbnailUrl?: string | null;
  pdfUrl: string;
  summary?: LocalizedField | null;
  createdAt?: Date;
}

// Interface pour la création (champs optionnels lors de l'insertion)
export type SessionReportCreationAttributes = Optional<
  SessionReportAttributes,
  "id" | "thumbnailUrl" | "summary" | "createdAt"
>;

// Définition de la classe du modèle
export class SessionReport
  extends Model<SessionReportAttributes, SessionReportCreationAttributes>
  implements SessionReportAttributes
{
  declare id: number;
  declare title: LocalizedField;
  declare sessionType: SessionType;
  declare sessionDate: Date | string;
  declare year: number;
  declare thumbnailUrl: string | null;
  declare pdfUrl: string;
  declare summary: LocalizedField | null;

  declare readonly createdAt: Date;
}

// Initialisation du schéma dans Sequelize
SessionReport.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    sessionType: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: "session_type",
    },
    sessionDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "session_date",
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    thumbnailUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "thumbnail_url",
    },
    pdfUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "pdf_url",
    },
    summary: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
  },
  {
    sequelize,
    tableName: "session_reports",
    timestamps: false, // Pas de colonne updated_at
  }
);

export default SessionReport;