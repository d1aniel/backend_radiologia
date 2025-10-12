import { Request, Response } from "express";
export declare class LabelController {
    getAllLabels(req: Request, res: Response): Promise<void>;
    getLabelById(req: Request, res: Response): Promise<void>;
    createLabel(req: Request, res: Response): Promise<void>;
    updateLabel(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteLabel(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=label.controller.d.ts.map