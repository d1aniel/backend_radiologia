import { Request, Response } from "express";
export declare class StudyController {
    getAllStudies(req: Request, res: Response): Promise<void>;
    getStudyById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    createStudy(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateStudy(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteStudy(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=studie.controller.d.ts.map