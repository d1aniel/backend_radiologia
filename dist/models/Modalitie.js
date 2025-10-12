"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modalidad = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class Modalidad extends sequelize_1.Model {
}
exports.Modalidad = Modalidad;
Modalidad.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: { msg: "El nombre es obligatorio" },
        },
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: { msg: "La descripción es obligatoria" },
        },
    },
    activa: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize: connection_1.default,
    modelName: "Modalidad",
    tableName: "modalidades",
    timestamps: false,
});
//# sourceMappingURL=Modalitie.js.map