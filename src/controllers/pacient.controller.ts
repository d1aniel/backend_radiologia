// src/controllers/patient.controller.ts
import { Request, Response } from "express";
import { Patient, PatientI } from "../models/Pacient"; // <- ajusta la ruta/nombre si tu archivo es Pacient.ts

export class PatientController {
  // Get all patients with status "ACTIVATE"
  public async getAllPatients(req: Request, res: Response) {
    try {
      const patients: PatientI[] = await Patient.findAll({
        where: { status: "ACTIVATE" },
      });
      res.status(200).json({ patients });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching patients" });
    }
  }

  // Get a patient by ID
  public async getPatientById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const patient = await Patient.findOne({
        where: { id: pk, status: "ACTIVATE" },
      });

      if (patient) {
        // el profe envuelve el resultado en un objeto
        res.status(200).json({ patient });
      } else {
        res.status(404).json({ error: "Patient not found or inactive" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching patient" });
    }
  }

  // Create a new patient
  public async createPatient(req: Request, res: Response) {
    const {
      nombre,
      apellido,
      tpdocumento,
      sexo,
      documento,
      telefono,
      eps,
      correo,
      status,
    } = req.body;

    try {
      const body: PatientI = {
        nombre,
        apellido,
        tpdocumento,
        sexo,
        documento,
        telefono,
        eps,
        correo,
        status,
      };

      const newPatient = await Patient.create({ ...body } as any);
      res.status(201).json(newPatient);
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }

  // Update a patient (only if ACTIVE)
  public async updatePatient(req: Request, res: Response) {
    const { id: pk } = req.params;
    const {
      nombre,
      apellido,
      tpdocumento,
      sexo,
      documento,
      telefono,
      eps,
      correo,
      status,
    } = req.body;

    try {
      const body: PatientI = {
        nombre,
        apellido,
        tpdocumento,
        sexo,
        documento,
        telefono,
        eps,
        correo,
        status,
      };

      const patientExist = await Patient.findOne({
        where: { id: pk, status: "ACTIVATE" },
      });

      if (patientExist) {
        await patientExist.update(body, { where: { id: pk } });
        res.status(200).json(patientExist);
      } else {
        res.status(404).json({ error: "Patient not found or inactive" });
      }
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }

  // Delete a patient physically (destroy)
  public async deletePatient(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const patientToDelete = await Patient.findByPk(id);

      if (patientToDelete) {
        await patientToDelete.destroy();
        res.status(200).json({ message: "Patient deleted successfully" });
      } else {
        res.status(404).json({ error: "Patient not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error deleting patient" });
    }
  }

  // Delete a patient logically (mark status = INACTIVE)
  public async deletePatientAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const patientToUpdate = await Patient.findOne({
        where: { id: pk, status: "ACTIVATE" },
      });

      if (patientToUpdate) {
        await patientToUpdate.update({ status: "INACTIVE" });
        res.status(200).json({ message: "Patient marked as inactive" });
      } else {
        res.status(404).json({ error: "Patient not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error marking patient as inactive" });
    }
  }
}
