"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageRoutes = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const image_controller_1 = require("../controllers/image.controller");
// Configura multer: guarda en /uploads/images con nombre único
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path_1.default.join(process.cwd(), "uploads", "images");
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const ts = Date.now();
        const safeName = file.originalname.replace(/\s+/g, "_");
        cb(null, `${ts}_${safeName}`);
    }
});
const upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 500 * 1024 * 1024 // 500MB, ajusta según necesites
    },
    fileFilter: (req, file, cb) => {
        // acepta DICOM (ext .dcm) y png/jpg
        const allowed = /\.(dcm|dicom|jpg|jpeg|png)$/i;
        if (allowed.test(file.originalname))
            cb(null, true);
        else
            cb(new Error("Only DICOM/JPG/PNG files are allowed"));
    }
});
class ImageRoutes {
    constructor() {
        this.imageController = new image_controller_1.ImageController();
    }
    routes(app) {
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
exports.ImageRoutes = ImageRoutes;
//# sourceMappingURL=image.js.map