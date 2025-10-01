// src/models/payment.ts
import { DataTypes, Model, Optional } from "sequelize";
import  sequelize  from "../database/connection";

export type MetodoPago = "EFECTIVO" | "TARJETA" | "TRANSFERENCIA" | "OTRO";
export type EstadoPago = "PAID" | "PENDING" | "VOID";

export interface PaymentI {
  id?: number;
  pacienteId: number;
  estudioId?: number | null;
  monto: number;
  metodo: MetodoPago;
  fecha: string;          // YYYY-MM-DD
  estado: EstadoPago;     // default: 'PAID'
}

// Para creación: id es opcional
type PaymentCreationAttributes = Optional<PaymentI, "id" | "estado" | "estudioId">;

export class Payment extends Model<PaymentI, PaymentCreationAttributes> implements PaymentI {
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
      field: "paciente_id",
      validate: {
        isInt: { msg: "pacienteId debe ser entero" },
        min: { args: [1], msg: "pacienteId inválido" },
      },
    },
    estudioId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "estudio_id",
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
      // Guarda sólo la parte de fecha (YYYY-MM-DD)
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
      { fields: ["paciente_id"] },
      { fields: ["estudio_id"] },
      { fields: ["fecha"] },
    ],
  }
);

// (Opcional) Si manejas asociaciones en otro archivo, puedes exportar una función helper.
// export const associatePayment = (models: any) => {
//   Payment.belongsTo(models.Patient, { foreignKey: "paciente_id", as: "paciente" });
//   Payment.belongsTo(models.Study,   { foreignKey: "estudio_id",  as: "estudio"  });
// };

export default Payment;
