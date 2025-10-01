import { Router, Application } from "express";
import multer from "multer";
import path from "path";
import { ImageController } from "../controllers/image.controller";

// Configura multer: guarda en /uploads/images con nombre único
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), "uploads", "images");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ts = Date.now();
    const safeName = file.originalname.replace(/\s+/g, "_");
    cb(null, `${ts}_${safeName}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 500 * 1024 * 1024 // 500MB, ajusta según necesites
  },
  fileFilter: (req, file, cb) => {
    // acepta DICOM (ext .dcm) y png/jpg
    const allowed = /\.(dcm|dicom|jpg|jpeg|png)$/i;
    if (allowed.test(file.originalname)) cb(null, true);
    else cb(new Error("Only DICOM/JPG/PNG files are allowed"));
  }
});

export class ImageRoutes {
  public imageController: ImageController = new ImageController();

  public routes(app: Application): void {
    // Listar (opcional ?estudioId=)
    app.route("/images").get(this.imageController.getAllImages);

    // Obtener por id
    app.route("/images/:id").get(this.imageController.getImageById);

    // Crear con subida de archivo (campo 'file')
    app.route("/images").post(upload.single("file"), this.imageController.createImage);

    // Actualizar metadatos (no reemplaza archivo)
    app.route("/images/:id").put(this.imageController.updateImage);

    // Eliminar (borra registro y archivo local si existe)
    app.route("/images/:id").delete(this.imageController.deleteImage);
  }
}
