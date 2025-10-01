import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/connection";

export type Prioridad = "BAJA" | "MEDIA" | "ALTA" | "URGENTE";

export interface StudyI {
  id?: number;
  patient_id: number;   // FK -> patients.id (snake_case para seguir el profe)
  modalidad: string;
  equipo: string;
  tecnologo?: string | null;
  medico?: string | null;
  fechaHora: Date;
  prioridad: Prioridad;
  motivo: string;
  status?: "ACTIVE" | "INACTIVE";
}

type StudyCreationAttrs = Optional<StudyI, "id" | "status">;

export class Study extends Model<StudyI, StudyCreationAttrs> implements StudyI {
  public id!: number;
  public patient_id!: number;
  public modalidad!: string;
  public equipo!: string;
  public tecnologo?: string | null;
  public medico?: string | null;
  public fechaHora!: Date;
  public prioridad!: Prioridad;
  public motivo!: string;
  public status!: "ACTIVE" | "INACTIVE";
}

Study.init(
  {
    // columna FK: patient_id (debe coincidir exactamente con foreignKey en relaciones)
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

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
