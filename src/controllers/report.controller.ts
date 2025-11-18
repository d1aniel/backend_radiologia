import { Request, Response } from "express";
import Report, { ReportI } from "../models/Report"; 

export class ReportController {
  
  public async getAllReports(req: Request, res: Response) {
    try {
      const reports: ReportI[] = await Report.findAll();
      res.status(200).json({ reports });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching reports" });
    }
  }

  
  public async getReportById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const report = await Report.findByPk(pk);

      if (report) {
        
        res.status(200).json({ report });
      } else {
        res.status(404).json({ error: "Report not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching report" });
    }
  }

  
  public async createReport(req: Request, res: Response) {
    try {
      
      
      const {
        estudio_id,
        estudioId,
        estado,
        cuerpo,
        medico_id,
        medicoId,
      } = req.body as any;

      const finalEstudioId: number | undefined = estudio_id ?? estudioId;
      const finalMedicoId: number | undefined = medico_id ?? medicoId;

      if (!finalEstudioId) {
        return res.status(400).json({ error: "estudio_id es obligatorio" });
      }
      if (!finalMedicoId) {
        return res.status(400).json({ error: "medico_id es obligatorio" });
      }

      
      const body: ReportI = {
        estudioId: finalEstudioId,
        estado,
        cuerpo,
        medicoId: finalMedicoId,
      };

      
      const exists = await Report.findOne({
        where: { estudioId: body.estudioId },
      });
      if (exists) {
        return res
          .status(400)
          .json({ error: "El estudio ya tiene un informe" });
      }

      const newReport = await Report.create(body as any);
      res.status(201).json(newReport);
    } catch (error: any) {
      console.error(error);
      
      if (
        error?.name === "SequelizeValidationError" ||
        error?.name === "SequelizeUniqueConstraintError"
      ) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Error creating report" });
    }
  }

  
  public async updateReport(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;

      
      const {
        estudio_id,
        estudioId,
        estado,
        cuerpo,
        medico_id,
        medicoId,
      } = req.body as any;

      const newEstudioId: number | undefined = estudio_id ?? estudioId;
      const newMedicoId: number | undefined = medico_id ?? medicoId;

      const report = await Report.findByPk(pk);
      if (!report) {
        return res.status(404).json({ error: "Report not found" });
      }

      
      if (
        typeof newEstudioId !== "undefined" &&
        newEstudioId !== report.estudioId
      ) {
        const exists = await Report.findOne({
          where: { estudioId: newEstudioId },
        });
        if (exists) {
          return res.status(400).json({
            error: "El nuevo estudio ya tiene asociado un informe",
          });
        }
      }

      
      const patch: Partial<ReportI> = {};
      if (typeof newEstudioId !== "undefined") patch.estudioId = newEstudioId;
      if (typeof estado !== "undefined") patch.estado = estado;
      if (typeof cuerpo !== "undefined") patch.cuerpo = cuerpo;
      if (typeof newMedicoId !== "undefined") patch.medicoId = newMedicoId;

      await report.update(patch as any);
      res.status(200).json(report);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating report" });
    }
  }

  
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
      console.error(error);
      res.status(500).json({ error: "Error signing report" });
    }
  }

  
  public async deleteReport(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const reportToDelete = await Report.findByPk(id);

      if (reportToDelete) {
        await reportToDelete.destroy();
        res.status(200).json({ message: "Report deleted successfully" });
      } else {
        res.status(404).json({ error: "Report not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error deleting report" });
    }
  }

  
  public async deleteReportAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const reportToUpdate = await Report.findByPk(pk);

      if (reportToUpdate) {
        
        await reportToUpdate.update({ estado: "BORRADOR" } as any);
        res.status(200).json({ message: "Report marked as borrador" });
      } else {
        res.status(404).json({ error: "Report not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error marking report" });
    }
  }
}
