import { Router, Application } from "express";
import { PaymentController } from "../controllers/payment.controller";

export class PaymentRoutes {
  public paymentController: PaymentController = new PaymentController();

  public routes(app: Application): void {
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
