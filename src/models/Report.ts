// src/models/report.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/db";

export type InformeEstado = "BORRADOR" | "FIRMADO";

export interface ReportI {
  id?: number;             // PK autoincremental
  estudioId: number;       // FK único (1:1 con Study)
  estado: InformeEstado;   // BORRADOR | FIRMADO
  cuerpo: string;          // texto largo/markdown
  medicoId: number;        // quien firma
  fechaCreacion?: Date;    // default NOW
}

// Para creación (id y fechaCreacion son generados)
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
    estudioId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true, // 1:1 (un estudio solo puede tener un informe)
      // Si ya tienes la tabla studies, puedes habilitar la referencia:
      // references: { model: "studies", key: "id" },
      // onUpdate: "CASCADE",
      // onDelete: "RESTRICT",
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
        len: { args: [10, 2000000], msg: "El cuerpo debe tener al menos 10 caracteres" },
      },
    },
    medicoId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        isInt: { msg: "medicoId debe ser entero" },
        min: { args: [1], msg: "medicoId inválido" },
      },
      // references: { model: "doctors", key: "id" },
      // onUpdate: "CASCADE",
      // onDelete: "RESTRICT",
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      // Si prefieres DATEONLY (sin hora) usa:
      // type: DataTypes.DATEONLY
    },
  },
  {
    sequelize,
    modelName: "Report",
    tableName: "reports",
    timestamps: false, // ya manejamos fechaCreacion manualmente
    indexes: [
      { fields: ["medicoId"] },
      { unique: true, fields: ["estudioId"], name: "unique_report_per_study" },
    ],
  }
);

// Sugerencia de asociaciones (opcional, activa si tienes los modelos):
// Report.belongsTo(Study, { foreignKey: "estudioId", as: "estudio" });
// Report.belongsTo(Doctor, { foreignKey: "medicoId", as: "medico" });

export default Report;
