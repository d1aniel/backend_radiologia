import { Request, Response } from "express";
export declare class ModalidadController {
    getAllModalidades(req: Request, res: Response): Promise<void>;
    getModalidadById(req: Request, res: Response): Promise<void>;
    createModalidad(req: Request, res: Response): Promise<void>;
    updateModalidad(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteModalidad(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=modalitie.controller.d.ts.map