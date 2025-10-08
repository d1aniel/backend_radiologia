import { Request, Response } from "express";
import { Quote, QuoteI } from "../models/Quote";

export class QuoteController {
  // Obtener todas las citas
  public async getAllQuotes(req: Request, res: Response) {
    try {
      const quotes: QuoteI[] = await Quote.findAll();
      res.status(200).json({ quotes });
    } catch (error) {
      res.status(500).json({ error: "Error fetching quotes" });
    }
  }

  // Obtener una cita por ID
  public async getQuoteById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const quote = await Quote.findByPk(pk);

      if (quote) {
        res.status(200).json(quote);
      } else {
        res.status(404).json({ error: "Quote not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching quote" });
    }
  }

  // Crear una nueva cita
  public async createQuote(req: Request, res: Response) {
    try {
      const body = req.body as QuoteI;
      const quote = await Quote.create(body as any);
      res.status(201).json(quote);
    } catch (error) {
      res.status(500).json({ error: "Error creating quote" });
    }
  }

  // Actualizar una cita por ID
  public async updateQuote(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const body = req.body as Partial<QuoteI>;

      const quote = await Quote.findByPk(pk);
      if (!quote) {
        return res.status(404).json({ error: "Quote not found" });
      }

      await quote.update(body);
      res.status(200).json(quote);
    } catch (error) {
      res.status(500).json({ error: "Error updating quote" });
    }
  }

  // Eliminar una cita (aquí puedes hacer borrado físico o lógico si prefieres)
  public async deleteQuote(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const quote = await Quote.findByPk(pk);

      if (!quote) {
        return res.status(404).json({ error: "Quote not found" });
      }

      await quote.destroy();
      res.status(200).json({ message: "Quote deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting quote" });
    }
  }
}