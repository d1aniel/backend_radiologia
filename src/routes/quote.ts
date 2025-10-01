import { Application } from "express";
import { QuoteController } from "../controllers/quote.controller";

export class QuoteRoutes {
  public quoteController: QuoteController = new QuoteController();

  public routes(app: Application): void {
    // Obtener todas las citas
    app.route("/quotes").get(this.quoteController.getAllQuotes);

    // Obtener una cita por ID
    app.route("/quotes/:id").get(this.quoteController.getQuoteById);

    // Crear una nueva cita
    app.route("/quotes").post(this.quoteController.createQuote);

    // Actualizar una cita por ID
    app.route("/quotes/:id").put(this.quoteController.updateQuote);

    // Eliminar una cita
    app.route("/quotes/:id").delete(this.quoteController.deleteQuote);
  }
}
