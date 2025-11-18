import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/connection";

export type Prioridad = "BAJA" | "MEDIA" | "ALTA" | "URGENTE";

// === Atributos que existen en la TABLA (con FKs) ===
export interface StudyAttrs {
  id: number;

  patient_id: number;
  modality_id: number;
  team_id: number;

  technologist_id?: number | null;
  medico_id?: number | null;
  quote_id?: number | null;

  fechaHora: Date;
  prioridad: Prioridad;
  motivo: string;
  status: "ACTIVE" | "INACTIVE";

  modalidad: string;   
  equipo: string;        

  medico?: string | null;     
  tecnologo?: string | null;  
}

// Campos opcionales al crear
type StudyCreationAttrs = Optional<
  StudyAttrs,
  | "id"
  | "technologist_id"
  | "medico_id"
  | "quote_id"
  | "status"
  | "modalidad"
  | "equipo"
  | "medico"
  | "tecnologo"
>;

export class Study extends Model<StudyAttrs, StudyCreationAttrs> implements StudyAttrs {
  public id!: number;

  public patient_id!: number;
  public modality_id!: number;
  public team_id!: number;

  public technologist_id!: number | null;
  public medico_id!: number | null;
  public quote_id!: number | null;

  public fechaHora!: Date;
  public prioridad!: Prioridad;
  public motivo!: string;
  public status!: "ACTIVE" | "INACTIVE";

  public modalidad!: string;
  public equipo!: string;

  public medico!: string | null;
  public tecnologo!: string | null;
}

Study.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    modality_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    technologist_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    medico_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    quote_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    fechaHora: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "fechaHora",
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
      allowNull: false,
      defaultValue: "ACTIVE",
    },

    modalidad: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    equipo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    medico: {
      type: DataTypes.STRING(150),
      allowNull: true,      // 👈 puede ser null
    },

    tecnologo: {
      type: DataTypes.STRING(150),
      allowNull: true,      // 👈 puede ser null
    },
  },
  {
    sequelize,
    modelName: "Study",
    tableName: "studies",
    timestamps: false,
    underscored: true,
  }
);

export default Study;
