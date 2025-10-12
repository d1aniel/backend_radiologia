import { Dialect, Sequelize } from "sequelize";
declare const sequelize: Sequelize;
/**
 * Devuelve información útil para logging/debug.
 */
export declare const getDatabaseInfo: () => {
    engine: string;
    config: {
        database: string;
        host: string | undefined;
        port: number | undefined;
        dialect: Dialect;
        timezone: string | undefined;
    };
    connectionString: string;
};
/**
 * Prueba la conexión con authenticate(). Devuelve true si ok.
 */
export declare const testConnection: () => Promise<boolean>;
export { sequelize };
export default sequelize;
//# sourceMappingURL=connection.d.ts.map