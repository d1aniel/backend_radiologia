import { Request, Response } from "express";
import { Op } from "sequelize";
import { Payment, PaymentI } from "../models/Payment";

export class PaymentController {
  // Obtener todos los pagos (excepto los VOID)
  public async getAllPayments(req: Request, res: Response) {
    try {
      const payments: PaymentI[] = await Payment.findAll({
        where: { estado: { [Op.ne]: "VOID" } },
      });
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
        res.status(200).json(payment);
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
    try {
      const body = req.body as PaymentI;

      // Garantizar valores mínimos / defaults
      const payload: Partial<PaymentI> = {
        pacienteId: body.pacienteId,
        estudioId: body.estudioId ?? null,
        monto: body.monto,
        metodo: body.metodo ?? "EFECTIVO",
        fecha: body.fecha, // esperar YYYY-MM-DD desde el frontend
        estado: body.estado ?? "PAID",
      };

      const payment = await Payment.create(payload as any);
      res.status(201).json(payment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating payment" });
    }
  }

  // Actualizar un pago por ID
  public async updatePayment(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const body = req.body as Partial<PaymentI>;

      const payment = await Payment.findByPk(pk);
      if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
      }

      await payment.update(body);
      res.status(200).json(payment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating payment" });
    }
  }

  // "Eliminar" un pago -> marcar como VOID
  public async deletePayment(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const payment = await Payment.findByPk(pk);

      if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
      }

      await payment.update({ estado: "VOID" });
      res.status(200).json({ message: "Payment set to VOID" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error deleting payment" });
    }
  }
}