
import { DataTypes, Model } from "sequelize";
import sequelize from "../database/connection";

export type EstadoTeam = "DISPONIBLE" | "MANTENIMIENTO" | "OCUPADO";

export interface TeamI {
  id?: number;
  nombre: string;
  modality_id: number;     
  ubicacion: string;
  estado: EstadoTeam;
  observaciones?: string;
}

export class Team extends Model<TeamI> {
  public id!: number;
  public nombre!: string;
  public modality_id!: number;   
  public ubicacion!: string;
  public estado!: EstadoTeam;
  public observaciones?: string;
}

Team.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modality_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "modalities",
        key: "id",
      },
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM("DISPONIBLE", "MANTENIMIENTO", "OCUPADO"),
      allowNull: false,
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
