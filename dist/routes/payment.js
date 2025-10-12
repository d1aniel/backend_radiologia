"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const payment_controller_1 = require("../controllers/payment.controller");
class PaymentRoutes {
    constructor() {
        this.paymentController = new payment_controller_1.PaymentController();
    }
    routes(app) {
        // Obtener todos los pagos (no VOID)
        app.route("/payments").get(this.paymentController.getAllPayments);
        // Obtener un pago por ID
        app.route("/payments/:id").get(this.paymentController.getPaymentById);
        // Crear un nuevo pago
        app.route("/payments").post(this.paymentController.createPayment);
        // Actualizar un pago por ID
        app.route("/payments/:id").put(this.paymentController.updatePayment);
        // Eliminar (estado = VOID)
        app.route("/payments/:id").delete(this.paymentController.deletePayment);
    }
}
exports.PaymentRoutes = PaymentRoutes;
//# sourceMappingURL=payment.js.map