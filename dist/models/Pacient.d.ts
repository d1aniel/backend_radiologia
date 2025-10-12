import { Model } from "sequelize";
/**
 * Modelo Patient (estilo profe)
 */
export interface PatientI {
    id?: number;
    nombre: string;
    apellido: string;
    tpdocumento: string;
    sexo?: string;
    documento: number;
    telefono: string | number;
    eps: string;
    correo: string;
    status: "ACTIVATE" | "INACTIVE";
}
export declare class Patient extends Model implements PatientI {
    id: number;
    nombre: string;
    apellido: string;
    tpdocumento: string;
    sexo?: string;
    documento: number;
    telefono: string | number;
    eps: string;
    correo: string;
    status: "ACTIVATE" | "INACTIVE";
}
//# sourceMappingURL=Pacient.d.ts.map