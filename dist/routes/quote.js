"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteRoutes = void 0;
const quote_controller_1 = require("../controllers/quote.controller");
const auth_1 = require("../middleware/auth");
class QuoteRoutes {
    constructor() {
        this.quoteController = new quote_controller_1.QuoteController();
    }
    routes(app) {
        app.route("/api/quotes/public")
            .get(this.quoteController.getAllQuotes)
            .post(this.quoteController.createQuote);
        app.route("/api/quotes/public/:id")
            .get(this.quoteController.getQuoteById)
            .patch(this.quoteController.updateQuote)
            .delete(this.quoteController.deleteQuote);
        app.route("/api/quotes/public/:id/logic")
            .delete(this.quoteController.deleteQuoteAdv);
        app.route("/api/quotes")
            .get(auth_1.authMiddleware, this.quoteController.getAllQuotes)
            .post(auth_1.authMiddleware, this.quoteController.createQuote);
        app.route("/api/quotes/:id")
            .get(auth_1.authMiddleware, this.quoteController.getQuoteById)
            .patch(auth_1.authMiddleware, this.quoteController.updateQuote)
            .delete(auth_1.authMiddleware, this.quoteController.deleteQuote);
        app.route("/api/quotes/:id/logic")
            .delete(auth_1.authMiddleware, this.quoteController.deleteQuoteAdv);
    }
}
exports.QuoteRoutes = QuoteRoutes;
//# sourceMappingURL=quote.js.map