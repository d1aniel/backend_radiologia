import { Request, Response } from "express";
export declare class PaymentController {
    getAllPayments(req: Request, res: Response): Promise<void>;
    getPaymentById(req: Request, res: Response): Promise<void>;
    createPayment(req: Request, res: Response): Promise<void>;
    updatePayment(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deletePayment(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=payment.controller.d.ts.map