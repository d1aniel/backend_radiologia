import { Request, Response } from "express";
export declare class DoctorController {
    getAllDoctors(req: Request, res: Response): Promise<void>;
    getDoctorById(req: Request, res: Response): Promise<void>;
    createDoctor(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateDoctor(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteDoctor(req: Request, res: Response): Promise<void>;
    deleteDoctorAdv(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=doctor.controller.d.ts.map