// src/routes/payment.routes.ts
import { Application } from "express";
import { PaymentController } from "../controllers/payment.controller";
import { authMiddleware } from "../middleware/auth";

export class PaymentRoutes {
  public paymentController: PaymentController = new PaymentController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/pagos/public")
      .get(this.paymentController.getAllPayments)
      .post(this.paymentController.createPayment);

    app.route("/api/pagos/public/:id")
      .get(this.paymentController.getPaymentById)
      .patch(this.paymentController.updatePayment)
      .delete(this.paymentController.deletePayment);

    app.route("/api/pagos/public/:id/logic")
      .delete(this.paymentController.deletePaymentAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/pagos")
      .get(authMiddleware, this.paymentController.getAllPayments)
      .post(authMiddleware, this.paymentController.createPayment);

    app.route("/api/pagos/:id")
      .get(authMiddleware, this.paymentController.getPaymentById)
      .patch(authMiddleware, this.paymentController.updatePayment)
      .delete(authMiddleware, this.paymentController.deletePayment);

    app.route("/api/pagos/:id/logic")
      .delete(authMiddleware, this.paymentController.deletePaymentAdv);
  }
}
