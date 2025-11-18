"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const payment_controller_1 = require("../controllers/payment.controller");
const auth_1 = require("../middleware/auth");
class PaymentRoutes {
    constructor() {
        this.paymentController = new payment_controller_1.PaymentController();
    }
    routes(app) {
        app.route("/api/pagos/public")
            .get(this.paymentController.getAllPayments)
            .post(this.paymentController.createPayment);
        app.route("/api/pagos/public/:id")
            .get(this.paymentController.getPaymentById)
            .patch(this.paymentController.updatePayment)
            .delete(this.paymentController.deletePayment);
        app.route("/api/pagos/public/:id/logic")
            .delete(this.paymentController.deletePaymentAdv);
        app.route("/api/pagos")
            .get(auth_1.authMiddleware, this.paymentController.getAllPayments)
            .post(auth_1.authMiddleware, this.paymentController.createPayment);
        app.route("/api/pagos/:id")
            .get(auth_1.authMiddleware, this.paymentController.getPaymentById)
            .patch(auth_1.authMiddleware, this.paymentController.updatePayment)
            .delete(auth_1.authMiddleware, this.paymentController.deletePayment);
        app.route("/api/pagos/:id/logic")
            .delete(auth_1.authMiddleware, this.paymentController.deletePaymentAdv);
    }
}
exports.PaymentRoutes = PaymentRoutes;
//# sourceMappingURL=payment.js.map