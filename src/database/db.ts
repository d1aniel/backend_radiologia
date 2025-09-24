import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  mysql: {
    dialect: "mysql",
    host: process.env.DB_HOST || "localhost",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "test",
    port: parseInt(process.env.DB_PORT || "3306")
  },
  postgres: {
    dialect: "postgres",
    host: process.env.DB_HOST || "localhost",
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "test",
    port: parseInt(process.env.DB_PORT || "5432")
  },
  mssql: {
    dialect: "mssql",
    host: process.env.DB_HOST || "localhost",
    username: process.env.DB_USER || "sa",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "test",
    port: parseInt(process.env.DB_PORT || "1433")
  },
  oracle: {
    dialect: "oracle",
    host: process.env.DB_HOST || "localhost",
    username: process.env.DB_USER || "oracle",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "test",
    port: parseInt(process.env.DB_PORT || "1521")
  },
};

// Select the database engine from the .env file
const dbEngine = process.env.DB_ENGINE || "mysql";
const config = dbConfig[dbEngine as keyof typeof dbConfig];

if (!config) {
  throw new Error(`Unsupported DB_ENGINE: ${dbEngine}`);
}

// Create the Sequelize instance
export const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect as any,
});
