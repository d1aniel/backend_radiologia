import { Model, Optional } from "sequelize";
export interface TechnologistAttrs {
    id?: number;
    nombre: string;
    especialidad: "RX" | "TAC" | "RM";
    telefono: string;
    correo: string;
    status: "ACTIVE" | "INACTIVE";
}
type TechnologistCreationAttrs = Optional<TechnologistAttrs, "id" | "status">;
export declare class Technologist extends Model<TechnologistAttrs, TechnologistCreationAttrs> implements TechnologistAttrs {
    id: number;
    nombre: string;
    especialidad: "RX" | "TAC" | "RM";
    telefono: string;
    correo: string;
    status: "ACTIVE" | "INACTIVE";
}
export default Technologist;
//# sourceMappingURL=Technologist.d.ts.map