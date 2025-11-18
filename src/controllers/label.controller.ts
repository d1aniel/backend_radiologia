
import { Request, Response } from "express";
import { Label, LabelI } from "../models/Label";

export class LabelController {
  
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

  
  public async getLabelById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const label = await Label.findOne({
        where: { id: pk, status: "ACTIVATE" },
      });

      if (label) {
        
        res.status(200).json({ label });
      } else {
        res.status(404).json({ error: "Label not found or inactive" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching label" });
    }
  }

  
  public async createLabel(req: Request, res: Response) {
    const { nombre, descripcion, status } = req.body;

    try {
      const body: LabelI = {
        nombre,
        descripcion,
        status, 
      };

      const newLabel = await Label.create({ ...body } as any);
      res.status(201).json(newLabel);
    } catch (error: any) {
      console.error(error);
      
      res.status(400).json({ error: error.message || "Error creating label" });
    }
  }

  
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
        where: { id: pk, status: "ACTIVATE" }, 
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
