import { Request, Response } from "express";
export declare class ReportController {
    getAllReports(req: Request, res: Response): Promise<void>;
    getReportById(req: Request, res: Response): Promise<void>;
    createReport(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateReport(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    signReport(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteReport(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=report.controller.d.ts.map