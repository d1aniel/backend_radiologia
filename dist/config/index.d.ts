import { Application } from "express";
export declare class App {
    private port?;
    app: Application;
    constructor(port?: number | string | undefined);
    private settings;
    listen(): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map