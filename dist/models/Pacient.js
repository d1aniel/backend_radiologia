"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class Patient extends sequelize_1.Model {
}
exports.Patient = Patient;
Patient.init({
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "El nombre no puede estar vacío" },
        },
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "El apellido no puede estar vacío" },
        },
    },
    tpdocumento: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    sexo: {
        type: sequelize_1.DataTypes.ENUM("M", "F", "O"),
        allowNull: true,
    },
    documento: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: { msg: "El documento no puede estar vacío" },
        },
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [7, 15],
                msg: "El teléfono debe tener entre 7 y 15 dígitos",
            },
        },
    },
    eps: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msg: "Debe ser un correo válido" },
        },
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("ACTIVATE", "INACTIVE"),
        defaultValue: "ACTIVATE",
    },
}, {
    sequelize: connection_1.default,
    modelName: "Patient",
    tableName: "patients",
    timestamps: false,
});
//# sourceMappingURL=Pacient.js.map