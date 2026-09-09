import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/database.ts";
import type { LocalizedField } from "../interfaces/LocalizedField.ts";



// Interface décrivant toutes les propriétés du modèle
export interface PresidentProfileAttributes {
  id: number;
  fullName: LocalizedField;
  message: LocalizedField;
  photoUrl?: string | null;
  isActive: boolean;
  updatedAt?: Date;
}

// Interface pour la création (id et valeurs par défaut optionnels)
export type PresidentProfileCreationAttributes = Optional<
  PresidentProfileAttributes,
  "id" | "photoUrl" | "isActive" | "updatedAt"
>;

// Définition de la classe du modèle
export class PresidentProfile
  extends Model<PresidentProfileAttributes, PresidentProfileCreationAttributes>
  implements PresidentProfileAttributes
{
  declare id: number;
  declare fullName: LocalizedField;
  declare message: LocalizedField;
  declare photoUrl: string | null;
  declare isActive: boolean;

  declare readonly updatedAt: Date;
}

// Initialisation du schéma dans Sequelize
PresidentProfile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.JSONB,
      allowNull: false,
      field: "full_name",
    },
    message: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    photoUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "photo_url",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "is_active",
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "updated_at",
    },
  },
  {
    sequelize,
    tableName: "president_profile",
    timestamps: false, // On gère uniquement updated_at comme dans le DDL
  }
);

export default PresidentProfile;