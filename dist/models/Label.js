"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class Label extends sequelize_1.Model {
}
exports.Label = Label;
Label.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(120),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: { msg: 'El nombre no puede estar vacío' },
            len: { args: [2, 120], msg: 'El nombre debe tener entre 2 y 120 caracteres' },
        },
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
        validate: {
            len: { args: [0, 255], msg: 'La descripción no puede exceder 255 caracteres' },
        },
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('ACTIVATE', 'INACTIVE'),
        allowNull: false,
        defaultValue: 'ACTIVATE',
    },
}, {
    sequelize: connection_1.default,
    modelName: 'Label',
    tableName: 'labels',
    timestamps: false,
    indexes: [
        { unique: true, fields: ['nombre'] },
    ],
});
//# sourceMappingURL=Label.js.map