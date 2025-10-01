import { DataTypes, Model } from "sequelize";
import sequelize from "../database/connection";
import { Study } from "./Studie"; // asegúrate que el archivo se llame Study.ts (o ajusta)

/**
 * Modelo Patient (estilo profe)
 */
export interface PatientI {
  id?: number;
  nombre: string;
  apellido: string;
  tpdocumento: string;
  sexo?: string;
  documento: number;
  telefono: string | number;
  eps: string;
  correo: string;
  status: "ACTIVATE" | "INACTIVE";
}

export class Patient extends Model implements PatientI {
  public id!: number;
  public nombre!: string;
  public apellido!: string;
  public tpdocumento!: string;
  public sexo?: string;
  public documento!: number;
  public telefono!: string | number;
  public eps!: string;
  public correo!: string;
  public status!: "ACTIVATE" | "INACTIVE";
}

Patient.init(
  {
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

/**
 * Relaciones (igual estilo profe)
 * - Un paciente tiene muchos estudios
 * - Un estudio pertenece a un paciente
 *
 * IMPORTANTE: importa Patient y Study desde models/index.ts para evitar undefined
 */
Patient.hasMany(Study, {
  foreignKey: "patient_id",
  sourceKey: "id",
});

Study.belongsTo(Patient, {
  foreignKey: "patient_id",
  targetKey: "id",
});
