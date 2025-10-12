import { Model } from "sequelize";
export declare class User extends Model {
    id: number;
    username: string;
    email: string;
    password: string;
    is_active: "ACTIVE" | "INACTIVE";
    avatar: string;
    checkPassword(password: string): Promise<boolean>;
    generateToken(): string;
    generateRefreshToken(): {
        token: string;
        expiresAt: Date;
    };
}
export interface UserI {
    id?: number;
    username: string;
    email: string;
    password: string;
    is_active: "ACTIVE" | "INACTIVE";
    avatar?: string;
}
//# sourceMappingURL=User.d.ts.map