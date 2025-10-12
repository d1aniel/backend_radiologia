"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../database/connection"));
class Role extends sequelize_1.Model {
}
exports.Role = Role;
Role.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    is_active: {
        type: sequelize_1.DataTypes.ENUM("ACTIVE", "INACTIVE"),
        defaultValue: "ACTIVE",
    }
}, {
    tableName: "roles",
    sequelize: connection_1.default,
    timestamps: false
});
//# sourceMappingURL=Role.js.map