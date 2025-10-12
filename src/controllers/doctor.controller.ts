// src/controllers/doctor.controller.ts
import { Request, Response } from "express";
import { Doctor, DoctorI } from "../models/Doctor"; // ajusta la ruta si tu archivo se llama diferente

export class DoctorController {
  // Get all doctors with status "ACTIVATE"
  public async getAllDoctors(req: Request, res: Response) {
    try {
      const doctors: DoctorI[] = await Doctor.findAll({
        where: { status: "ACTIVATE" },
      });
      res.status(200).json({ doctors });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching doctors" });
    }
  }

  // Get a doctor by ID (only if ACTIVATE)
  public async getDoctorById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const doctor = await Doctor.findOne({
        where: { id: pk, status: "ACTIVATE" },
      });

      if (doctor) {
        res.status(200).json({ doctor });
      } else {
        res.status(404).json({ error: "Doctor not found or inactive" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching doctor" });
    }
  }

  // Create a new doctor (status default ACTIVATE)
  public async createDoctor(req: Request, res: Response) {
    const { nombre, especialidad, telefono, correo, registro, status } = req.body;

    try {
      const body: DoctorI = {
        nombre,
        especialidad,
        telefono: String(telefono),
        correo,
        registro: registro || null,
        // forzamos ACTIVATE en caso de que venga otro valor (coincide con frontend)
        status: "ACTIVATE",
      };

      const newDoctor = await Doctor.create({ ...body } as any);
      res.status(201).json(newDoctor);
    } catch (error: any) {
      console.error(error);
      // Manejo simple de errores provenientes de Sequelize
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ error: "Correo ya registrado" });
      }
      if (error.name === "SequelizeValidationError") {
        const messages = error.errors?.map((e: any) => e.message) || error.message;
        return res.status(400).json({ error: messages });
      }
      res.status(400).json({ error: error.message || "Error creating doctor" });
    }
  }

  // Update a doctor (only if ACTIVATE)
  public async updateDoctor(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { nombre, especialidad, telefono, correo, registro, status } = req.body;

    try {
      const body: Partial<DoctorI> = {};
      if (nombre !== undefined) body.nombre = nombre;
      if (especialidad !== undefined) body.especialidad = especialidad;
      if (telefono !== undefined) body.telefono = String(telefono);
      if (correo !== undefined) body.correo = correo;
      if (registro !== undefined) body.registro = registro;
      if (status !== undefined) body.status = status;

      const doctorExist = await Doctor.findOne({
        where: { id: pk, status: "ACTIVATE" },
      });

      if (doctorExist) {
        await doctorExist.update(body as any, { where: { id: pk } });
        res.status(200).json(doctorExist);
      } else {
        res.status(404).json({ error: "Doctor not found or inactive" });
      }
    } catch (error: any) {
      console.error(error);
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ error: "Correo ya registrado" });
      }
      if (error.name === "SequelizeValidationError") {
        const messages = error.errors?.map((e: any) => e.message) || error.message;
        return res.status(400).json({ error: messages });
      }
      res.status(400).json({ error: error.message || "Error updating doctor" });
    }
  }

  // Delete a doctor physically (destroy)
  public async deleteDoctor(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const doctorToDelete = await Doctor.findByPk(id);

      if (doctorToDelete) {
        await doctorToDelete.destroy();
        res.status(200).json({ message: "Doctor deleted successfully" });
      } else {
        res.status(404).json({ error: "Doctor not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error deleting doctor" });
    }
  }

  // Delete a doctor logically (mark status = INACTIVE)
  public async deleteDoctorAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const doctorToUpdate = await Doctor.findOne({
        where: { id: pk, status: "ACTIVATE" },
      });

      if (doctorToUpdate) {
        await doctorToUpdate.update({ status: "INACTIVE" });
        res.status(200).json({ message: "Doctor marked as inactive" });
      } else {
        res.status(404).json({ error: "Doctor not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error marking doctor as inactive" });
    }
  }
}
