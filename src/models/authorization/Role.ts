import { DataTypes, Model } from "sequelize";
import sequelize from "../../database/connection";
import { RoleUser } from "./RoleUser";

export class Role extends Model {
  public id!: number;
  public name!: string;
  public is_active!: "ACTIVE" | "INACTIVE";
}

export interface RoleI {
    id?: number;
    name: string;
    is_active: "ACTIVE" | "INACTIVE";
  }

Role.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_active: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    }
  },
  {
    tableName: "roles",
    sequelize,
    timestamps: false
  }
);
