import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../database/db";

/** Enum de prioridades (mismo contrato del frontend) */
export type Prioridad = "BAJA" | "MEDIA" | "ALTA" | "URGENTE";

/** Atributos del modelo Study (DB) */
export interface StudyI {
  id?: number;
  pacienteId: number;            // FK -> patients.id
  modalidad: string;
  equipo: string;
  tecnologo: string;
  medico: string;
  fechaHora: Date;               // guardamos Date/Datetime
  prioridad: Prioridad;
  motivo: string;
  // NOTA: etiquetas (number[]) NO va como columna. Se maneja con belongsToMany(Label).
}

export class Study extends Model<
  InferAttributes<Study>,
  InferCreationAttributes<Study>
> {
  declare id: CreationOptional<number>;
  declare pacienteId: number;
  declare modalidad: string;
  declare equipo: string;
  declare tecnologo: string;
  declare medico: string;
  declare fechaHora: Date;
  declare prioridad: Prioridad;
  declare motivo: string;

  // Asociaciones (se definen en setupAssociations() más abajo)
  static setupAssociations(models: {
    Patient?: any; // import real si lo tienes: typeof Patient
    Label?: any;   // import real si lo tienes: typeof Label
  }) {
    const { Patient, Label } = models;

    if (Patient) {
      // 1:N -> un paciente tiene muchos estudios
      Study.belongsTo(Patient, {
        foreignKey: "pacienteId",
        as: "paciente",
      });
    }

    if (Label) {
      // N:N -> estudios <-> etiquetas mediante tabla puente study_labels
      Study.belongsToMany(Label, {
        through: "study_labels",
        foreignKey: "studyId",
        otherKey: "labelId",
        as: "etiquetas",
      });
    }
  }
}

Study.init(
  {
    // id: Sequelize lo crea por defecto (INTEGER, PK, autoIncrement)
    pacienteId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        isInt: { msg: "pacienteId debe ser entero" },
        min: { args: [1], msg: "pacienteId inválido" },
      },
      // Si quieres referencia explícita (solo documental a nivel Sequelize):
      // references: { model: "patients", key: "id" },
    },
    modalidad: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: { msg: "La modalidad es obligatoria" },
      },
    },
    equipo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El equipo es obligatorio" },
      },
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
      type: DataTypes.DATE, // Guarda fecha y hora
      allowNull: false,
      validate: {
        notEmpty: { msg: "La fecha/hora es obligatoria" },
        isDate: { msg: "fechaHora debe ser una fecha válida" },
      },
    },
    prioridad: {
      type: DataTypes.ENUM("BAJA", "MEDIA", "ALTA", "URGENTE"),
      allowNull: false,
      defaultValue: "MEDIA",
    },
    motivo: {
      type: DataTypes.STRING(500), // o TEXT si quieres muy largo
      allowNull: false,
      validate: {
        notEmpty: { msg: "El motivo es obligatorio" },
        len: { args: [5, 500], msg: "El motivo debe tener entre 5 y 500 caracteres" },
      },
    },
  },
  {
    sequelize,
    modelName: "Study",
    tableName: "studies",
    timestamps: false, // como en Client
    indexes: [
      { fields: ["pacienteId"] },
      { fields: ["fechaHora"] },
      { fields: ["prioridad"] },
    ],
  }
);
