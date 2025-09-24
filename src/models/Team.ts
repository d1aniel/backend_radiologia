// src/models/team.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export type EstadoTeam = "DISPONIBLE" | "MANTENIMIENTO" | "OCUPADO";

export interface TeamI {
  id?: number;
  nombre: string;        // Nombre/Identificador (ej. "RX-01 Sala A")
  modalidad: string;     // RX | TAC | RM (string)
  ubicacion: string;     // ej. "Sala A - Piso 1"
  estado: EstadoTeam;    // Disponible/Mantenimiento/Ocupado
  observaciones?: string;
}

export class Team extends Model<TeamI> {
  public id!: number;
  public nombre!: string;
  public modalidad!: string;
  public ubicacion!: string;
  public estado!: EstadoTeam;
  public observaciones?: string;
}

Team.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    modalidad: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estado: {
      type: DataTypes.ENUM("DISPONIBLE", "MANTENIMIENTO", "OCUPADO"),
      allowNull: true,
      defaultValue: "DISPONIBLE",
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Team",
    tableName: "teams",
    timestamps: false,
  }
);

export default Team;
