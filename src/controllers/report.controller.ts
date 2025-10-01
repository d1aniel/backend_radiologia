import { Request, Response } from "express";
import Report, { ReportI } from "../models/Report";

export class ReportController {
  // Obtener todos los informes
  public async getAllReports(req: Request, res: Response) {
    try {
      const reports: ReportI[] = await Report.findAll();
      res.status(200).json({ reports });
    } catch (error) {
      console.error("getAllReports error:", error);
      res.status(500).json({ error: "Error fetching reports" });
    }
  }

  // Obtener un informe por ID
  public async getReportById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const report = await Report.findByPk(pk);

      if (report) {
        res.status(200).json(report);
      } else {
        res.status(404).json({ error: "Report not found" });
      }
    } catch (error) {
      console.error("getReportById error:", error);
      res.status(500).json({ error: "Error fetching report" });
    }
  }

  // Crear un nuevo informe (valida 1:1 con estudioId)
  public async createReport(req: Request, res: Response) {
    try {
      const body = req.body as ReportI;

      // Verificar que no exista otro informe para el mismo estudio (1:1)
      const exists = await Report.findOne({ where: { estudioId: body.estudioId } });
      if (exists) {
        return res.status(400).json({ error: "El estudio ya tiene un informe" });
      }

      const report = await Report.create(body as any);
      res.status(201).json(report);
    } catch (error: any) {
      console.error("createReport error:", error);
      // Si viene de validación de Sequelize, mandar mensaje más claro
      if (error?.name === "SequelizeValidationError" || error?.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Error creating report" });
    }
  }

  // Actualizar un informe por ID
  public async updateReport(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const body = req.body as Partial<ReportI>;

      const report = await Report.findByPk(pk);
      if (!report) {
        return res.status(404).json({ error: "Report not found" });
      }

      // Si vienen cambios en estudioId, asegurarse que no rompa la restricción 1:1
      if (body.estudioId && body.estudioId !== report.estudioId) {
        const exists = await Report.findOne({ where: { estudioId: body.estudioId } });
        if (exists) {
          return res.status(400).json({ error: "El nuevo estudioId ya tiene asociado un informe" });
        }
      }

      await report.update(body as any);
      res.status(200).json(report);
    } catch (error) {
      console.error("updateReport error:", error);
      res.status(500).json({ error: "Error updating report" });
    }
  }

  // Firmar informe (cambiar estado a FIRMADO)
  public async signReport(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const report = await Report.findByPk(pk);
      if (!report) {
        return res.status(404).json({ error: "Report not found" });
      }

      await report.update({ estado: "FIRMADO" } as any);
      res.status(200).json({ message: "Report signed", report });
    } catch (error) {
      console.error("signReport error:", error);
      res.status(500).json({ error: "Error signing report" });
    }
  }

  // Eliminar informe (borrar fila)
  public async deleteReport(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const report = await Report.findByPk(pk);

      if (!report) {
        return res.status(404).json({ error: "Report not found" });
      }

      await report.destroy();
      res.status(200).json({ message: "Report deleted" });
    } catch (error) {
      console.error("deleteReport error:", error);
      res.status(500).json({ error: "Error deleting report" });
    }
  }
}
