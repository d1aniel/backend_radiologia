import { Request, Response } from "express";
import { Technologist, TechnologistAttrs } from "../models/Technologist"; // ajusta ruta si la tienes distinta

export class TechnologistController {
  // Get all technologists with status "ACTIVE"
  public async getAllTechnologists(req: Request, res: Response) {
    try {
      const technologists: TechnologistAttrs[] = await Technologist.findAll({
        where: { status: "ACTIVE" },
      });
      res.status(200).json({ technologists });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching technologists" });
    }
  }

  // Get a technologist by ID (wrapped in an object like en el profe)
  public async getTechnologistById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const technologist = await Technologist.findOne({
        where: { id: pk, status: "ACTIVE" },
      });

      if (technologist) {
        res.status(200).json({ technologist });
      } else {
        res.status(404).json({ error: "Technologist not found or inactive" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching technologist" });
    }
  }

  // Create a new technologist
  public async createTechnologist(req: Request, res: Response) {
    const { nombre, especialidad, telefono, correo, status } = req.body;

    try {
      const body: TechnologistAttrs = {
        nombre,
        especialidad,
        telefono,
        correo,
        status,
      };

      const newTechnologist = await Technologist.create({ ...body } as any);
      res.status(201).json(newTechnologist);
    } catch (error: any) {
      console.error(error);
      // si viene validation error de Sequelize, devolver 400 con el mensaje
      res.status(400).json({ error: error.message });
    }
  }

  // Update a technologist (only if ACTIVE)
  public async updateTechnologist(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { nombre, especialidad, telefono, correo, status } = req.body;

    try {
      const body: TechnologistAttrs = {
        nombre,
        especialidad,
        telefono,
        correo,
        status,
      };

      const technologistExist = await Technologist.findOne({
        where: { id: pk, status: "ACTIVE" },
      });

      if (technologistExist) {
        await technologistExist.update(body, { where: { id: pk } });
        res.status(200).json(technologistExist);
      } else {
        res.status(404).json({ error: "Technologist not found or inactive" });
      }
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }

  // Delete a technologist physically (destroy)
  public async deleteTechnologist(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const technologistToDelete = await Technologist.findByPk(id);

      if (technologistToDelete) {
        await technologistToDelete.destroy();
        res.status(200).json({ message: "Technologist deleted successfully" });
      } else {
        res.status(404).json({ error: "Technologist not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error deleting technologist" });
    }
  }

  // Delete a technologist logically (mark status = INACTIVE)
  public async deleteTechnologistAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const technologistToUpdate = await Technologist.findOne({
        where: { id: pk, status: "ACTIVE" },
      });

      if (technologistToUpdate) {
        await technologistToUpdate.update({ status: "INACTIVE" });
        res.status(200).json({ message: "Technologist marked as inactive" });
      } else {
        res.status(404).json({ error: "Technologist not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error marking technologist as inactive" });
    }
  }
}
