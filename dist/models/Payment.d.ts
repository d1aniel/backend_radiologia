import { Model, Optional } from "sequelize";
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
export declare class Payment extends Model<PaymentI, PaymentCreationAttributes> implements PaymentI {
    id: number;
    pacienteId: number;
    estudioId: number | null;
    monto: number;
    metodo: MetodoPago;
    fecha: string;
    estado: EstadoPago;
}
export default Payment;
//# sourceMappingURL=Payment.d.ts.map