"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
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
        unique: true,
        field: "estudio_id",
        references: {
            model: "studies",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
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
            len: {
                args: [10, 2000000],
                msg: "El cuerpo debe tener al menos 10 caracteres",
            },
        },
    },
    medicoId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "medico_id",
        references: {
            model: "doctors",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
        validate: {
            isInt: { msg: "medicoId debe ser entero" },
            min: { args: [1], msg: "medicoId inválido" },
        },
    },
    fechaCreacion: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: connection_1.default,
    modelName: "Report",
    tableName: "reports",
    timestamps: false,
    indexes: [
        { fields: ["medico_id"] },
        {
            unique: true,
            fields: ["estudio_id"],
            name: "unique_report_per_study",
        },
    ],
});
exports.default = Report;
//# sourceMappingURL=Report.js.map