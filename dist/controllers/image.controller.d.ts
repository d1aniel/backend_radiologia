import { Request, Response } from "express";
export declare class ImageController {
    getAllImages(req: Request, res: Response): Promise<void>;
    getImageById(req: Request, res: Response): Promise<void>;
    createImage(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateImage(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    private resolveDiskPath;
    deleteImage(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteImageAdv(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=image.controller.d.ts.map