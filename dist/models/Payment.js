"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class Payment extends sequelize_1.Model {
}
exports.Payment = Payment;
Payment.init({
    pacienteId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "patient_id",
        validate: {
            isInt: { msg: "pacienteId debe ser entero" },
            min: { args: [1], msg: "pacienteId inválido" },
        },
    },
    estudioId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        field: "quote_id",
        validate: {
            isInt: { msg: "estudioId debe ser entero" },
            min: { args: [1], msg: "estudioId inválido" },
        },
    },
    monto: {
        type: sequelize_1.DataTypes.DECIMAL(14, 2),
        allowNull: false,
        validate: {
            isDecimal: { msg: "monto debe ser numérico" },
            min: { args: [0.01], msg: "monto debe ser mayor a 0" },
        },
    },
    metodo: {
        type: sequelize_1.DataTypes.ENUM("EFECTIVO", "TARJETA", "TRANSFERENCIA", "OTRO"),
        allowNull: false,
        defaultValue: "EFECTIVO",
    },
    fecha: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.ENUM("PAID", "PENDING", "VOID"),
        allowNull: false,
        defaultValue: "PAID",
    },
}, {
    sequelize: connection_1.default,
    modelName: "Payment",
    tableName: "payments",
    timestamps: false,
    indexes: [
        { fields: ["patient_id"] },
        { fields: ["quote_id"] },
        { fields: ["fecha"] },
    ],
});
exports.default = Payment;
//# sourceMappingURL=Payment.js.map