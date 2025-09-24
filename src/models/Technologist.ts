import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface TechnologistI {
  id?: number;
  nombre: string;
  especialidad: "RX" | "TAC" | "RM";
  telefono: number;
  correo: string;
  status: "ACTIVE" | "INACTIVE";
}

export class Technologist extends Model {
  public id!: number;
  public nombre!: string;
  public especialidad!: "RX" | "TAC" | "RM";
  public telefono!: number;
  public correo!: string;
  public status!: "ACTIVE" | "INACTIVE";
}

Technologist.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    especialidad: {
      type: DataTypes.ENUM("RX", "TAC", "RM"),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Phone cannot be empty" },
        len: { args: [7, 15], msg: "Phone must be between 7 and 15 digits" },
      },
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Invalid email format" },
      },
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Technologist",
    tableName: "technologists",
    timestamps: false,
  }
);
