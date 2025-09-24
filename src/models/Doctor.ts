// src/models/doctor.ts
import { DataTypes, Model, Optional } from "sequelize";
import  sequelize  from "../database/connection";

// Interface base (coincide con tu front)
export interface DoctorI {
  id?: number;
  nombre: string;
  especialidad: string;
  telefono: string;     // mejor string para conservar ceros iniciales y formatos
  correo: string;
  registro?: string | null; // opcional
  status: "ACTIVATE" | "INACTIVE";
}

// Si quieres creación parcial sin id:
type DoctorCreationAttrs = Optional<DoctorI, "id" | "registro">;

export class Doctor extends Model<DoctorI, DoctorCreationAttrs> implements DoctorI {
  public id!: number;
  public nombre!: string;
  public especialidad!: string;
  public telefono!: string;
  public correo!: string;
  public registro!: string | null;
  public status!: "ACTIVATE" | "INACTIVE";
}

Doctor.init(
  {
    // Sequelize crea 'id' automáticamente (INTEGER, PK, autoIncrement) si no lo defines.

    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre no puede estar vacío" },
        len: { args: [2, 100], msg: "El nombre debe tener entre 2 y 100 caracteres" },
      },
    },

    especialidad: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "La especialidad no puede estar vacía" },
        len: { args: [2, 120], msg: "La especialidad debe tener entre 2 y 120 caracteres" },
      },
    },

    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "El teléfono no puede estar vacío" },
        len: { args: [7, 15], msg: "El teléfono debe tener entre 7 y 15 caracteres" },
      },
    },

    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "El correo no puede estar vacío" },
        isEmail: { msg: "Formato de correo inválido" },
        len: { args: [5, 160], msg: "El correo debe tener entre 5 y 160 caracteres" },
      },
    },

    registro: {
      type: DataTypes.STRING,
      allowNull: true,    // opcional
      // Si quieres que no se repita cuando esté presente, descomenta la línea siguiente:
      // unique: true,
    },

    status: {
      type: DataTypes.ENUM("ACTIVATE", "INACTIVE"),
      defaultValue: "ACTIVATE",
    },
  },
  {
    sequelize,
    modelName: "Doctor",
    tableName: "doctors",
    timestamps: false,
    // Opcional: índices recomendados
    indexes: [
      { unique: true, fields: ["correo"] },
      // Si activas unique en 'registro', este índice no es necesario
    ],
  }
);

export default Doctor;
