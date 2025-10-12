import { Model } from "sequelize";
export declare class ResourceRole extends Model {
    id: number;
    resource_id: number;
    role_id: number;
    is_active: "ACTIVE" | "INACTIVE";
}
export interface ResourceRoleI {
    id?: number;
    resource_id: number;
    role_id: number;
    is_active: "ACTIVE" | "INACTIVE";
}
//# sourceMappingURL=ResourceRole.d.ts.map