import { Request, Response } from "express";
import { Op } from "sequelize";
import { Payment, PaymentI } from "../models/Payment"; // ajusta la ruta si tu archivo es payment.ts

export class PaymentController {
  // Obtener todos los pagos (excepto los VOID)
  public async getAllPayments(req: Request, res: Response) {
    try {
      const payments: PaymentI[] = await Payment.findAll({
        where: { estado: { [Op.ne]: "VOID" } },
      });
      // Mantengo el mismo patrón del profe (envolver en objeto)
      res.status(200).json({ payments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching payments" });
    }
  }

  // Obtener un pago por ID
  public async getPaymentById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const payment = await Payment.findOne({
        where: { id: pk, estado: { [Op.ne]: "VOID" } },
      });

      if (payment) {
        // envolvemos el resultado en un objeto, como en patient
        res.status(200).json({ payment });
      } else {
        res.status(404).json({ error: "Payment not found or voided" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching payment" });
    }
  }

  // Crear un nuevo pago
  public async createPayment(req: Request, res: Response) {
    const { pacienteId, estudioId, monto, metodo, fecha, estado } = req.body;

    try {
      // construimos el body de forma explícita (igual que patient)
      const body: PaymentI = {
        pacienteId,
        estudioId: estudioId ?? null,
        monto,
        metodo: metodo ?? "EFECTIVO",
        fecha, // se espera YYYY-MM-DD desde frontend
        estado: estado ?? "PAID",
      };

      const newPayment = await Payment.create({ ...body } as any);
      res.status(201).json(newPayment);
    } catch (error: any) {
      console.error(error);
      // devuelvo 400 con mensaje de validación si viene del ORM
      res.status(400).json({ error: error.message ?? "Error creating payment" });
    }
  }

  // Actualizar un pago (solo si NO está VOID)
  public async updatePayment(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { pacienteId, estudioId, monto, metodo, fecha, estado } = req.body;

    try {
      const body: Partial<PaymentI> = {
        pacienteId,
        estudioId,
        monto,
        metodo,
        fecha,
        estado,
      };

      const paymentExist = await Payment.findOne({
        where: { id: pk, estado: { [Op.ne]: "VOID" } },
      });

      if (paymentExist) {
        await paymentExist.update(body);
        res.status(200).json(paymentExist);
      } else {
        res.status(404).json({ error: "Payment not found or voided" });
      }
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ error: error.message ?? "Error updating payment" });
    }
  }

  // Delete físicamente (destroy)
  public async deletePayment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const paymentToDelete = await Payment.findByPk(id);

      if (paymentToDelete) {
        await paymentToDelete.destroy();
        res.status(200).json({ message: "Payment deleted successfully" });
      } else {
        res.status(404).json({ error: "Payment not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error deleting payment" });
    }
  }

  // Delete lógico -> marcar estado = VOID
  public async deletePaymentAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const paymentToUpdate = await Payment.findOne({
        where: { id: pk, estado: { [Op.ne]: "VOID" } },
      });

      if (paymentToUpdate) {
        await paymentToUpdate.update({ estado: "VOID" });
        res.status(200).json({ message: "Payment marked as VOID" });
      } else {
        res.status(404).json({ error: "Payment not found or already voided" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error marking payment as VOID" });
    }
  }
}
