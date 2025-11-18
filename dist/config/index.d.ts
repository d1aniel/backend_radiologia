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
    dbConnection(): Promise<void>;
    init(): Promise<void>;
    listen(): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map