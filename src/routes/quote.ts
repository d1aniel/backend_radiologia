
import { Application } from "express";
import { QuoteController } from "../controllers/quote.controller";
import { authMiddleware } from "../middleware/auth";

export class QuoteRoutes {
  public quoteController: QuoteController = new QuoteController();

  public routes(app: Application): void {
    // ================== RUTAS PÚBLICAS ==================
    app.route("/api/quotes/public")
      .get(this.quoteController.getAllQuotes)
      .post(this.quoteController.createQuote);

    app.route("/api/quotes/public/:id")
      .get(this.quoteController.getQuoteById)
      .patch(this.quoteController.updateQuote)
      .delete(this.quoteController.deleteQuote);

    app.route("/api/quotes/public/:id/logic")
      .delete(this.quoteController.deleteQuoteAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/quotes")
      .get(authMiddleware, this.quoteController.getAllQuotes)
      .post(authMiddleware, this.quoteController.createQuote);

    app.route("/api/quotes/:id")
      .get(authMiddleware, this.quoteController.getQuoteById)
      .patch(authMiddleware, this.quoteController.updateQuote)
      .delete(authMiddleware, this.quoteController.deleteQuote);

    app.route("/api/quotes/:id/logic")
      .delete(authMiddleware, this.quoteController.deleteQuoteAdv);
  }
}
