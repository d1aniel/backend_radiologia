import { DataTypes, Model } from "sequelize";
import  sequelize  from "../database/connection";

export type EstadoCita = "PENDIENTE" | "CONFIRMADA" | "ATENDIDA" | "CANCELADA";

export interface QuoteI {
  id?: number;
  paciente: string;
  modalidad: string;
  equipo: string;
  tecnologo: string;
  fechaHora: string; // ISO string
  motivo: string;
  estado: EstadoCita;
}

export class Quote extends Model implements QuoteI {
  public id!: number;
  public paciente!: string;
  public modalidad!: string;
  public equipo!: string;
  public tecnologo!: string;
  public fechaHora!: string;
  public motivo!: string;
  public estado!: EstadoCita;
}

Quote.init(
  {
    paciente: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "El paciente es obligatorio" },
      },
    },
    modalidad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    equipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tecnologo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaHora: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    motivo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 255],
          msg: "El motivo debe tener entre 5 y 255 caracteres",
        },
      },
    },
    estado: {
      type: DataTypes.ENUM("PENDIENTE", "CONFIRMADA", "ATENDIDA", "CANCELADA"),
      defaultValue: "PENDIENTE",
    },
  },
  {
    sequelize,
    modelName: "Quote",
    tableName: "quotes",
    timestamps: false,
  }
);
