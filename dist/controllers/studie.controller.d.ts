import { Request, Response } from "express";
export declare class StudyController {
    getAllStudies(req: Request, res: Response): Promise<void>;
    getStudyById(req: Request, res: Response): Promise<void>;
    createStudy(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateStudy(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteStudy(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=studie.controller.d.ts.map