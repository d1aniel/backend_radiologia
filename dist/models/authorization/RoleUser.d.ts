import { Model } from "sequelize";
export declare class RoleUser extends Model {
    id: number;
    role_id: number;
    user_id: number;
    is_active: "ACTIVE" | "INACTIVE";
}
export interface RoleUserI {
    id?: number;
    role_id: number;
    user_id: number;
    is_active: "ACTIVE" | "INACTIVE";
}
//# sourceMappingURL=RoleUser.d.ts.map