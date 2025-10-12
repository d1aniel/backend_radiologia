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
            len: { args: [7, 15], msg: "Phone must be between 7 and 15 digits" },
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
//# sourceMappingURL=Technologist.js.map