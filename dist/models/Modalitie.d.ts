import { Model } from "sequelize";
export interface ModalidadI {
    id?: number;
    nombre: string;
    descripcion: string;
    activa: boolean;
}
export declare class Modalidad extends Model implements ModalidadI {
    id: number;
    nombre: string;
    descripcion: string;
    activa: boolean;
}
//# sourceMappingURL=Modalitie.d.ts.map