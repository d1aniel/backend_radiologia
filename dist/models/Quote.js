"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quote = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class Quote extends sequelize_1.Model {
}
exports.Quote = Quote;
Quote.init({
    patient_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    technologist_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    modalidad: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    equipo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fechaHora: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    motivo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [5, 255],
                msg: "El motivo debe tener entre 5 y 255 caracteres",
            },
        },
    },
    estado: {
        type: sequelize_1.DataTypes.ENUM("PENDIENTE", "CONFIRMADA", "ATENDIDA", "CANCELADA"),
        defaultValue: "PENDIENTE",
    },
}, {
    sequelize: connection_1.default,
    modelName: "Quote",
    tableName: "quotes",
    timestamps: false,
});
//# sourceMappingURL=Quote.js.map