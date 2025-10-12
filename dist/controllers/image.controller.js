"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Image_1 = __importDefault(require("../models/Image")); // tu modelo Image
class ImageController {
    // Listar imágenes (si pasas ?estudioId=1 filtra por estudio)
    getAllImages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { estudioId } = req.query;
                const where = {};
                if (estudioId)
                    where.estudioId = Number(estudioId);
                const images = yield Image_1.default.findAll({ where });
                res.status(200).json({ images });
            }
            catch (error) {
                console.error("getAllImages error:", error);
                res.status(500).json({ error: "Error fetching images" });
            }
        });
    }
    // Obtener imagen por id
    getImageById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const image = yield Image_1.default.findByPk(pk);
                if (image) {
                    res.status(200).json(image);
                }
                else {
                    res.status(404).json({ error: "Image not found" });
                }
            }
            catch (error) {
                console.error("getImageById error:", error);
                res.status(500).json({ error: "Error fetching image" });
            }
        });
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
    createImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                // multer coloca info en req.file
                const file = req.file;
                if (!file) {
                    return res.status(400).json({ error: "No file uploaded" });
                }
                const { estudioId, tipo, serie, orden } = req.body;
                // construimos los campos
                const newImgPayload = {
                    estudioId: Number(estudioId),
                    tipo: (_a = tipo) !== null && _a !== void 0 ? _a : "DICOM",
                    url: file.path, // ruta en disco. En produccion podrías guardar URL externa.
                    nombreArchivo: file.originalname,
                    tamanoBytes: file.size,
                    serie: serie !== null && serie !== void 0 ? serie : null,
                    orden: orden != null ? Number(orden) : null,
                };
                const created = yield Image_1.default.create(newImgPayload);
                res.status(201).json(created);
            }
            catch (error) {
                console.error("createImage error:", error);
                res.status(500).json({ error: "Error creating image" });
            }
        });
    }
    // Actualizar metadatos de la imagen (no reemplaza archivo). Si quieres reemplazar archivo, se puede expandir.
    updateImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g;
            try {
                const { id: pk } = req.params;
                const body = req.body;
                const image = yield Image_1.default.findByPk(pk);
                if (!image) {
                    return res.status(404).json({ error: "Image not found" });
                }
                // No permitimos actualizar id/fechaCarga desde body por seguridad
                const allowed = {
                    estudioId: (_a = body.estudioId) !== null && _a !== void 0 ? _a : image.estudioId,
                    tipo: (_b = body.tipo) !== null && _b !== void 0 ? _b : image.tipo,
                    nombreArchivo: (_c = body.nombreArchivo) !== null && _c !== void 0 ? _c : image.nombreArchivo,
                    tamanoBytes: (_d = body.tamanoBytes) !== null && _d !== void 0 ? _d : image.tamanoBytes,
                    serie: (_e = body.serie) !== null && _e !== void 0 ? _e : image.serie,
                    orden: (_f = body.orden) !== null && _f !== void 0 ? _f : image.orden,
                    url: (_g = body.url) !== null && _g !== void 0 ? _g : image.url, // si se pasa una nueva url explícita permitimos, pero para reemplazo de archivo preferir separado
                };
                yield image.update(allowed);
                res.status(200).json(image);
            }
            catch (error) {
                console.error("updateImage error:", error);
                res.status(500).json({ error: "Error updating image" });
            }
        });
    }
    /**
     * Eliminar imagen:
     * - elimina el archivo físico (si existe en disco y la ruta es local)
     * - elimina el registro en DB
     */
    deleteImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const image = yield Image_1.default.findByPk(pk);
                if (!image) {
                    return res.status(404).json({ error: "Image not found" });
                }
                // intentar borrar archivo si es ruta local
                const filePath = image.url;
                if (filePath && !filePath.startsWith("http")) {
                    const absolute = path_1.default.isAbsolute(filePath)
                        ? filePath
                        : path_1.default.join(process.cwd(), filePath);
                    try {
                        if (fs_1.default.existsSync(absolute)) {
                            fs_1.default.unlinkSync(absolute);
                        }
                    }
                    catch (fsErr) {
                        console.warn("Could not delete file:", absolute, fsErr);
                        // no bloqueamos la eliminación del registro por un error en el FS
                    }
                }
                yield image.destroy();
                res.status(200).json({ message: "Image deleted" });
            }
            catch (error) {
                console.error("deleteImage error:", error);
                res.status(500).json({ error: "Error deleting image" });
            }
        });
    }
}
exports.ImageController = ImageController;
//# sourceMappingURL=image.controller.js.map