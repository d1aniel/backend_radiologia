import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import Image from "../models/Image"; // tu modelo Image
import { ImageI } from "../models/Image";

export class ImageController {
  // Listar imágenes (si pasas ?estudioId=1 filtra por estudio)
  public async getAllImages(req: Request, res: Response) {
    try {
      const { estudioId } = req.query;
      const where: any = {};
      if (estudioId) where.estudioId = Number(estudioId);

      const images: ImageI[] = await Image.findAll({ where });
      res.status(200).json({ images });
    } catch (error) {
      console.error("getAllImages error:", error);
      res.status(500).json({ error: "Error fetching images" });
    }
  }

  // Obtener imagen por id
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
   * Crear imagen (espera multipart/form-data con campo 'file' y otros campos en body)
   * Campos esperados en body:
   * - estudioId (number)
   * - tipo (DICOM|JPG|PNG|Serie)
   * - serie (opcional)
   * - orden (opcional)
   *
   * El middleware multer debe haber procesado el archivo y dejarlo en req.file
   */
  public async createImage(req: Request, res: Response) {
    try {
      // multer coloca info en req.file
      const file = (req as any).file;

      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const { estudioId, tipo, serie, orden } = req.body;

      // construimos los campos
      const newImgPayload: Partial<ImageI> = {
        estudioId: Number(estudioId),
        tipo: (tipo as any) ?? "DICOM",
        url: file.path, // ruta en disco. En produccion podrías guardar URL externa.
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

  // Actualizar metadatos de la imagen (no reemplaza archivo). Si quieres reemplazar archivo, se puede expandir.
  public async updateImage(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const body = req.body as Partial<ImageI>;

      const image = await Image.findByPk(pk);
      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }

      // No permitimos actualizar id/fechaCarga desde body por seguridad
      const allowed: Partial<ImageI> = {
        estudioId: body.estudioId ?? image.estudioId,
        tipo: body.tipo ?? image.tipo,
        nombreArchivo: body.nombreArchivo ?? image.nombreArchivo,
        tamanoBytes: body.tamanoBytes ?? image.tamanoBytes,
        serie: body.serie ?? image.serie,
        orden: body.orden ?? image.orden,
        url: body.url ?? image.url, // si se pasa una nueva url explícita permitimos, pero para reemplazo de archivo preferir separado
      };

      await image.update(allowed as any);
      res.status(200).json(image);
    } catch (error) {
      console.error("updateImage error:", error);
      res.status(500).json({ error: "Error updating image" });
    }
  }

  /**
   * Eliminar imagen:
   * - elimina el archivo físico (si existe en disco y la ruta es local)
   * - elimina el registro en DB
   */
  public async deleteImage(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const image = await Image.findByPk(pk);

      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }

      // intentar borrar archivo si es ruta local
      const filePath = image.url;
      if (filePath && !filePath.startsWith("http")) {
        const absolute = path.isAbsolute(filePath)
          ? filePath
          : path.join(process.cwd(), filePath);

        try {
          if (fs.existsSync(absolute)) {
            fs.unlinkSync(absolute);
          }
        } catch (fsErr) {
          console.warn("Could not delete file:", absolute, fsErr);
          // no bloqueamos la eliminación del registro por un error en el FS
        }
      }

      await image.destroy();
      res.status(200).json({ message: "Image deleted" });
    } catch (error) {
      console.error("deleteImage error:", error);
      res.status(500).json({ error: "Error deleting image" });
    }
  }
}
