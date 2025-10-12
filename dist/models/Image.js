"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
// src/models/Image.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class Image extends sequelize_1.Model {
}
exports.Image = Image;
Image.init({
    estudioId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    tipo: {
        type: sequelize_1.DataTypes.ENUM("DICOM", "JPG", "PNG", "Serie"),
        allowNull: false,
        defaultValue: "DICOM",
    },
    url: {
        type: sequelize_1.DataTypes.STRING(1024),
        allowNull: false,
    },
    nombreArchivo: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    tamanoBytes: {
        type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    },
    serie: {
        type: sequelize_1.DataTypes.STRING(120),
        allowNull: true,
    },
    orden: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: null,
    },
    fechaCarga: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: connection_1.default,
    modelName: "Image",
    tableName: "images",
    timestamps: false,
});
exports.default = Image;
//# sourceMappingURL=Image.js.map