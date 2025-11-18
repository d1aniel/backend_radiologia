"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Technologist = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class Technologist extends sequelize_1.Model {
}
exports.Technologist = Technologist;
Technologist.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    especialidad: {
        type: sequelize_1.DataTypes.ENUM("RX", "TAC", "RM"),
        allowNull: false,
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Phone cannot be empty" },
            len: { args: [7, 20], msg: "Phone must be between 7 and 20 chars" },
        },
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msg: "Invalid email format" },
        },
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("ACTIVE", "INACTIVE"),
        defaultValue: "ACTIVE",
    },
}, {
    sequelize: connection_1.default,
    modelName: "Technologist",
    tableName: "technologists",
    timestamps: false,
});
exports.default = Technologist;
//# sourceMappingURL=Technologist.js.map