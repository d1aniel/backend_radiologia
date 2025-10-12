// src/database/connection.ts
import { Dialect, Options, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

type DBConfig = {
  database: string;
  username: string;
  password: string;
  host?: string;
  port?: number;
  dialect: Dialect;
  timezone?: string;
  dialectOptions?: Options["dialectOptions"];
  logging?: Options["logging"];
  pool?: Options["pool"];
};

const DEFAULT_TIMEZONE = process.env.DB_TIMEZONE || "America/Bogota";

const engine = (process.env.DB_DIALECT || process.env.DB_ENGINE || "mysql").toLowerCase();

const toNumber = (value: string | undefined, fallback: number): number => {
  if (value === undefined) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const buildConfig = (): DBConfig => {
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
      return {
        database: process.env.ORACLE_NAME || process.env.DB_NAME || "",
        username: process.env.ORACLE_USER || process.env.DB_USER || "",
        password: process.env.ORACLE_PASS || process.env.DB_PASS || "",
        host: process.env.ORACLE_HOST || process.env.DB_HOST || "localhost",
        port: toNumber(process.env.ORACLE_PORT || process.env.DB_PORT, 1521),
        dialect: "oracle" as Dialect,
        timezone: DEFAULT_TIMEZONE,
        dialectOptions: {
          connectString:
            process.env.ORACLE_CONNECT_STRING ||
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

/**
 * Resuelve el valor de logging. Aseguramos devolver algo definido
 * cuando lo vamos a añadir al objeto final.
 */
const resolveLogging = (): Options["logging"] | undefined => {
  if (typeof selectedConfig.logging !== "undefined") {
    return selectedConfig.logging;
  }
  // Default: en development mostrar queries, en prod false
  return process.env.NODE_ENV === "development" ? console.log : false;
};

const resolvePoolValue = <K extends keyof NonNullable<Options["pool"]>>(key: K, fallback: number): number => {
  const envKey = `DB_POOL_${key.toString().toUpperCase()}`;
  const envValue = process.env[envKey];
  const configValue = selectedConfig.pool?.[key];

  if (typeof envValue !== "undefined") return toNumber(envValue, fallback);
  if (typeof configValue === "number") return configValue;
  return fallback;
};

// Construcción segura del objeto de opciones
const partialOptions: Partial<Options> = {
  dialect: selectedConfig.dialect,
  pool: {
    max: resolvePoolValue("max", 5),
    min: resolvePoolValue("min", 0),
    acquire: resolvePoolValue("acquire", 30000),
    idle: resolvePoolValue("idle", 10000),
  },
};

// Añadir logging sólo si no es undefined
const loggingValue = resolveLogging();
if (typeof loggingValue !== "undefined") {
  partialOptions.logging = loggingValue;
}

// Añadir otras propiedades condicionalmente
if (selectedConfig.host) partialOptions.host = selectedConfig.host;
if (typeof selectedConfig.port !== "undefined") partialOptions.port = selectedConfig.port;
if (selectedConfig.timezone) partialOptions.timezone = selectedConfig.timezone;
if (selectedConfig.dialectOptions) partialOptions.dialectOptions = selectedConfig.dialectOptions;

// Convertir a Options al pasar a Sequelize (seguro porque controlamos qué propiedades existen)
const sequelizeOptions = partialOptions as Options;

const sequelize = new Sequelize(
  selectedConfig.database,
  selectedConfig.username,
  selectedConfig.password,
  sequelizeOptions
);

/**
 * Devuelve información útil para logging/debug.
 */
export const getDatabaseInfo = () => ({
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

/**
 * Prueba la conexión con authenticate(). Devuelve true si ok.
 */
export const testConnection = async (): Promise<boolean> => {
  try {
    await sequelize.authenticate();
    console.log(`✅ Conexión exitosa a ${engine.toUpperCase()}`);
    return true;
  } catch (error) {
    console.error(`❌ Error de conexión a ${engine.toUpperCase()}:`, error);
    return false;
  }
};

export { sequelize };
export default sequelize;
