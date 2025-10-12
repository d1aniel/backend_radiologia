import { Model } from "sequelize";
export type TipoImagen = "DICOM" | "JPG" | "PNG" | "Serie";
export interface ImageI {
    id?: number;
    estudioId: number;
    tipo: TipoImagen;
    url: string;
    nombreArchivo: string;
    tamanoBytes: number;
    serie?: string | null;
    orden?: number | null;
    fechaCarga?: Date;
}
export declare class Image extends Model<ImageI> implements ImageI {
    id: number;
    estudioId: number;
    tipo: TipoImagen;
    url: string;
    nombreArchivo: string;
    tamanoBytes: number;
    serie: string | null;
    orden: number | null;
    fechaCarga: Date;
}
export default Image;
//# sourceMappingURL=Image.d.ts.map