import { Model, Optional } from "sequelize";
export type Prioridad = "BAJA" | "MEDIA" | "ALTA" | "URGENTE";
export interface StudyAttrs {
    id: number;
    patient_id: number;
    modality_id: number;
    team_id: number;
    technologist_id?: number | null;
    medico_id?: number | null;
    quote_id?: number | null;
    fechaHora: Date;
    prioridad: Prioridad;
    motivo: string;
    status: "ACTIVE" | "INACTIVE";
    modalidad: string;
    equipo: string;
    medico?: string | null;
    tecnologo?: string | null;
}
type StudyCreationAttrs = Optional<StudyAttrs, "id" | "technologist_id" | "medico_id" | "quote_id" | "status" | "modalidad" | "equipo" | "medico" | "tecnologo">;
export declare class Study extends Model<StudyAttrs, StudyCreationAttrs> implements StudyAttrs {
    id: number;
    patient_id: number;
    modality_id: number;
    team_id: number;
    technologist_id: number | null;
    medico_id: number | null;
    quote_id: number | null;
    fechaHora: Date;
    prioridad: Prioridad;
    motivo: string;
    status: "ACTIVE" | "INACTIVE";
    modalidad: string;
    equipo: string;
    medico: string | null;
    tecnologo: string | null;
}
export default Study;
//# sourceMappingURL=Studie.d.ts.map