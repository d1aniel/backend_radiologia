"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctor = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class Doctor extends sequelize_1.Model {
}
exports.Doctor = Doctor;
Doctor.init({
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "El nombre no puede estar vacío" },
            len: { args: [2, 100], msg: "El nombre debe tener entre 2 y 100 caracteres" },
        },
    },
    especialidad: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "La especialidad no puede estar vacía" },
            len: { args: [2, 120], msg: "La especialidad debe tener entre 2 y 120 caracteres" },
        },
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "El teléfono no puede estar vacío" },
            len: { args: [7, 15], msg: "El teléfono debe tener entre 7 y 15 caracteres" },
        },
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: { msg: "El correo no puede estar vacío" },
            isEmail: { msg: "Formato de correo inválido" },
            len: { args: [5, 160], msg: "El correo debe tener entre 5 y 160 caracteres" },
        },
    },
    registro: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("ACTIVATE", "INACTIVE"),
        defaultValue: "ACTIVATE",
    },
}, {
    sequelize: connection_1.default,
    modelName: "Doctor",
    tableName: "doctors",
    timestamps: false,
    indexes: [
        { unique: true, fields: ["correo"] },
    ],
});
exports.default = Doctor;
//# sourceMappingURL=Doctor.js.map