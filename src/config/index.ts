// src/app.ts
import dotenv from "dotenv";
import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import { sequelize, testConnection, getDatabaseInfo } from "../database/connection";
import "../models/associations"; // asegúrate que esto registre relaciones
import { Routes } from "../routes";

dotenv.config();

export class App {
  public app: Application;
  private readonly routesProvider: Routes;

  constructor(public port?: number | string) {
    this.app = express();
    this.routesProvider = new Routes();
    this.settings();
    this.middlewares();
    this.routes();
    // NO llamar dbConnection aquí: exponeremos init() para ser await-ado desde index.ts
  }

  private settings(): void {
    this.app.set("port", this.port || process.env.PORT || 4000);
  }

  private middlewares(): void {
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.routesProvider.routes(this.app);
  }

  /**
   * Método que intenta conectar, testear y sincronizar la BD.
   * Lanza error o termina el proceso si falla (configurable).
   */
  public async dbConnection(): Promise<void> {
    try {
      const dbInfo = getDatabaseInfo();
      console.log(`🔗 Intentando conectar a: ${dbInfo.engine.toUpperCase()} (${dbInfo.config?.database ?? "sin nombre"})`);

      const ok = await testConnection();
      if (!ok) {
        throw new Error("Test de conexión fallido");
      }

      // sincroniza después de que las asociaciones ya estén registradas
      await sequelize.sync({ force: false });
      console.log("📦 Base de datos sincronizada exitosamente");
    } catch (error) {
      console.error("❌ Error al conectar con la base de datos:", error);
      // En desarrollo podrías comentar la siguiente línea; en producción es recomendable terminar el proceso.
      process.exit(1);
    }
  }

  /**
   * Método de inicialización público: conecta la BD antes de arrancar el servidor.
   */
  public async init(): Promise<void> {
    await this.dbConnection();
    // cualquier otra inicialización que necesites
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
