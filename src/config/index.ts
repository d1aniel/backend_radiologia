// src/app.ts
import dotenv from "dotenv";
import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";                    // 👈 IMPORTANTE: agregar esto
import { sequelize, testConnection, getDatabaseInfo } from "../database/connection";
import "../models/associations"; 
import { Routes } from "../routes";

dotenv.config();

export class App {
  public app: Application;
  private readonly routesProvider: Routes;

  constructor(public port?: number | string) {
    this.app = express();
    this.routesProvider = new Routes();
    this.settings();
    this.middlewares();   // 👈 el orden importa
    this.routes();
  }

  private settings(): void {
    this.app.set("port", this.port || process.env.PORT || 4000);
  }

  private middlewares(): void {
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    
    this.app.use(
      "/uploads",
      express.static(path.join(process.cwd(), "uploads"))
    );
    
  }

  private routes(): void {
    this.routesProvider.routes(this.app);
  }

  public async dbConnection(): Promise<void> {
    try {
      const dbInfo = getDatabaseInfo();
      console.log(`🔗 Intentando conectar a: ${dbInfo.engine.toUpperCase()} (${dbInfo.config?.database ?? "sin nombre"})`);

      const ok = await testConnection();
      if (!ok) {
        throw new Error("Test de conexión fallido");
      }

      const shouldAlterSchema = String(process.env.DB_SYNC_ALTER || "true").toLowerCase() === "true";
      if (shouldAlterSchema) {
        console.log("🛠  Sincronizando con alter para actualizar el esquema");
      }

      await sequelize.sync({
        force: false,
        alter: shouldAlterSchema ? { drop: false } : false,
      });
      console.log("📦 Base de datos sincronizada exitosamente");
    } catch (error) {
      console.error("❌ Error al conectar con la base de datos:", error);
      process.exit(1);
    }
  }

  public async init(): Promise<void> {
    await this.dbConnection();
  }

  public async listen(): Promise<void> {
    await this.init();

    const port = this.app.get("port");

    await new Promise<void>((resolve, reject) => {
      const server = this.app.listen(port, () => {
        console.log(`🚀 Servidor ejecutándose en puerto ${port}`);
        resolve();
      });

      server.on("error", (error) => {
        console.error("❌ Error inicializando el servidor HTTP:", error);
        reject(error);
      });
    });
  }
}
