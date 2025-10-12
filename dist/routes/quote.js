"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteRoutes = void 0;
const quote_controller_1 = require("../controllers/quote.controller");
class QuoteRoutes {
    constructor() {
        this.quoteController = new quote_controller_1.QuoteController();
    }
    routes(app) {
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
exports.QuoteRoutes = QuoteRoutes;
//# sourceMappingURL=quote.js.map