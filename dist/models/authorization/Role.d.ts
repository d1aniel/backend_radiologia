import { Model } from "sequelize";
export declare class Role extends Model {
    id: number;
    name: string;
    is_active: "ACTIVE" | "INACTIVE";
}
export interface RoleI {
    id?: number;
    name: string;
    is_active: "ACTIVE" | "INACTIVE";
}
//# sourceMappingURL=Role.d.ts.map