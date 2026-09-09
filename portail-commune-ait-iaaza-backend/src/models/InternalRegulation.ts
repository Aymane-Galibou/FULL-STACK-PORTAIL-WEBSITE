import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import { sequelize } from "../config/database.ts"; 
import type { LocalizedField } from "../interfaces/LocalizedField.ts";



// Interface décrivant toutes les propriétés du modèle
export interface InternalRegulationAttributes {
  id: number;
  title: LocalizedField;
  adoptionDate: Date | string;
  mandatePeriod: string;
  pdfUrl: string;
  isActive: boolean;
  createdAt?: Date;
}

// Interface pour la création (champs optionnels lors de l'insertion)
export type InternalRegulationCreationAttributes = Optional<
  InternalRegulationAttributes,
  "id" | "isActive" | "createdAt"
>;

// Définition de la classe du modèle
export class InternalRegulation
  extends Model<InternalRegulationAttributes, InternalRegulationCreationAttributes>
  implements InternalRegulationAttributes
{
  declare id: number;
  declare title: LocalizedField;
  declare adoptionDate: Date | string;
  declare mandatePeriod: string;
  declare pdfUrl: string;
  declare isActive: boolean;

  declare readonly createdAt: Date;
}

// Initialisation du schéma dans Sequelize
InternalRegulation.init(
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
    adoptionDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "adoption_date",
    },
    mandatePeriod: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "mandate_period",
    },
    pdfUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "pdf_url",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "is_active",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
  },
  {
    sequelize,
    tableName: "internal_regulations",
    timestamps: false, 
  }
);

export default InternalRegulation;