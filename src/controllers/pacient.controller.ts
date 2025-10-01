import { Request, Response } from "express";
import { Patient, PatientI } from "../models/Pacient";

export class PatientController {
  // Obtener todos los pacientes activos
  public async getAllPatients(req: Request, res: Response) {
    try {
      const patients: PatientI[] = await Patient.findAll({
        where: { status: "ACTIVATE" },
      });
      res.status(200).json({ patients });
    } catch (error) {
      res.status(500).json({ error: "Error fetching patients" });
    }
  }

  // Obtener un paciente por ID
  public async getPatientById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const patient = await Patient.findOne({
        where: { id: pk, status: "ACTIVATE" },
      });

      if (patient) {
        res.status(200).json(patient);
      } else {
        res.status(404).json({ error: "Patient not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching patient" });
    }
  }

  // Crear un nuevo paciente
  public async createPatient(req: Request, res: Response) {
    try {
      const body = req.body as PatientI;
      const patient = await Patient.create(body as any);
      res.status(201).json(patient);
    } catch (error) {
      res.status(500).json({ error: "Error creating patient" });
    }
  }

  // Actualizar un paciente por ID
  public async updatePatient(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const body = req.body as Partial<PatientI>;

      const patient = await Patient.findByPk(pk);
      if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
      }

      await patient.update(body);
      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json({ error: "Error updating patient" });
    }
  }

  // Eliminar (cambiar status a INACTIVE)
  public async deletePatient(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const patient = await Patient.findByPk(pk);

      if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
      }

      await patient.update({ status: "INACTIVE" });
      res.status(200).json({ message: "Patient set to INACTIVE" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting patient" });
    }
  }
}
