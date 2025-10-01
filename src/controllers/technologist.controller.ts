import { Request, Response } from "express";
import { Technologist, TechnologistI } from "../models/Technologist";

export class TechnologistController {
  // Obtener todos los tecnólogos activos
  public async getAllTechnologists(req: Request, res: Response) {
    try {
      const technologists: TechnologistI[] = await Technologist.findAll({
        where: { status: "ACTIVE" },
      });
      res.status(200).json({ technologists });
    } catch (error) {
      res.status(500).json({ error: "Error fetching technologists" });
    }
  }

  // Obtener un tecnólogo por ID
  public async getTechnologistById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const technologist = await Technologist.findOne({
        where: { id: pk, status: "ACTIVE" },
      });

      if (technologist) {
        res.status(200).json(technologist);
      } else {
        res.status(404).json({ error: "Technologist not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching technologist" });
    }
  }

  // Crear un nuevo tecnólogo
  public async createTechnologist(req: Request, res: Response) {
    try {
      const body = req.body as TechnologistI;
      const technologist = await Technologist.create(body as any);
      res.status(201).json(technologist);
    } catch (error) {
      res.status(500).json({ error: "Error creating technologist" });
    }
  }

  // Actualizar un tecnólogo por ID
  public async updateTechnologist(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const body = req.body as Partial<TechnologistI>;

      const technologist = await Technologist.findByPk(pk);
      if (!technologist) {
        return res.status(404).json({ error: "Technologist not found" });
      }

      await technologist.update(body);
      res.status(200).json(technologist);
    } catch (error) {
      res.status(500).json({ error: "Error updating technologist" });
    }
  }

  // Eliminar (cambiar status a INACTIVE)
  public async deleteTechnologist(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const technologist = await Technologist.findByPk(pk);

      if (!technologist) {
        return res.status(404).json({ error: "Technologist not found" });
      }

      await technologist.update({ status: "INACTIVE" });
      res.status(200).json({ message: "Technologist set to INACTIVE" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting technologist" });
    }
  }
}
