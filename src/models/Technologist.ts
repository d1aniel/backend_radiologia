
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/connection";

export interface TechnologistAttrs {
  id?: number;
  nombre: string;
  especialidad: "RX" | "TAC" | "RM";
  telefono: string;
  correo: string;
  status: "ACTIVE" | "INACTIVE";
}


type TechnologistCreationAttrs = Optional<TechnologistAttrs, "id" | "status">;

export class Technologist
  extends Model<TechnologistAttrs, TechnologistCreationAttrs>
  implements TechnologistAttrs
{
  public id!: number;
  public nombre!: string;
  public especialidad!: "RX" | "TAC" | "RM";
  public telefono!: string;
  public correo!: string;
  public status!: "ACTIVE" | "INACTIVE";
}

Technologist.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
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
        len: { args: [7, 20], msg: "Phone must be between 7 and 20 chars" },
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

export default Technologist;
