import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/database.ts"; 
import type { LocalizedField } from "../interfaces/LocalizedField.ts";



// Structure pour les pièces jointes (PDF, etc.)
export interface AttachmentItem {
  title: LocalizedField;
  url: string;
}

// Interface décrivant toutes les propriétés du modèle
export interface PresidentActivityAttributes {
  id: number;
  title: LocalizedField;
  summary: LocalizedField;
  content: LocalizedField;
  activityType: LocalizedField;
  location?: LocalizedField | null;
  eventDate: Date;
  mainImage: string;
  galleryImages: string[];
  attachments: AttachmentItem[];
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface pour la création (champs optionnels lors de l'insertion)
export type PresidentActivityCreationAttributes = Optional<
  PresidentActivityAttributes,
  "id" | "location" | "galleryImages" | "attachments" | "isPublished" | "createdAt" | "updatedAt" | "content"
>;

// Définition de la classe du modèle
export class PresidentActivity
  extends Model<PresidentActivityAttributes, PresidentActivityCreationAttributes>
  implements PresidentActivityAttributes
{
  declare id: number;
  declare title: LocalizedField;
  declare summary: LocalizedField;
  declare content: LocalizedField;
  declare activityType: LocalizedField;
  declare location: LocalizedField | null;
  declare eventDate: Date;
  declare mainImage: string;
  declare galleryImages: string[];
  declare attachments: AttachmentItem[];
  declare isPublished: boolean;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

// Initialisation du schéma dans Sequelize
PresidentActivity.init(
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
    summary: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    content: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    activityType: {
      type: DataTypes.JSONB,
      allowNull: false,
      field: "activity_type",
    },
    location: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "event_date",
    },
    mainImage: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "main_image",
    },
    galleryImages: {
      type: DataTypes.JSONB,
      defaultValue: [],
      field: "gallery_images",
    },
    attachments: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "is_published",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "updated_at",
    },
  },
  {
    sequelize,
    tableName: "president_activities",
    timestamps: true, // Sequelize gère automatiquement created_at et updated_at
    underscored: true, // Transforme automatiquement camelCase -> snake_case pour les timestamps
  }
);

export default PresidentActivity;