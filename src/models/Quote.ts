
import { DataTypes, Model } from "sequelize";
import sequelize from "../database/connection";

export type EstadoCita = "PENDIENTE" | "CONFIRMADA" | "ATENDIDA" | "CANCELADA";

export interface QuoteI {
  id?: number;

  patient_id: number;       
  technologist_id?: number | null;  

  modalidad: string;
  equipo: string;
  fechaHora: string;
  motivo: string;
  estado: EstadoCita;
}

export class Quote extends Model implements QuoteI {
  public id!: number;

  public patient_id!: number;
  public technologist_id!: number | null;

  public modalidad!: string;
  public equipo!: string;
  public fechaHora!: string;
  public motivo!: string;
  public estado!: EstadoCita;
}

Quote.init(
  {
    
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
      
      
      
      
    },

    
    technologist_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      
      
      
      
    },

    modalidad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    equipo: {
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
