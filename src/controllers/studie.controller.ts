import { Request, Response } from "express";
import { Study, StudyI } from "../models/Studie";
import { Patient } from "../models/Pacient";
import { Label } from "../models/Label";

export class StudyController {
  // Obtener todos los estudios activos (incluye paciente, labels, imagenes)
  public async getAllStudies(req: Request, res: Response) {
    try {
      const studies = await Study.findAll({
        where: { status: "ACTIVE" },
        include: [
          { model: Patient, as: "patient" },   // si en tu modelo la alias es distinto ajústalo
          { model: Label, as: "labels" },      // incluir etiquetas asociadas
          // { model: Image, as: 'imagenes' }   // si quieres imágenes inclúyelo
        ],
      });

      res.status(200).json({ studies });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching studies" });
    }
  }

  // Obtener un estudio por ID
  public async getStudyById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const study = await Study.findOne({
        where: { id: pk, status: "ACTIVE" },
        include: [
          { model: Patient, as: "patient" },
          { model: Label, as: "labels" },
          // { model: Image, as: 'imagenes' }
        ],
      });

      if (study) {
        res.status(200).json(study);
      } else {
        res.status(404).json({ error: "Study not found or inactive" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching study" });
    }
  }

  // Crear un nuevo estudio
  // body esperado: StudyI fields (patient_id, modalidad, equipo, fechaHora (ISO), prioridad, motivo, tecnologo?, medico?) 
  // opcional: labels: number[] (IDs de etiquetas)
  public async createStudy(req: Request, res: Response) {
    try {
      const body = req.body as Partial<StudyI> & { labels?: number[] };

      // Validación básica: patient_id debe existir y paciente activo
      if (!body.patient_id) {
        return res.status(400).json({ error: "patient_id is required" });
      }

      const patient = await Patient.findOne({ where: { id: body.patient_id, status: "ACTIVE" } });
      if (!patient) {
        return res.status(400).json({ error: "Patient not found or inactive" });
      }

      // crea el estudio (si fechaHora viene como string ISO, Sequelize lo acepta o conviértelo)
      const studyPayload: StudyI = {
        patient_id: body.patient_id,
        modalidad: body.modalidad!,
        equipo: body.equipo!,
        tecnologo: body.tecnologo ?? null,
        medico: body.medico ?? null,
        fechaHora: body.fechaHora ? new Date(body.fechaHora) : new Date(),
        prioridad: (body.prioridad ?? "MEDIA") as StudyI["prioridad"],
        motivo: body.motivo!,
        status: "ACTIVE",
      };

      const newStudy = await Study.create(studyPayload);

      // Si vienen etiquetas (labels) asociarlas (reemplaza las existentes)
      if (Array.isArray(body.labels) && body.labels.length > 0) {
        // labels deben existir: opcional validación
        const existingLabels = await Label.findAll({ where: { id: body.labels } });
        const existingIds = existingLabels.map(l => l.id);

        // Usa el alias de la asociación: en tu modelo definiste as: 'labels'
        // si se usa 'etiquetas' ajusta a esa clave
        await (newStudy as any).$set("labels", existingIds);
      }

      // Recupera el estudio creado con includes para retornar datos completos
      const created = await Study.findByPk(newStudy.id, {
        include: [
          { model: Patient, as: "patient" },
          { model: Label, as: "labels" },
        ],
      });

      res.status(201).json(created);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating study" });
    }
  }

  // Actualizar un estudio por ID (y opcionalmente reemplazar labels)
  public async updateStudy(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const body = req.body as Partial<StudyI> & { labels?: number[] };

      const study = await Study.findByPk(pk);
      if (!study) {
        return res.status(404).json({ error: "Study not found" });
      }

      // Si se intenta cambiar patient_id validar existencia
      if (body.patient_id) {
        const patient = await Patient.findOne({ where: { id: body.patient_id, status: "ACTIVE" } });
        if (!patient) {
          return res.status(400).json({ error: "Patient not found or inactive" });
        }
      }

      // Actualizar campos permitidos
      await study.update({
        patient_id: body.patient_id ?? study.patient_id,
        modalidad: body.modalidad ?? study.modalidad,
        equipo: body.equipo ?? study.equipo,
        tecnologo: body.tecnologo ?? study.tecnologo ?? null,
        medico: body.medico ?? study.medico ?? null,
        fechaHora: body.fechaHora ? new Date(body.fechaHora) : study.fechaHora,
        prioridad: (body.prioridad ?? study.prioridad) as StudyI["prioridad"],
        motivo: body.motivo ?? study.motivo,
      });

      // Reemplazar etiquetas si vienen en el body
      if (Array.isArray(body.labels)) {
        const existingLabels = await Label.findAll({ where: { id: body.labels } });
        const existingIds = existingLabels.map(l => l.id);
        await (study as any).$set("labels", existingIds);
      }

      const updated = await Study.findByPk(pk, {
        include: [
          { model: Patient, as: "patient" },
          { model: Label, as: "labels" },
        ],
      });

      res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating study" });
    }
  }

  // Eliminar estudio: marcar status = INACTIVE
  public async deleteStudy(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const study = await Study.findByPk(pk);

      if (!study) {
        return res.status(404).json({ error: "Study not found" });
      }

      await study.update({ status: "INACTIVE" });
      res.status(200).json({ message: "Study set to INACTIVE" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error deleting study" });
    }
  }
}