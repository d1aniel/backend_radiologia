import { Request, Response } from "express";
import { Label, LabelI } from "../models/Label";

export class LabelController {
  // Obtener todas las etiquetas activas
  public async getAllLabels(req: Request, res: Response) {
    try {
      const labels: LabelI[] = await Label.findAll({
        where: { status: "ACTIVATE" },
      });
      res.status(200).json({ labels });
    } catch (error) {
      res.status(500).json({ error: "Error fetching labels" });
    }
  }

  // Obtener una etiqueta por ID
  public async getLabelById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const label = await Label.findOne({
        where: { id: pk, status: "ACTIVATE" },
      });

      if (label) {
        res.status(200).json(label);
      } else {
        res.status(404).json({ error: "Label not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching label" });
    }
  }

  // Crear una nueva etiqueta
  public async createLabel(req: Request, res: Response) {
    try {
      const body = req.body as LabelI;
      const label = await Label.create(body as any);
      res.status(201).json(label);
    } catch (error) {
      res.status(500).json({ error: "Error creating label" });
    }
  }

  // Actualizar una etiqueta por ID
  public async updateLabel(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const body = req.body as Partial<LabelI>;

      const label = await Label.findByPk(pk);
      if (!label) {
        return res.status(404).json({ error: "Label not found" });
      }

      await label.update(body);
      res.status(200).json(label);
    } catch (error) {
      res.status(500).json({ error: "Error updating label" });
    }
  }

  // Eliminar (cambiar status a INACTIVE)
  public async deleteLabel(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const label = await Label.findByPk(pk);

      if (!label) {
        return res.status(404).json({ error: "Label not found" });
      }

      await label.update({ status: "INACTIVE" });
      res.status(200).json({ message: "Label set to INACTIVE" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting label" });
    }
  }
}
