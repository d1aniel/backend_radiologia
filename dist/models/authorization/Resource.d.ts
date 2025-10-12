import { Model } from "sequelize";
export declare class Resource extends Model {
    id: number;
    path: string;
    method: string;
    is_active: "ACTIVE" | "INACTIVE";
}
export interface ResourceI {
    id?: number;
    path: string;
    method: string;
    is_active: "ACTIVE" | "INACTIVE";
}
//# sourceMappingURL=Resource.d.ts.map