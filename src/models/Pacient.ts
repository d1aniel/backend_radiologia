import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

// Interfaz para tipar en TypeScript
export interface PatientI {
  id?: number;
  nombre: string;
  apellido: string;
  tpdocumento: string;
  sexo?: string;
  documento: number;
  telefono: number;
  eps: string;
  correo: string;
  status: "ACTIVATE" | "INACTIVE";
}

// Clase que representa la tabla
export class Patient extends Model<PatientI> implements PatientI {
  public id!: number;
  public nombre!: string;
  public apellido!: string;
  public tpdocumento!: string;
  public sexo?: string;
  public documento!: number;
  public telefono!: number;
  public eps!: string;
  public correo!: string;
  public status!: "ACTIVATE" | "INACTIVE";
}

// Inicializamos el modelo
Patient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre no puede estar vacío" },
      },
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "El apellido no puede estar vacío" },
      },
    },
    tpdocumento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sexo: {
      type: DataTypes.ENUM("M", "F", "O"),
      allowNull: true,
    },
    documento: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "El documento no puede estar vacío" },
      },
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [7, 15],
          msg: "El teléfono debe tener entre 7 y 15 dígitos",
        },
      },
    },
    eps: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Debe ser un correo válido" },
      },
    },
    status: {
      type: DataTypes.ENUM("ACTIVATE", "INACTIVE"),
      defaultValue: "ACTIVATE",
    },
  },
  {
    sequelize,
    modelName: "Patient",
    tableName: "patients",
    timestamps: false,
  }
);
