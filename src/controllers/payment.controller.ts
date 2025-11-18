import { Request, Response } from "express";
import { Op } from "sequelize";
import { Payment, PaymentI } from "../models/Payment"; 

export class PaymentController {
  
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

  
  public async getPaymentById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const payment = await Payment.findOne({
        where: { id: pk, estado: { [Op.ne]: "VOID" } },
      });

      if (payment) {
        
        res.status(200).json({ payment });
      } else {
        res.status(404).json({ error: "Payment not found or voided" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching payment" });
    }
  }

  
  public async createPayment(req: Request, res: Response) {
    const { pacienteId, estudioId, monto, metodo, fecha, estado } = req.body;

    try {
      
      const body: PaymentI = {
        pacienteId,
        estudioId: estudioId ?? null,
        monto,
        metodo: metodo ?? "EFECTIVO",
        fecha, 
        estado: estado ?? "PAID",
      };

      const newPayment = await Payment.create({ ...body } as any);
      res.status(201).json(newPayment);
    } catch (error: any) {
      console.error(error);
      
      res.status(400).json({ error: error.message ?? "Error creating payment" });
    }
  }

  
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
