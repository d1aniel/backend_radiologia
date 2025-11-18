
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/connection";

export type InformeEstado = "BORRADOR" | "FIRMADO";

export interface ReportI {
  id?: number;
  estudioId: number;       
  estado: InformeEstado;
  cuerpo: string;
  medicoId: number;        
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

    
    estudioId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true, 
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
