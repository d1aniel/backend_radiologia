// models/patient.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../database/connection"; // si exportas default desde connection
// import { sequelize } from "../database/db"; // alternativa si usas named export

// Importa el modelo Study para declarar las asociaciones
import { Study } from "./Studie";

export interface PatientI {
  id?: number;
  nombre: string;
  apellido: string;
  tpdocumento: string;
  sexo?: string;
  documento: number;
  telefono: number | string;
  eps: string;
  correo: string;
  status: "ACTIVATE" | "INACTIVE";
}

export class Patient extends Model<PatientI> implements PatientI {
  public id!: number;
  public nombre!: string;
  public apellido!: string;
  public tpdocumento!: string;
  public sexo?: string;
  public documento!: number;
  public telefono!: number | string;
  public eps!: string;
  public correo!: string;
  public status!: "ACTIVATE" | "INACTIVE";
}

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

Patient.hasMany(Study, {
  foreignKey: "patient_id",
  sourceKey: "id",
});

Study.belongsTo(Patient, {
  foreignKey: "patient_id",
  targetKey: "id",
});
