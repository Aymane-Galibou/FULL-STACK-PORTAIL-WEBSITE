import { DataTypes, Model,type Optional } from "sequelize";
import { sequelize } from "../config/database.ts"; // Ajustez le chemin vers votre instance Sequelize
import type { LocalizedField } from "../interfaces/LocalizedField.ts";



// Structure des champs bilingues listes de chaînes (ex: requirements)
export interface LocalizedListField {
  FR: string[];
  AR: string[];
}

// Interface décrivant toutes les propriétés du modèle
export interface ProcedureItemAttributes {
  id: number;
  categorySlug: string;
  title: LocalizedField;
  description: LocalizedField;
  requirements?: LocalizedListField | null;
  processingTime?: LocalizedField | null;
  fees?: LocalizedField | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface pour la création (champs optionnels lors de l'insertion)
export type ProcedureItemCreationAttributes = Optional<
  ProcedureItemAttributes,
  | "id"
  | "requirements"
  | "processingTime"
  | "fees"
  | "createdAt"
  | "updatedAt"
>;

// Définition de la classe du modèle
export class ProcedureItem
  extends Model<ProcedureItemAttributes, ProcedureItemCreationAttributes>
  implements ProcedureItemAttributes
{
  declare id: number;
  declare categorySlug: string;
  declare title: LocalizedField;
  declare description: LocalizedField;
  declare requirements: LocalizedListField | null;
  declare processingTime: LocalizedField | null;
  declare fees: LocalizedField | null;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

// Initialisation du schéma dans Sequelize
ProcedureItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    categorySlug: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "category_slug",
    },
    title: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    description: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    requirements: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    processingTime: {
      type: DataTypes.JSONB,
      allowNull: true,
      field: "processing_time",
    },
    fees: {
      type: DataTypes.JSONB,
      allowNull: true,
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
    tableName: "procedure_items",
    timestamps: true,
    underscored: true,
  }
);

export default ProcedureItem;