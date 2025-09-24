import { DataTypes, Model } from "sequelize";
import  sequelize  from "../database/connection";

export interface ModalidadI {
  id?: number;
  nombre: string;
  descripcion: string;
  activa: boolean;
}

export class Modalidad extends Model implements ModalidadI {
  public id!: number;
  public nombre!: string;
  public descripcion!: string;
  public activa!: boolean;
}

Modalidad.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre es obligatorio" },
      },
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "La descripción es obligatoria" },
      },
    },
    activa: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Modalidad",
    tableName: "modalidades",
    timestamps: false,
  }
);
