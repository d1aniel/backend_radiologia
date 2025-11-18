// src/models/Report.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/connection";

export type InformeEstado = "BORRADOR" | "FIRMADO";

export interface ReportI {
  id?: number;
  estudioId: number;       // -> columna estudio_id
  estado: InformeEstado;
  cuerpo: string;
  medicoId: number;        // -> columna medico_id
  fechaCreacion?: Date;
}

type ReportCreationAttrs = Optional<ReportI, "id" | "fechaCreacion">;

export class Report extends Model<ReportI, ReportCreationAttrs> implements ReportI {
  public id!: number;
  public estudioId!: number;
  public estado!: InformeEstado;
  public cuerpo!: string;
  public medicoId!: number;
  public fechaCreacion!: Date;
}

Report.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    // 🔹 Mapea a columna FÍSICA estudio_id (FK a studies.id)
    estudioId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true, // 1:1: un estudio -> un informe
      field: "estudio_id",
      references: {
        model: "studies",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
      validate: {
        isInt: { msg: "estudioId debe ser entero" },
        min: { args: [1], msg: "estudioId inválido" },
      },
    },

    estado: {
      type: DataTypes.ENUM("BORRADOR", "FIRMADO"),
      allowNull: false,
      defaultValue: "BORRADOR",
    },

    cuerpo: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El cuerpo del informe no puede estar vacío" },
        len: {
          args: [10, 2_000_000],
          msg: "El cuerpo debe tener al menos 10 caracteres",
        },
      },
    },

    // 🔹 Mapea a columna FÍSICA medico_id (FK a doctors.id)
    medicoId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "medico_id",
      references: {
        model: "doctors",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
      validate: {
        isInt: { msg: "medicoId debe ser entero" },
        min: { args: [1], msg: "medicoId inválido" },
      },
    },

    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Report",
    tableName: "reports",
    timestamps: false,
    indexes: [
      // 👇 aquí van los NOMBRES DE COLUMNA reales
      { fields: ["medico_id"] },
      {
        unique: true,
        fields: ["estudio_id"],
        name: "unique_report_per_study",
      },
    ],
  }
);

export default Report;
