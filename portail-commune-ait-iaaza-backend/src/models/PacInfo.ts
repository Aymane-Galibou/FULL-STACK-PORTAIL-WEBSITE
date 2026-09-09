import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.ts"; 
import type { LocalizedField } from "../interfaces/LocalizedField.ts";

interface PacInfoAttribute {
  id: number;
  title: LocalizedField;
  subtitle: LocalizedField;
  mandateYears: string;
  pdfFileUrl: string;
  visionText: LocalizedField;
  isActive: boolean;
}

export class PacInfo extends Model implements PacInfoAttribute {
  declare id: number;
  declare title: LocalizedField;
  declare subtitle: LocalizedField;
  declare mandateYears: string;
  declare pdfFileUrl: string;
  declare visionText: LocalizedField;
  declare isActive: boolean;
}

PacInfo.init(
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
    subtitle: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    mandateYears: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "mandate_years", // Optionnel : si le champ est aussi mandate_years en BDD
    },
    pdfFileUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "pdf_file_url", // Mappe le champ BDD "pdf_file_url" vers "pdfFileUrl" en TypeScript
    },
    visionText: {
      type: DataTypes.JSONB,
      allowNull: true,
      field: "vision_text", // Optionnel : si le champ est vision_text en BDD
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "is_active", // Optionnel : si le champ est is_active en BDD
    },
  },
  {
    sequelize,
    tableName: "pac_info",
    timestamps: true,
    underscored: true, // Convertit automatiquement les noms de colonnes et timestamps en snake_case
  }
);