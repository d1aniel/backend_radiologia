import { Request, Response } from "express";
export declare class PatientController {
    getAllPatients(req: Request, res: Response): Promise<void>;
    getPatientById(req: Request, res: Response): Promise<void>;
    createPatient(req: Request, res: Response): Promise<void>;
    updatePatient(req: Request, res: Response): Promise<void>;
    deletePatient(req: Request, res: Response): Promise<void>;
    deletePatientAdv(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=pacient.controller.d.ts.map