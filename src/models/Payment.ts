
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/connection";

export type MetodoPago = "EFECTIVO" | "TARJETA" | "TRANSFERENCIA" | "OTRO";
export type EstadoPago = "PAID" | "PENDING" | "VOID";

export interface PaymentI {
  id?: number;
  pacienteId: number;          
  estudioId?: number | null;   
  monto: number;
  metodo: MetodoPago;
  fecha: string;               
  estado: EstadoPago;          
}


type PaymentCreationAttributes = Optional<PaymentI, "id" | "estado" | "estudioId">;

export class Payment
  extends Model<PaymentI, PaymentCreationAttributes>
  implements PaymentI
{
  public id!: number;
  public pacienteId!: number;
  public estudioId!: number | null;
  public monto!: number;
  public metodo!: MetodoPago;
  public fecha!: string;
  public estado!: EstadoPago;
}

Payment.init(
  {
    
    pacienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "patient_id",
      validate: {
        isInt: { msg: "pacienteId debe ser entero" },
        min: { args: [1], msg: "pacienteId inválido" },
      },
    },

    
    estudioId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "quote_id",
      validate: {
        isInt: { msg: "estudioId debe ser entero" },
        min: { args: [1], msg: "estudioId inválido" },
      },
    },

    monto: {
      type: DataTypes.DECIMAL(14, 2),
      allowNull: false,
      validate: {
        isDecimal: { msg: "monto debe ser numérico" },
        min: { args: [0.01], msg: "monto debe ser mayor a 0" },
      },
    },
    metodo: {
      type: DataTypes.ENUM("EFECTIVO", "TARJETA", "TRANSFERENCIA", "OTRO"),
      allowNull: false,
      defaultValue: "EFECTIVO",
    },
    fecha: {
      
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM("PAID", "PENDING", "VOID"),
      allowNull: false,
      defaultValue: "PAID",
    },
  },
  {
    sequelize,
    modelName: "Payment",
    tableName: "payments",
    timestamps: false,
    indexes: [
      { fields: ["patient_id"] },
      { fields: ["quote_id"] },
      { fields: ["fecha"] },
    ],
  }
);


export default Payment;
