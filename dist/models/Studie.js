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
    // columna FK: patient_id (debe coincidir exactamente con foreignKey en relaciones)
    patient_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    modalidad: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    equipo: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    tecnologo: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    medico: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    fechaHora: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
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
        defaultValue: "ACTIVE",
    },
}, {
    sequelize: connection_1.default,
    modelName: "Study",
    tableName: "studies",
    timestamps: false,
});
//# sourceMappingURL=Studie.js.map