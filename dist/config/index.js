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
exports.App = void 0;
// src/app.ts
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = require("../database/connection");
require("../models/associations"); // asegúrate que esto registre relaciones
const routes_1 = require("../routes");
dotenv_1.default.config();
class App {
    constructor(port) {
        this.port = port;
        this.app = (0, express_1.default)();
        this.routesProvider = new routes_1.Routes();
        this.settings();
        this.middlewares();
        this.routes();
        // NO llamar dbConnection aquí: exponeremos init() para ser await-ado desde index.ts
    }
    settings() {
        this.app.set("port", this.port || process.env.PORT || 4000);
    }
    middlewares() {
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.routesProvider.routes(this.app);
    }
    /**
     * Método que intenta conectar, testear y sincronizar la BD.
     * Lanza error o termina el proceso si falla (configurable).
     */
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const dbInfo = (0, connection_1.getDatabaseInfo)();
                console.log(`🔗 Intentando conectar a: ${dbInfo.engine.toUpperCase()} (${(_a = dbInfo.database) !== null && _a !== void 0 ? _a : "sin nombre"})`);
                const ok = yield (0, connection_1.testConnection)();
                if (!ok) {
                    throw new Error("Test de conexión fallido");
                }
                // sincroniza después de que las asociaciones ya estén registradas
                yield connection_1.sequelize.sync({ force: false });
                console.log("📦 Base de datos sincronizada exitosamente");
            }
            catch (error) {
                console.error("❌ Error al conectar con la base de datos:", error);
                // En desarrollo podrías comentar la siguiente línea; en producción es recomendable terminar el proceso.
                process.exit(1);
            }
        });
    }
    /**
     * Método de inicialización público: conecta la BD antes de arrancar el servidor.
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbConnection();
            // cualquier otra inicialización que necesites
        });
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            const port = this.app.get("port");
            yield new Promise((resolve, reject) => {
                const server = this.app.listen(port, () => {
                    console.log(`🚀 Servidor ejecutándose en puerto ${port}`);
                    resolve();
                });
                server.on("error", (error) => {
                    console.error("❌ Error inicializando el servidor HTTP:", error);
                    reject(error);
                });
            });
        });
    }
}
exports.App = App;
//# sourceMappingURL=index.js.map