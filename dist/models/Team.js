"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
// src/models/team.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class Team extends sequelize_1.Model {
}
exports.Team = Team;
Team.init({
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    modalidad: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    ubicacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    estado: {
        type: sequelize_1.DataTypes.ENUM("DISPONIBLE", "MANTENIMIENTO", "OCUPADO"),
        allowNull: true,
        defaultValue: "DISPONIBLE",
    },
    observaciones: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize: connection_1.default,
    modelName: "Team",
    tableName: "teams",
    timestamps: false,
});
exports.default = Team;
//# sourceMappingURL=Team.js.map