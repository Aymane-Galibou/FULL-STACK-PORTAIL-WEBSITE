import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import { sequelize } from "../config/database.ts"; // Ajustez le chemin vers votre instance Sequelize
import type { LocalizedField } from "../interfaces/LocalizedField.ts";



// Interface décrivant toutes les propriétés du modèle
export interface CouncilMemberAttributes {
  id: number;
  fullName: LocalizedField;
  role: LocalizedField;
  politicalParty?: LocalizedField | null;
  photoUrl?: string | null;
  isBureauMember: boolean;
  bureauOrder: number;
  createdAt?: Date;
}

// Interface for optional field 
export type CouncilMemberCreationAttributes = Optional<
  CouncilMemberAttributes,
  | "id"
  | "politicalParty"
  | "photoUrl"
  | "isBureauMember"
  | "bureauOrder"
  | "createdAt"
>;

// definition of class model 
export class CouncilMember
  extends Model<CouncilMemberAttributes, CouncilMemberCreationAttributes>
  implements CouncilMemberAttributes
{
  declare id: number;
  declare fullName: LocalizedField;
  declare role: LocalizedField;
  declare politicalParty: LocalizedField | null;
  declare photoUrl: string | null;
  declare isBureauMember: boolean;
  declare bureauOrder: number;

  declare readonly createdAt: Date;
}

// initializing sequelize class 
CouncilMember.init(
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
    role: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    politicalParty: {
      type: DataTypes.JSONB,
      allowNull: true,
      field: "political_party",
    },
    photoUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "photo_url",
    },
    isBureauMember: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "is_bureau_member",
    },
    bureauOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "bureau_order",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
  },
  {
    sequelize,
    tableName: "council_members",
    timestamps: false, // Pas de colonne updated_at dans cette table
  }
);

export default CouncilMember;