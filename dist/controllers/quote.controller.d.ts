import { Request, Response } from "express";
export declare class QuoteController {
    getAllQuotes(req: Request, res: Response): Promise<void>;
    getQuoteById(req: Request, res: Response): Promise<void>;
    createQuote(req: Request, res: Response): Promise<void>;
    updateQuote(req: Request, res: Response): Promise<void>;
    deleteQuote(req: Request, res: Response): Promise<void>;
    deleteQuoteAdv(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=quote.controller.d.ts.map