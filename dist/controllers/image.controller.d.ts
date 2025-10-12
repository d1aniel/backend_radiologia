import { Request, Response } from "express";
export declare class ImageController {
    getAllImages(req: Request, res: Response): Promise<void>;
    getImageById(req: Request, res: Response): Promise<void>;
    /**
     * Crear imagen (espera multipart/form-data con campo 'file' y otros campos en body)
     * Campos esperados en body:
     * - estudioId (number)
     * - tipo (DICOM|JPG|PNG|Serie)
     * - serie (opcional)
     * - orden (opcional)
     *
     * El middleware multer debe haber procesado el archivo y dejarlo en req.file
     */
    createImage(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateImage(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * Eliminar imagen:
     * - elimina el archivo físico (si existe en disco y la ruta es local)
     * - elimina el registro en DB
     */
    deleteImage(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=image.controller.d.ts.map