"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
// src/models/report.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class Report extends sequelize_1.Model {
}
exports.Report = Report;
Report.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    estudioId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true, // 1:1 (un estudio solo puede tener un informe)
        // Si ya tienes la tabla studies, puedes habilitar la referencia:
        // references: { model: "studies", key: "id" },
        // onUpdate: "CASCADE",
        // onDelete: "RESTRICT",
        validate: {
            isInt: { msg: "estudioId debe ser entero" },
            min: { args: [1], msg: "estudioId inválido" },
        },
    },
    estado: {
        type: sequelize_1.DataTypes.ENUM("BORRADOR", "FIRMADO"),
        allowNull: false,
        defaultValue: "BORRADOR",
    },
    cuerpo: {
        type: sequelize_1.DataTypes.TEXT("long"),
        allowNull: false,
        validate: {
            notEmpty: { msg: "El cuerpo del informe no puede estar vacío" },
            len: { args: [10, 2000000], msg: "El cuerpo debe tener al menos 10 caracteres" },
        },
    },
    medicoId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
            isInt: { msg: "medicoId debe ser entero" },
            min: { args: [1], msg: "medicoId inválido" },
        },
        // references: { model: "doctors", key: "id" },
        // onUpdate: "CASCADE",
        // onDelete: "RESTRICT",
    },
    fechaCreacion: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
        // Si prefieres DATEONLY (sin hora) usa:
        // type: DataTypes.DATEONLY
    },
}, {
    sequelize: connection_1.default,
    modelName: "Report",
    tableName: "reports",
    timestamps: false, // ya manejamos fechaCreacion manualmente
    indexes: [
        { fields: ["medicoId"] },
        { unique: true, fields: ["estudioId"], name: "unique_report_per_study" },
    ],
});
exports.default = Report;
//# sourceMappingURL=Report.js.map