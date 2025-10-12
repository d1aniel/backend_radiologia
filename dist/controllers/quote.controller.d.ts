import { Request, Response } from "express";
export declare class QuoteController {
    getAllQuotes(req: Request, res: Response): Promise<void>;
    getQuoteById(req: Request, res: Response): Promise<void>;
    createQuote(req: Request, res: Response): Promise<void>;
    updateQuote(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteQuote(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=quote.controller.d.ts.map