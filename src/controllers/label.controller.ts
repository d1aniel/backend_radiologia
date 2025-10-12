
import { Request, Response } from "express";
import { Label, LabelI } from "../models/Label";

export class LabelController {
  // Get all labels with status "ACTIVATE"
  public async getAllLabels(req: Request, res: Response) {
    try {
      const labels: LabelI[] = await Label.findAll({
        where: { status: "ACTIVATE" },
      });
      res.status(200).json({ labels });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching labels" });
    }
  }

  // Get a label by ID
  public async getLabelById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const label = await Label.findOne({
        where: { id: pk, status: "ACTIVATE" },
      });

      if (label) {
        // mantener el patrón: envolver el resultado
        res.status(200).json({ label });
      } else {
        res.status(404).json({ error: "Label not found or inactive" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching label" });
    }
  }

  // Create a new label
  public async createLabel(req: Request, res: Response) {
    const { nombre, descripcion, status } = req.body;

    try {
      const body: LabelI = {
        nombre,
        descripcion,
        status, // si quieres forzarlo a 'ACTIVATE' siempre, puedes ignorar status y setearlo aquí
      };

      const newLabel = await Label.create({ ...body } as any);
      res.status(201).json(newLabel);
    } catch (error: any) {
      console.error(error);
      // devolver mensaje de validación si viene de sequelize
      res.status(400).json({ error: error.message || "Error creating label" });
    }
  }

  // Update a label by ID
  public async updateLabel(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { nombre, descripcion, status } = req.body;

    try {
      const body: Partial<LabelI> = {
        nombre,
        descripcion,
        status,
      };

      const labelExist = await Label.findOne({
        where: { id: pk, status: "ACTIVATE" }, // solo actualizar si está activa (mismo patrón que paciente)
      });

      if (labelExist) {
        await labelExist.update(body, { where: { id: pk } });
        res.status(200).json(labelExist);
      } else {
        res.status(404).json({ error: "Label not found or inactive" });
      }
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }

  // Delete label physically (destroy)
  public async deleteLabel(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const labelToDelete = await Label.findByPk(id);

      if (labelToDelete) {
        await labelToDelete.destroy();
        res.status(200).json({ message: "Label deleted successfully" });
      } else {
        res.status(404).json({ error: "Label not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error deleting label" });
    }
  }

  // Delete label logically (mark status = INACTIVE)
  public async deleteLabelAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const labelToUpdate = await Label.findOne({
        where: { id: pk, status: "ACTIVATE" },
      });

      if (labelToUpdate) {
        await labelToUpdate.update({ status: "INACTIVE" });
        res.status(200).json({ message: "Label marked as inactive" });
      } else {
        res.status(404).json({ error: "Label not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error marking label as inactive" });
    }
  }
}
