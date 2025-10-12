import { Model, Optional } from "sequelize";
export interface DoctorI {
    id?: number;
    nombre: string;
    especialidad: string;
    telefono: string;
    correo: string;
    registro?: string | null;
    status: "ACTIVATE" | "INACTIVE";
}
type DoctorCreationAttrs = Optional<DoctorI, "id" | "registro">;
export declare class Doctor extends Model<DoctorI, DoctorCreationAttrs> implements DoctorI {
    id: number;
    nombre: string;
    especialidad: string;
    telefono: string;
    correo: string;
    registro: string | null;
    status: "ACTIVATE" | "INACTIVE";
}
export default Doctor;
//# sourceMappingURL=Doctor.d.ts.map