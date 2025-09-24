// src/models/Study.ts
import { DataTypes, Model } from "sequelize";
import  sequelize  from "../database/connection";
import { Patient } from "./Pacient";

export type Prioridad = "BAJA" | "MEDIA" | "ALTA" | "URGENTE";

export interface StudyI {
  id?: number;
  pacienteId: number;
  modalidad: string;
  equipo: string;
  tecnologo?: string;
  medico?: string;
  fechaHora: Date;
  prioridad: Prioridad;
  motivo: string;
  status?: "ACTIVE" | "INACTIVE";
}

export class Study extends Model {
  public id!: number;
  public pacienteId!: number;
  public modalidad!: string;
  public equipo!: string;
  public tecnologo?: string;
  public medico?: string;
  public fechaHora!: Date;
  public prioridad!: Prioridad;
  public motivo!: string;
  public status!: "ACTIVE" | "INACTIVE";
}

Study.init(
  {
  
    modalidad: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    equipo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tecnologo: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    medico: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    fechaHora: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    prioridad: {
      type: DataTypes.ENUM("BAJA", "MEDIA", "ALTA", "URGENTE"),
      allowNull: false,
      defaultValue: "MEDIA",
    },
    motivo: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Study",
    tableName: "studies",
    timestamps: false,
  }
);

// Relaciones
Patient.hasMany(Study, {
  foreignKey: "pacienteId",
  sourceKey: "id",
});

Study.belongsTo(Patient, {
  foreignKey: "pacienteId",
  targetKey: "id",
});

