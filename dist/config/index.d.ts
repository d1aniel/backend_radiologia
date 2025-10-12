import { Application } from "express";
import "../models/associations";
export declare class App {
    port?: number | string | undefined;
    app: Application;
    private readonly routesProvider;
    constructor(port?: number | string | undefined);
    private settings;
    private middlewares;
    private routes;
    /**
     * Método que intenta conectar, testear y sincronizar la BD.
     * Lanza error o termina el proceso si falla (configurable).
     */
    dbConnection(): Promise<void>;
    /**
     * Método de inicialización público: conecta la BD antes de arrancar el servidor.
     */
    init(): Promise<void>;
    listen(): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map