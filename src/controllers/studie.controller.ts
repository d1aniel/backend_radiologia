
import { Request, Response } from "express";
import sequelize from "../database/connection";
import { Prioridad, Study } from "../models/Studie";
import { Patient } from "../models/Pacient";
import { Label } from "../models/Label";
import { Doctor } from "../models/Doctor";
import { Technologist } from "../models/Technologist";
import { Modalidad } from "../models/Modalitie";
import { Team } from "../models/Team";
import { Image } from "../models/Image";
import { Quote } from "../models/Quote";

const STUDY_INCLUDE = [
  { model: Patient, as: "patient", attributes: ["id", "nombre", "apellido", "documento"] },
  { model: Doctor, as: "doctor", attributes: ["id", "nombre"] },
  { model: Technologist, as: "technologist_user", attributes: ["id", "nombre"] },
  { model: Modalidad, as: "modalidad_obj", attributes: ["id", "nombre"] },
  { model: Team, as: "team_obj", attributes: ["id", "nombre"] },
  { model: Quote, as: "cita_obj", attributes: ["id"] },
  { model: Image, as: "imagenes", attributes: ["id", "url", "nombreArchivo", "tipo"] },
  { model: Label, as: "labels", attributes: ["id", "nombre"], through: { attributes: [] } },
];

export class StudyController {
  
  public async getAllStudies(req: Request, res: Response) {
    try {
      const studies = await Study.findAll({
        where: { status: "ACTIVE" },
        include: STUDY_INCLUDE,
        order: [["fechaHora", "DESC"]],
      });
      res.status(200).json({ studies });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching studies" });
    }
  }

  
  public async getStudyById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const study = await Study.findOne({
        where: { id: pk, status: "ACTIVE" },
        include: STUDY_INCLUDE,
      });
      if (!study) return res.status(404).json({ error: "Study not found or inactive" });
      res.status(200).json({ study });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching study" });
    }
  }

  
  
  public async createStudy(req: Request, res: Response) {
    const {
      patient_id,
      modality_id,
      team_id,
      technologist_id = null,
      medico_id = null,
      quote_id = null,
      fechaHora,
      prioridad = "MEDIA",
      motivo,
      status = "ACTIVE",
      labels = [],
    } = req.body;

    try {
      if (!patient_id) return res.status(400).json({ error: "patient_id is required" });
      if (!modality_id) return res.status(400).json({ error: "modality_id is required" });
      if (!team_id) return res.status(400).json({ error: "team_id is required" });
      if (!fechaHora) return res.status(400).json({ error: "fechaHora is required" });
      if (!motivo) return res.status(400).json({ error: "motivo is required" });

      console.log("[createStudy] req.body:", req.body);

      
      const patient = await Patient.findOne({ where: { id: patient_id, status: "ACTIVATE" } });
      if (!patient) return res.status(400).json({ error: "Patient not found or inactive" });

      
      const modality = await Modalidad.findByPk(modality_id);
      if (!modality) {
        return res.status(400).json({ error: "Modality not found" });
      }

      
      const team = await Team.findByPk(team_id);
      if (!team) {
        return res.status(400).json({ error: "Team not found" });
      }

      
      let medicoNombre: string | null = null;
      if (medico_id) {
        const doctor = await Doctor.findByPk(medico_id);
        if (!doctor) {
          return res.status(400).json({ error: "Doctor not found" });
        }
        medicoNombre = (doctor as any).nombre;
      }

      
      let tecnologoNombre: string | null = null;
      if (technologist_id) {
        const tecn = await Technologist.findByPk(technologist_id);
        if (!tecn) {
          return res.status(400).json({ error: "Technologist not found" });
        }
        tecnologoNombre = (tecn as any).nombre;
      }

      
      const validPriorities = ["BAJA", "MEDIA", "ALTA", "URGENTE"] as const;
      let prioridadFinal: Prioridad = "MEDIA";

      if (prioridad && typeof prioridad === "string") {
        const upper = prioridad.toUpperCase();
        if (!validPriorities.includes(upper as Prioridad)) {
          return res.status(400).json({ error: `prioridad inválida: ${prioridad}` });
        }
        prioridadFinal = upper as Prioridad;
      }

      
      const fecha = new Date(fechaHora);
      if (isNaN(fecha.getTime())) {
        return res.status(400).json({ error: `fechaHora inválida: ${fechaHora}` });
      }

      const transaction = await sequelize.transaction();
      try {
        const newStudy = await Study.create(
          {
            patient_id,
            modality_id,
            team_id,
            technologist_id,
            medico_id,
            quote_id,
            fechaHora: fecha,
            prioridad: prioridadFinal,
            motivo,
            status: status === "INACTIVE" ? "INACTIVE" : "ACTIVE",

            modalidad: (modality as any).nombre,
            equipo: (team as any).nombre,
            medico: medicoNombre,
            tecnologo: tecnologoNombre,
          },
          { transaction }
        );

        if (Array.isArray(labels) && labels.length > 0) {
          const existing = await Label.findAll({ where: { id: labels } });
          const ids = existing.map(l => l.id);
          await (newStudy as any).setLabels(ids, { transaction }); 
        }

        await transaction.commit();

        const created = await Study.findByPk(newStudy.id, { include: STUDY_INCLUDE });
        return res.status(201).json({ study: created });
      } catch (error: any) {
        await transaction.rollback();
        console.error("[createStudy] Sequelize error:", error?.name, error?.message);
        console.error(error);
        return res.status(500).json({ error: "Error creating study", details: error?.message });
      }
    } catch (error) {
      console.error("[createStudy] Outer error:", error);
      return res.status(500).json({ error: "Error creating study" });
    }
  }

  
  public async updateStudy(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const {
        patient_id,
        modality_id,
        team_id,
        technologist_id,
        medico_id,
        quote_id,
        fechaHora,
        prioridad,
        motivo,
        status,
        labels,
      } = req.body;

      const study = await Study.findByPk(pk);
      if (!study) return res.status(404).json({ error: "Study not found" });

      
      if (patient_id) {
        const patient = await Patient.findOne({ where: { id: patient_id, status: "ACTIVATE" } });
        if (!patient) return res.status(400).json({ error: "Patient not found or inactive" });
      }

      
      let modalidadNombre = study.modalidad;
      if (modality_id) {
        const modality = await Modalidad.findByPk(modality_id);
        if (!modality) {
          return res.status(400).json({ error: "Modality not found" });
        }
        modalidadNombre = (modality as any).nombre;
      }

      let equipoNombre = study.equipo;
      if (team_id) {
        const team = await Team.findByPk(team_id);
        if (!team) {
          return res.status(400).json({ error: "Team not found" });
        }
        equipoNombre = (team as any).nombre;
      }

      let medicoNombre: string | null = study.medico ?? null;
      if (medico_id) {
        const doctor = await Doctor.findByPk(medico_id);
        if (!doctor) {
          return res.status(400).json({ error: "Doctor not found" });
        }
        medicoNombre = (doctor as any).nombre;
      }

      let tecnologoNombre: string | null = study.tecnologo ?? null;
      if (technologist_id) {
        const tecn = await Technologist.findByPk(technologist_id);
        if (!tecn) {
          return res.status(400).json({ error: "Technologist not found" });
        }
        tecnologoNombre = (tecn as any).nombre;
      }

      
      let prioridadFinal: Prioridad = study.prioridad;
      if (prioridad) {
        const validPriorities = ["BAJA", "MEDIA", "ALTA", "URGENTE"] as const;
        const upper = String(prioridad).toUpperCase();
        if (!validPriorities.includes(upper as Prioridad)) {
          return res.status(400).json({ error: `prioridad inválida: ${prioridad}` });
        }
        prioridadFinal = upper as Prioridad;
      }

      const transaction = await sequelize.transaction();
      try {
        await study.update(
          {
            patient_id: patient_id ?? study.patient_id,
            modality_id: modality_id ?? (study as any).modality_id,
            team_id: team_id ?? (study as any).team_id,
            technologist_id: technologist_id ?? (study as any).technologist_id,
            medico_id: medico_id ?? (study as any).medico_id,
            quote_id: quote_id ?? (study as any).quote_id,
            fechaHora: fechaHora ? new Date(fechaHora) : study.fechaHora,
            prioridad: prioridadFinal,
            motivo: motivo ?? study.motivo,
            status: status ?? study.status,

            modalidad: modalidadNombre,
            equipo: equipoNombre,
            medico: medicoNombre,
            tecnologo: tecnologoNombre,
          },
          { transaction }
        );

        if (Array.isArray(labels)) {
          const existing = await Label.findAll({ where: { id: labels } });
          const ids = existing.map(l => l.id);
          await (study as any).setLabels(ids, { transaction }); 
        }

        await transaction.commit();

        const updated = await Study.findByPk(pk, { include: STUDY_INCLUDE });
        return res.status(200).json({ study: updated });
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating study" });
    }
  }

  
  public async deleteStudy(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const study = await Study.findByPk(pk);
      if (!study) return res.status(404).json({ error: "Study not found" });

      await study.update({ status: "INACTIVE" });
      res.status(200).json({ message: "Study marked as INACTIVE" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error deleting study" });
    }
  }
}
