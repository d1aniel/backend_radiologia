import { Request, Response } from "express";
export declare class TechnologistController {
    getAllTechnologists(req: Request, res: Response): Promise<void>;
    getTechnologistById(req: Request, res: Response): Promise<void>;
    createTechnologist(req: Request, res: Response): Promise<void>;
    updateTechnologist(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteTechnologist(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=technologist.controller.d.ts.map