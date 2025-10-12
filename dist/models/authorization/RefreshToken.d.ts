import { Model } from "sequelize";
export declare class RefreshToken extends Model {
    id: number;
    user_id: number;
    token: string;
    device_info: string;
    is_valid: "ACTIVE" | "INACTIVE";
    expires_at: Date;
    created_at: Date;
    updated_at: Date;
}
export interface RefreshTokenI {
    user_id?: number;
    token: string;
    device_info: string;
    is_valid: "ACTIVE" | "INACTIVE";
    expires_at: Date;
    created_at: Date;
    updated_at: Date;
}
//# sourceMappingURL=RefreshToken.d.ts.map