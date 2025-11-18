
import { Request, Response } from "express";
import { Doctor, DoctorI } from "../models/Doctor"; 

export class DoctorController {
  
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

  
  public async createDoctor(req: Request, res: Response) {
    const { nombre, especialidad, telefono, correo, registro, status } = req.body;

    try {
      const body: DoctorI = {
        nombre,
        especialidad,
        telefono: String(telefono),
        correo,
        registro: registro || null,
        
        status: "ACTIVATE",
      };

      const newDoctor = await Doctor.create({ ...body } as any);
      res.status(201).json(newDoctor);
    } catch (error: any) {
      console.error(error);
      
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
