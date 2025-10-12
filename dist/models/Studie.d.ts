import { Model, Optional } from "sequelize";
export type Prioridad = "BAJA" | "MEDIA" | "ALTA" | "URGENTE";
export interface StudyI {
    id?: number;
    patient_id: number;
    modalidad: string;
    equipo: string;
    tecnologo?: string | null;
    medico?: string | null;
    fechaHora: Date;
    prioridad: Prioridad;
    motivo: string;
    status?: "ACTIVE" | "INACTIVE";
}
type StudyCreationAttrs = Optional<StudyI, "id" | "status">;
export declare class Study extends Model<StudyI, StudyCreationAttrs> implements StudyI {
    id: number;
    patient_id: number;
    modalidad: string;
    equipo: string;
    tecnologo?: string | null;
    medico?: string | null;
    fechaHora: Date;
    prioridad: Prioridad;
    motivo: string;
    status: "ACTIVE" | "INACTIVE";
}
export {};
//# sourceMappingURL=Studie.d.ts.map