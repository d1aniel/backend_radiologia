// src/routes/image.routes.ts
import { Application } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { ImageController } from "../controllers/image.controller";
import { authMiddleware } from "../middleware/auth";

// Asegurar carpeta uploads/images
const UPLOAD_DIR = path.join(process.cwd(), "uploads", "images");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Configura multer: guarda en /uploads/images con nombre único
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ts = Date.now();
    const safeName = file.originalname.replace(/\s+/g, "_");
    cb(null, `${ts}_${safeName}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB
  fileFilter: (req, file, cb: FileFilterCallback) => {
    const allowed = /\.(dcm|dicom|jpg|jpeg|png)$/i;
    if (allowed.test(file.originalname)) cb(null, true);
    else cb(new Error("Only DICOM/JPG/PNG files are allowed"));
  },
});

export class ImageRoutes {
  public imageController: ImageController = new ImageController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/images/public")
      .get(this.imageController.getAllImages)
      .post(upload.single("file"), this.imageController.createImage);

    app.route("/api/images/public/:id")
      .get(this.imageController.getImageById)
      .patch(this.imageController.updateImage)
      .delete(this.imageController.deleteImage);

    app.route("/api/images/public/:id/logic")
      .delete(this.imageController.deleteImageAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/images")
      .get(authMiddleware, this.imageController.getAllImages)
      .post(authMiddleware, upload.single("file"), this.imageController.createImage);

    app.route("/api/images/:id")
      .get(authMiddleware, this.imageController.getImageById)
      .patch(authMiddleware, this.imageController.updateImage)
      .delete(authMiddleware, this.imageController.deleteImage);

    app.route("/api/images/:id/logic")
      .delete(authMiddleware, this.imageController.deleteImageAdv);
  }
}
