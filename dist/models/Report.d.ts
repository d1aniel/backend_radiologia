import { Model, Optional } from "sequelize";
export type InformeEstado = "BORRADOR" | "FIRMADO";
export interface ReportI {
    id?: number;
    estudioId: number;
    estado: InformeEstado;
    cuerpo: string;
    medicoId: number;
    fechaCreacion?: Date;
}
type ReportCreationAttrs = Optional<ReportI, "id" | "fechaCreacion">;
export declare class Report extends Model<ReportI, ReportCreationAttrs> implements ReportI {
    id: number;
    estudioId: number;
    estado: InformeEstado;
    cuerpo: string;
    medicoId: number;
    fechaCreacion: Date;
}
export default Report;
//# sourceMappingURL=Report.d.ts.map