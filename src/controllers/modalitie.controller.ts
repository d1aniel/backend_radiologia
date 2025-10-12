// src/controllers/modalidad.controller.ts
import { Request, Response } from "express";
import { Modalidad, ModalidadI } from "../models/Modalitie"; // ajusta el path/nombre si es Modalitie

export class ModalidadController {
  // Obtener todas las modalidades activas
  public async getAllModalidades(req: Request, res: Response) {
    try {
      const modalidades: ModalidadI[] = await Modalidad.findAll({
        where: { activa: true },
      });
      return res.status(200).json({ modalidades });
    } catch (error) {
      console.error("[getAllModalidades] ", error);
      return res.status(500).json({ error: "Error fetching modalidades" });
    }
  }

  // Obtener modalidad por ID
  public async getModalidadById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

      const modalidad = await Modalidad.findOne({
        where: { id, activa: true },
      });

      if (modalidad) {
        return res.status(200).json({ modalidad });
      } else {
        return res.status(404).json({ error: "Modalidad not found or inactive" });
      }
    } catch (error) {
      console.error("[getModalidadById] ", error);
      return res.status(500).json({ error: "Error fetching modalidad" });
    }
  }

  // Crear nueva modalidad
  public async createModalidad(req: Request, res: Response) {
    try {
      const { nombre, descripcion, activa } = req.body as Partial<ModalidadI>;

      // validación mínima
      if (!nombre || String(nombre).trim().length < 2) {
        return res.status(400).json({ error: "Nombre es obligatorio (mín 2 caracteres)" });
      }
      if (!descripcion || String(descripcion).trim().length < 5) {
        return res.status(400).json({ error: "Descripción es obligatoria (mín 5 caracteres)" });
      }

      const body: Omit<ModalidadI, "id"> = {
        nombre: String(nombre).trim(),
        descripcion: String(descripcion).trim(),
        activa: typeof activa === "boolean" ? activa : true
      };

      const modalidad = await Modalidad.create(body as any);
      return res.status(201).json({ modalidad });
    } catch (error: any) {
      console.error("[createModalidad] ", error);
      // si sequelize lanza validación, devuelvo su mensaje
      return res.status(400).json({ error: error?.message ?? "Error creating modalidad" });
    }
  }

  // Actualizar modalidad por ID
  public async updateModalidad(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

      const body = req.body as Partial<ModalidadI>;

      const modalidad = await Modalidad.findByPk(id);
      if (!modalidad) return res.status(404).json({ error: "Modalidad not found" });

      // Opcional: validar campos si vienen
      if (body.nombre && String(body.nombre).trim().length < 2) {
        return res.status(400).json({ error: "Nombre inválido (mín 2 caracteres)" });
      }
      if (body.descripcion && String(body.descripcion).trim().length < 5) {
        return res.status(400).json({ error: "Descripción inválida (mín 5 caracteres)" });
      }

      await modalidad.update({
        ...(body.nombre !== undefined ? { nombre: String(body.nombre).trim() } : {}),
        ...(body.descripcion !== undefined ? { descripcion: String(body.descripcion).trim() } : {}),
        ...(body.activa !== undefined ? { activa: Boolean(body.activa) } : {})
      });

      return res.status(200).json({ modalidad });
    } catch (error) {
      console.error("[updateModalidad] ", error);
      return res.status(500).json({ error: "Error updating modalidad" });
    }
  }

  // Eliminar (marcar activa = false) — eliminación lógica
  public async deleteModalidad(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

      const modalidad = await Modalidad.findByPk(id);
      if (!modalidad) return res.status(404).json({ error: "Modalidad not found" });

      // Marcar como inactiva
      await modalidad.update({ activa: false });

      return res.status(200).json({ message: "Modalidad marked as inactive" });
    } catch (error) {
      console.error("[deleteModalidad] ", error);
      return res.status(500).json({ error: "Error deleting modalidad" });
    }
  }

  // borrar lógico — marcar activa = false
public async deleteModalidadAdv(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const modalidad = await Modalidad.findOne({ where: { id, activa: true } });
    if (!modalidad) return res.status(404).json({ error: "Modalidad not found or already inactive" });

    await modalidad.update({ activa: false });

    return res.status(200).json({ message: "Modalidad marked as inactive" });
  } catch (error) {
    console.error("[deleteModalidadAdv] ", error);
    return res.status(500).json({ error: "Error marking modalidad as inactive" });
  }
}

}
