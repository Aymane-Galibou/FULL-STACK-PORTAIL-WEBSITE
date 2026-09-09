import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/database.ts"; 
import type { LocalizedField } from "../interfaces/LocalizedField.ts";



// Structure pour les pièces jointes
export interface AttachmentItem {
  title: LocalizedField;
  url: string;
}

// Interface décrivant toutes les propriétés du modèle
export interface ProjectAttributes {
  id: number;
  title: LocalizedField;
  description: LocalizedField;
  category: LocalizedField;
  status: LocalizedField;
  startDate?: LocalizedField | null;
  completionDate?: LocalizedField | null;
  budget?: LocalizedField | null;
  locationZone?: LocalizedField | null;
  partners?: LocalizedField | null;
  progressPercentage: number;
  mainImage: string;
  galleryImages: string[];
  attachments: AttachmentItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface pour la création (champs optionnels lors de l'insertion)
export type ProjectCreationAttributes = Optional<
  ProjectAttributes,
  | "id"
  | "startDate"
  | "completionDate"
  | "budget"
  | "locationZone"
  | "partners"
  | "progressPercentage"
  | "galleryImages"
  | "attachments"
  | "createdAt"
  | "updatedAt"
>;

// Définition de la classe du modèle
export class Project
  extends Model<ProjectAttributes, ProjectCreationAttributes>
  implements ProjectAttributes
{
  declare id: number;
  declare title: LocalizedField;
  declare description: LocalizedField;
  declare category: LocalizedField;
  declare status: LocalizedField;
  declare startDate: LocalizedField | null;
  declare completionDate: LocalizedField | null;
  declare budget: LocalizedField | null;
  declare locationZone: LocalizedField | null;
  declare partners: LocalizedField | null;
  declare progressPercentage: number;
  declare mainImage: string;
  declare galleryImages: string[];
  declare attachments: AttachmentItem[];

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

// Initialisation du schéma dans Sequelize
Project.init(
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
    description: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    category: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    status: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.JSONB,
      allowNull: true,
      field: "start_date",
    },
    completionDate: {
      type: DataTypes.JSONB,
      allowNull: true,
      field: "completion_date",
    },
    budget: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    locationZone: {
      type: DataTypes.JSONB,
      allowNull: true,
      field: "location_zone",
    },
    partners: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    progressPercentage: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "progress_percentage",
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
    tableName: "projects",
    timestamps: true,
    underscored: true,
  }
);

export default Project;