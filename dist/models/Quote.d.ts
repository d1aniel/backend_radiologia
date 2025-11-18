import { Model } from "sequelize";
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
export declare class Quote extends Model implements QuoteI {
    id: number;
    patient_id: number;
    technologist_id: number | null;
    modalidad: string;
    equipo: string;
    fechaHora: string;
    motivo: string;
    estado: EstadoCita;
}
//# sourceMappingURL=Quote.d.ts.map