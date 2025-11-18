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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const connection_1 = require("../database/connection");
require("../models/associations");
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
    }
    settings() {
        this.app.set("port", this.port || process.env.PORT || 4000);
    }
    middlewares() {
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
    }
    routes() {
        this.routesProvider.routes(this.app);
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const dbInfo = (0, connection_1.getDatabaseInfo)();
                console.log(`🔗 Intentando conectar a: ${dbInfo.engine.toUpperCase()} (${(_b = (_a = dbInfo.config) === null || _a === void 0 ? void 0 : _a.database) !== null && _b !== void 0 ? _b : "sin nombre"})`);
                const ok = yield (0, connection_1.testConnection)();
                if (!ok) {
                    throw new Error("Test de conexión fallido");
                }
                const shouldAlterSchema = String(process.env.DB_SYNC_ALTER || "true").toLowerCase() === "true";
                if (shouldAlterSchema) {
                    console.log("🛠  Sincronizando con alter para actualizar el esquema");
                }
                yield connection_1.sequelize.sync({
                    force: false,
                    alter: shouldAlterSchema ? { drop: false } : false,
                });
                console.log("📦 Base de datos sincronizada exitosamente");
            }
            catch (error) {
                console.error("❌ Error al conectar con la base de datos:", error);
                process.exit(1);
            }
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbConnection();
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