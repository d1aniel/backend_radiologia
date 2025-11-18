import { Request, Response } from "express";
import { Quote, QuoteI, EstadoCita } from "../models/Quote";
import { Patient } from "../models/Pacient";
import { Technologist } from "../models/Technologist";

export class QuoteController {
  // Get all quotes
  public async getAllQuotes(req: Request, res: Response) {
    try {
      const quotes = await Quote.findAll({
        include: [
          {
            model: Patient,
            as: "paciente_obj",
            attributes: ["id", "nombre", "apellido", "documento"],
          },
          {
            model: Technologist,
            as: "technologist_obj",
            attributes: ["id", "nombre", "especialidad"],
          },
        ],
      });

      res.status(200).json({ quotes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching quotes" });
    }
  }

  // Get a quote by ID
  public async getQuoteById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;

      const quote = await Quote.findByPk(pk, {
        include: [
          {
            model: Patient,
            as: "paciente_obj",
            attributes: ["id", "nombre", "apellido", "documento"],
          },
          {
            model: Technologist,
            as: "technologist_obj",
            attributes: ["id", "nombre", "especialidad"],
          },
        ],
      });

      if (quote) {
        res.status(200).json({ quote });
      } else {
        res.status(404).json({ error: "Quote not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching quote" });
    }
  }

  // Create a new quote
  public async createQuote(req: Request, res: Response) {
    const {
      patient_id,
      technologist_id,
      modalidad,
      equipo,
      fechaHora,
      motivo,
      estado,
    } = req.body;

    try {
      const body: QuoteI = {
        patient_id,
        technologist_id,
        modalidad,
        equipo,
        fechaHora,
        motivo,
        estado: (estado ?? "PENDIENTE") as EstadoCita,
      };

      const newQuote = await Quote.create({ ...body } as any);
      res.status(201).json(newQuote);
    } catch (error: any) {
      console.error(error);
      res
        .status(400)
        .json({ error: error.message ?? "Error creating quote" });
    }
  }

  // Update a quote (only if exists)
  public async updateQuote(req: Request, res: Response) {
    const { id: pk } = req.params;
    const {
      patient_id,
      technologist_id,
      modalidad,
      equipo,
      fechaHora,
      motivo,
      estado,
    } = req.body;

    try {
      const body: Partial<QuoteI> = {
        patient_id,
        technologist_id,
        modalidad,
        equipo,
        fechaHora,
        motivo,
        estado,
      };

      const quoteExist = await Quote.findByPk(pk);
      if (quoteExist) {
        await quoteExist.update(body);
        res.status(200).json(quoteExist);
      } else {
        res.status(404).json({ error: "Quote not found" });
      }
    } catch (error: any) {
      console.error(error);
      res
        .status(400)
        .json({ error: error.message ?? "Error updating quote" });
    }
  }

  // Delete a quote physically (destroy)
  public async deleteQuote(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const quoteToDelete = await Quote.findByPk(id);

      if (quoteToDelete) {
        await quoteToDelete.destroy();
        res.status(200).json({ message: "Quote deleted successfully" });
      } else {
        res.status(404).json({ error: "Quote not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error deleting quote" });
    }
  }

  // Soft-delete a quote (mark estado = 'CANCELADA')
  public async deleteQuoteAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const quoteToUpdate = await Quote.findByPk(pk);

      if (quoteToUpdate) {
        await quoteToUpdate.update({ estado: "CANCELADA" as EstadoCita });
        res.status(200).json({ message: "Quote marked as CANCELADA" });
      } else {
        res.status(404).json({ error: "Quote not found" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Error marking quote as CANCELADA" });
    }
  }
}
