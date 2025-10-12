import { Request, Response } from 'express';
export declare class DoctorController {
    /**
     * GET /api/doctors
     * List all doctors
     */
    getAllDoctors: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    /**
     * GET /api/doctors/:id
     * Get one doctor by id
     */
    getDoctorById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    /**
     * POST /api/doctors
     * Create a doctor
     * Body: { nombre, especialidad, telefono, correo, registro? }
     * status se establece por defecto a "ACTIVATE"
     */
    createDoctor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    /**
     * PUT /api/doctors/:id
     * Update doctor (puedes actualizar nombre, especialidad, telefono, correo, registro, status)
     */
    updateDoctor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    /**
     * DELETE /api/doctors/:id
     * Hard delete (si prefieres soft delete, cambia a update status = INACTIVE)
     */
    deleteDoctor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=doctor.controller.d.ts.map