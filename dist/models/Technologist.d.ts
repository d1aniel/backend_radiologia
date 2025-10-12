import { Model } from "sequelize";
export interface TechnologistI {
    id?: number;
    nombre: string;
    especialidad: "RX" | "TAC" | "RM";
    telefono: number;
    correo: string;
    status: "ACTIVE" | "INACTIVE";
}
export declare class Technologist extends Model {
    id: number;
    nombre: string;
    especialidad: "RX" | "TAC" | "RM";
    telefono: number;
    correo: string;
    status: "ACTIVE" | "INACTIVE";
}
//# sourceMappingURL=Technologist.d.ts.map