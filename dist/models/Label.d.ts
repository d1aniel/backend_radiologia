import { Model } from 'sequelize';
export interface LabelI {
    id?: number;
    nombre: string;
    descripcion?: string;
    status: 'ACTIVATE' | 'INACTIVE';
}
export declare class Label extends Model {
    id: number;
    nombre: string;
    descripcion?: string;
    status: 'ACTIVATE' | 'INACTIVE';
}
//# sourceMappingURL=Label.d.ts.map