import { Model } from "sequelize";
export type EstadoTeam = "DISPONIBLE" | "MANTENIMIENTO" | "OCUPADO";
export interface TeamI {
    id?: number;
    nombre: string;
    modalidad: string;
    ubicacion: string;
    estado: EstadoTeam;
    observaciones?: string;
}
export declare class Team extends Model<TeamI> {
    id: number;
    nombre: string;
    modalidad: string;
    ubicacion: string;
    estado: EstadoTeam;
    observaciones?: string;
}
export default Team;
//# sourceMappingURL=Team.d.ts.map