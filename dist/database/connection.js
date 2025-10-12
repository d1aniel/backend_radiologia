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
exports.sequelize = exports.testConnection = exports.getDatabaseInfo = void 0;
// src/database/connection.ts
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DEFAULT_TIMEZONE = process.env.DB_TIMEZONE || "America/Bogota";
const engine = (process.env.DB_DIALECT || process.env.DB_ENGINE || "mysql").toLowerCase();
const toNumber = (value, fallback) => {
    if (value === undefined) {
        return fallback;
    }
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
};
const buildConfig = () => {
    switch (engine) {
        case "postgres":
        case "postgresql":
            return {
                database: process.env.PG_NAME || process.env.DB_NAME || "postgres",
                username: process.env.PG_USER || process.env.DB_USER || "postgres",
                password: process.env.PG_PASS || process.env.DB_PASS || "",
                host: process.env.PG_HOST || process.env.DB_HOST || "localhost",
                port: toNumber(process.env.PG_PORT || process.env.DB_PORT, 5432),
                dialect: "postgres",
                timezone: DEFAULT_TIMEZONE,
            };
        case "mssql":
        case "sqlserver":
            return {
                database: process.env.MSSQL_NAME || process.env.DB_NAME || "master",
                username: process.env.MSSQL_USER || process.env.DB_USER || "sa",
                password: process.env.MSSQL_PASS || process.env.DB_PASS || "",
                host: process.env.MSSQL_HOST || process.env.DB_HOST || "localhost",
                port: toNumber(process.env.MSSQL_PORT || process.env.DB_PORT, 1433),
                dialect: "mssql",
                timezone: DEFAULT_TIMEZONE,
                dialectOptions: {
                    options: {
                        encrypt: process.env.MSSQL_ENCRYPT === "true" || false,
                    },
                },
            };
        case "oracle":
            // Nota: Sequelize requiere drivers externos / dialectos para oracle.
            return {
                database: process.env.ORACLE_NAME || process.env.DB_NAME || "",
                username: process.env.ORACLE_USER || process.env.DB_USER || "",
                password: process.env.ORACLE_PASS || process.env.DB_PASS || "",
                host: process.env.ORACLE_HOST || process.env.DB_HOST || "localhost",
                port: toNumber(process.env.ORACLE_PORT || process.env.DB_PORT, 1521),
                dialect: "oracle",
                timezone: DEFAULT_TIMEZONE,
                dialectOptions: {
                    connectString: process.env.ORACLE_CONNECT_STRING ||
                        `${process.env.ORACLE_HOST || "localhost"}:${process.env.ORACLE_PORT || 1521}/${process.env.ORACLE_SID || ""}`,
                },
            };
        default: // mysql
            return {
                database: process.env.DB_NAME || process.env.MYSQL_NAME || "test",
                username: process.env.DB_USER || process.env.MYSQL_USER || "root",
                password: process.env.DB_PASS || process.env.MYSQL_PASSWORD || "",
                host: process.env.DB_HOST || process.env.MYSQL_HOST || "localhost",
                port: toNumber(process.env.DB_PORT || process.env.MYSQL_PORT, 3306),
                dialect: "mysql",
                timezone: DEFAULT_TIMEZONE,
            };
    }
};
const selectedConfig = buildConfig();
console.log(`🔌 Conectando a base de datos: ${engine.toUpperCase()}`);
const resolveLogging = () => {
    if (typeof selectedConfig.logging !== "undefined") {
        return selectedConfig.logging;
    }
    return process.env.NODE_ENV === "development" ? console.log : false;
};
const resolvePoolValue = (key, fallback) => {
    var _a;
    const envKey = `DB_POOL_${key.toString().toUpperCase()}`;
    const envValue = process.env[envKey];
    const configValue = (_a = selectedConfig.pool) === null || _a === void 0 ? void 0 : _a[key];
    if (typeof envValue !== "undefined") {
        return toNumber(envValue, fallback);
    }
    if (typeof configValue === "number") {
        return configValue;
    }
    return fallback;
};
const sequelizeOptions = {
    host: selectedConfig.host,
    port: selectedConfig.port,
    dialect: selectedConfig.dialect,
    timezone: selectedConfig.timezone,
    dialectOptions: selectedConfig.dialectOptions,
    logging: resolveLogging(),
    pool: {
        max: resolvePoolValue("max", 5),
        min: resolvePoolValue("min", 0),
        acquire: resolvePoolValue("acquire", 30000),
        idle: resolvePoolValue("idle", 10000),
    },
};
const sequelize = new sequelize_1.Sequelize(selectedConfig.database, selectedConfig.username, selectedConfig.password, sequelizeOptions);
exports.sequelize = sequelize;
/**
 * Devuelve información útil para logging/debug.
 */
const getDatabaseInfo = () => ({
    engine,
    config: {
        database: selectedConfig.database,
        host: selectedConfig.host,
        port: selectedConfig.port,
        dialect: selectedConfig.dialect,
        timezone: selectedConfig.timezone,
    },
    connectionString: `${selectedConfig.dialect}://${selectedConfig.username}@${selectedConfig.host}:${selectedConfig.port}/${selectedConfig.database}`,
});
exports.getDatabaseInfo = getDatabaseInfo;
/**
 * Prueba la conexión con authenticate(). Devuelve true si ok.
 */
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log(`✅ Conexión exitosa a ${engine.toUpperCase()}`);
        return true;
    }
    catch (error) {
        console.error(`❌ Error de conexión a ${engine.toUpperCase()}:`, error);
        return false;
    }
});
exports.testConnection = testConnection;
exports.default = sequelize;
//# sourceMappingURL=connection.js.map