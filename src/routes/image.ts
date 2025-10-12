// src/routes/image.routes.ts
import { Router, Application } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { ImageController } from "../controllers/image.controller";

// Asegurar carpeta uploads/images
const UPLOAD_DIR = path.join(process.cwd(), "uploads", "images");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Configura multer: guarda en /uploads/images con nombre único
const storage = multer.diskStorage({
  destination: (req: Express.Request, file: Express.Multer.File, cb: (err: Error | null, dest: string) => void) => {
    // ya garantizamos que exista UPLOAD_DIR arriba
    cb(null, UPLOAD_DIR);
  },
  filename: (req: Express.Request, file: Express.Multer.File, cb: (err: Error | null, filename: string) => void) => {
    const ts = Date.now();
    const safeName = file.originalname.replace(/\s+/g, "_");
    cb(null, `${ts}_${safeName}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 500 * 1024 * 1024 // 500MB
  },
  fileFilter: (req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowed = /\.(dcm|dicom|jpg|jpeg|png)$/i;
    if (allowed.test(file.originalname)) cb(null, true);
    else cb(new Error("Only DICOM/JPG/PNG files are allowed"));
  }
});

export class ImageRoutes {
  public imageController: ImageController = new ImageController();

  public routes(app: Application): void {
    // Listar (opcional ?estudioId=)
    app.route("/images").get((req, res) => this.imageController.getAllImages(req, res));

    // Obtener por id
    app.route("/images/:id").get((req, res) => this.imageController.getImageById(req, res));

    // Crear con subida de archivo (campo 'file')
    app.route("/images").post(upload.single("file"), (req, res) => this.imageController.createImage(req, res));

    // Actualizar metadatos (no reemplaza archivo)
    app.route("/images/:id").put((req, res) => this.imageController.updateImage(req, res));

    // Eliminar (borra registro y archivo local si existe)
    app.route("/images/:id").delete((req, res) => this.imageController.deleteImage(req, res));
  }
}
