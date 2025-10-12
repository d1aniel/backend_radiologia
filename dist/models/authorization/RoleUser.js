"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUser = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../database/connection"));
class RoleUser extends sequelize_1.Model {
}
exports.RoleUser = RoleUser;
RoleUser.init({
    is_active: {
        type: sequelize_1.DataTypes.ENUM("ACTIVE", "INACTIVE"),
        defaultValue: "ACTIVE",
    }
}, {
    tableName: "role_users",
    sequelize: connection_1.default,
    timestamps: false
});
//# sourceMappingURL=RoleUser.js.map