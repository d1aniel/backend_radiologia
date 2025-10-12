import { Request, Response } from "express";
export declare class ResourceController {
    getAllResources(req: Request, res: Response): Promise<void>;
    getResourceById(req: Request, res: Response): Promise<void>;
    createResource(req: Request, res: Response): Promise<void>;
    updateResource(req: Request, res: Response): Promise<void>;
    deleteResource(req: Request, res: Response): Promise<void>;
    deleteResourceAdv(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=resource.controller.d.ts.map