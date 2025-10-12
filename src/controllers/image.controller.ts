// src/controllers/image.controller.ts
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import Image, { ImageI } from "../models/Image";
import { Study } from "../models/Studie"; // ajusta si tu archivo/model se llama distinto

export class ImageController {
  // Listar imágenes activas (si pasas ?estudioId=1 filtra por estudio)
  public async getAllImages(req: Request, res: Response) {
    try {
      const { estudioId } = req.query;
      const where: any = { status: "ACTIVE" }; // solo activas por defecto

      if (estudioId) where.estudioId = Number(estudioId);

      const images: ImageI[] = await Image.findAll({ where });
      res.status(200).json({ images });
    } catch (error) {
      console.error("getAllImages error:", error);
      res.status(500).json({ error: "Error fetching images" });
    }
  }

  // Obtener imagen por id (no filtra por status para permitir ver INACTIVE si se necesita)
  public async getImageById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const image = await Image.findByPk(pk);

      if (image) {
        res.status(200).json(image);
      } else {
        res.status(404).json({ error: "Image not found" });
      }
    } catch (error) {
      console.error("getImageById error:", error);
      res.status(500).json({ error: "Error fetching image" });
    }
  }

  /**
   * createImage espera multipart/form-data con campo 'file' (multer)
   * body: estudioId, tipo, serie?, orden?
   */
  public async createImage(req: Request, res: Response) {
    try {
      const file = (req as Request & { file?: Express.Multer.File }).file;

      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const { estudioId, tipo, serie, orden } = req.body;

      if (!estudioId) {
        // borra el archivo subido si no hay estudioId
        try { if (file.path && fs.existsSync(file.path)) fs.unlinkSync(file.path); } catch {}
        return res.status(400).json({ error: "estudioId is required" });
      }

      const study = await Study.findByPk(Number(estudioId));
      if (!study) {
        try { if (file.path && fs.existsSync(file.path)) fs.unlinkSync(file.path); } catch {}
        return res.status(400).json({ error: "Study (estudio) not found" });
      }

      const newImgPayload: Partial<ImageI> = {
        estudioId: Number(estudioId),
        tipo: (tipo as any) ?? "DICOM",
        url: file.path,
        nombreArchivo: file.originalname,
        tamanoBytes: file.size,
        serie: serie ?? null,
        orden: orden != null ? Number(orden) : null,
      };

      const created = await Image.create(newImgPayload as any);
      res.status(201).json(created);
    } catch (error) {
      console.error("createImage error:", error);
      res.status(500).json({ error: "Error creating image" });
    }
  }

  // Actualizar metadatos de la imagen (no reemplaza archivo)
  public async updateImage(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const body = req.body as Partial<ImageI>;

      const image = await Image.findByPk(pk);
      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }

      const allowed: Partial<ImageI> = {
        estudioId: body.estudioId ?? image.estudioId,
        tipo: body.tipo ?? image.tipo,
        nombreArchivo: body.nombreArchivo ?? image.nombreArchivo,
        tamanoBytes: body.tamanoBytes ?? image.tamanoBytes,
        serie: body.serie ?? image.serie,
        orden: body.orden ?? image.orden,
        url: body.url ?? image.url,
      };

      await image.update(allowed as any);
      res.status(200).json(image);
    } catch (error) {
      console.error("updateImage error:", error);
      res.status(500).json({ error: "Error updating image" });
    }
  }

  // Eliminación física: borra archivo del disco (si ruta local) y elimina registro
  public async deleteImage(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const image = await Image.findByPk(pk);

      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }

      const filePath = image.url;
      if (filePath && !filePath.startsWith("http")) {
        const absolute = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
        try {
          if (fs.existsSync(absolute)) {
            fs.unlinkSync(absolute);
          }
        } catch (fsErr) {
          console.warn("Could not delete file:", absolute, fsErr);
        }
      }

      await image.destroy();
      res.status(200).json({ message: "Image deleted" });
    } catch (error) {
      console.error("deleteImage error:", error);
      res.status(500).json({ error: "Error deleting image" });
    }
  }

  // Eliminación lógica: marca status = 'INACTIVE'
  public async deleteImageAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const image = await Image.findByPk(pk);

      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }

      await image.update({ status: "INACTIVE" } as any);
      res.status(200).json({ message: "Image marked as INACTIVE" });
    } catch (error) {
      console.error("deleteImageAdv error:", error);
      res.status(500).json({ error: "Error marking image as inactive" });
    }
  }
}
