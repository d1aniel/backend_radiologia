import { Request, Response } from "express";
import { Modalidad, ModalidadI } from "../models/Modalitie";

export class ModalidadController {
  // Obtener todas las modalidades activas
  public async getAllModalidades(req: Request, res: Response) {
    try {
      const modalidades: ModalidadI[] = await Modalidad.findAll({
        where: { activa: true },
      });
      res.status(200).json({ modalidades });
    } catch (error) {
      res.status(500).json({ error: "Error fetching modalidades" });
    }
  }

  // Obtener modalidad por ID
  public async getModalidadById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const modalidad = await Modalidad.findOne({
        where: { id: pk, activa: true },
      });

      if (modalidad) {
        res.status(200).json(modalidad);
      } else {
        res.status(404).json({ error: "Modalidad not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching modalidad" });
    }
  }

  // Crear nueva modalidad
  public async createModalidad(req: Request, res: Response) {
    try {
      const body = req.body as ModalidadI;
      const modalidad = await Modalidad.create(body as any);
      res.status(201).json(modalidad);
    } catch (error) {
      res.status(500).json({ error: "Error creating modalidad" });
    }
  }

  // Actualizar modalidad por ID
  public async updateModalidad(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const body = req.body as Partial<ModalidadI>;

      const modalidad = await Modalidad.findByPk(pk);
      if (!modalidad) {
        return res.status(404).json({ error: "Modalidad not found" });
      }

      await modalidad.update(body);
      res.status(200).json(modalidad);
    } catch (error) {
      res.status(500).json({ error: "Error updating modalidad" });
    }
  }

  // Eliminar (cambiar activa a false)
  public async deleteModalidad(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const modalidad = await Modalidad.findByPk(pk);

      if (!modalidad) {
        return res.status(404).json({ error: "Modalidad not found" });
      }

      await modalidad.update({ activa: false });
      res.status(200).json({ message: "Modalidad set to INACTIVE" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting modalidad" });
    }
  }
}
