"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Study = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class Study extends sequelize_1.Model {
}
exports.Study = Study;
Study.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    patient_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    modality_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    team_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    technologist_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    medico_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    quote_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    fechaHora: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        field: "fechaHora",
    },
    prioridad: {
        type: sequelize_1.DataTypes.ENUM("BAJA", "MEDIA", "ALTA", "URGENTE"),
        allowNull: false,
        defaultValue: "MEDIA",
    },
    motivo: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("ACTIVE", "INACTIVE"),
        allowNull: false,
        defaultValue: "ACTIVE",
    },
    modalidad: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    equipo: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    medico: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: true,
    },
    tecnologo: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: true,
    },
}, {
    sequelize: connection_1.default,
    modelName: "Study",
    tableName: "studies",
    timestamps: false,
    underscored: true,
});
exports.default = Study;
//# sourceMappingURL=Studie.js.map