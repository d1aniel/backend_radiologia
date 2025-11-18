"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageRoutes = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const image_controller_1 = require("../controllers/image.controller");
const auth_1 = require("../middleware/auth");
const UPLOAD_DIR = path_1.default.join(process.cwd(), "uploads", "images");
if (!fs_1.default.existsSync(UPLOAD_DIR)) {
    fs_1.default.mkdirSync(UPLOAD_DIR, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOAD_DIR),
    filename: (req, file, cb) => {
        const ts = Date.now();
        const safeName = file.originalname.replace(/\s+/g, "_");
        cb(null, `${ts}_${safeName}`);
    },
});
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 500 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowed = /\.(dcm|dicom|jpg|jpeg|png)$/i;
        if (allowed.test(file.originalname))
            cb(null, true);
        else
            cb(new Error("Only DICOM/JPG/PNG files are allowed"));
    },
});
class ImageRoutes {
    constructor() {
        this.imageController = new image_controller_1.ImageController();
    }
    routes(app) {
        app.route("/api/images/public")
            .get(this.imageController.getAllImages)
            .post(upload.single("file"), this.imageController.createImage);
        app.route("/api/images/public/:id")
            .get(this.imageController.getImageById)
            .patch(this.imageController.updateImage)
            .delete(this.imageController.deleteImage);
        app.route("/api/images/public/:id/logic")
            .delete(this.imageController.deleteImageAdv);
        app.route("/api/images")
            .get(auth_1.authMiddleware, this.imageController.getAllImages)
            .post(auth_1.authMiddleware, upload.single("file"), this.imageController.createImage);
        app.route("/api/images/:id")
            .get(auth_1.authMiddleware, this.imageController.getImageById)
            .patch(auth_1.authMiddleware, this.imageController.updateImage)
            .delete(auth_1.authMiddleware, this.imageController.deleteImage);
        app.route("/api/images/:id/logic")
            .delete(auth_1.authMiddleware, this.imageController.deleteImageAdv);
    }
}
exports.ImageRoutes = ImageRoutes;
//# sourceMappingURL=image.js.map