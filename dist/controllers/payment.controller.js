"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const sequelize_1 = require("sequelize");
const Payment_1 = require("../models/Payment");
class PaymentController {
    // Obtener todos los pagos (excepto los VOID)
    getAllPayments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payments = yield Payment_1.Payment.findAll({
                    where: { estado: { [sequelize_1.Op.ne]: "VOID" } },
                });
                res.status(200).json({ payments });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error fetching payments" });
            }
        });
    }
    // Obtener un pago por ID
    getPaymentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const payment = yield Payment_1.Payment.findOne({
                    where: { id: pk, estado: { [sequelize_1.Op.ne]: "VOID" } },
                });
                if (payment) {
                    res.status(200).json(payment);
                }
                else {
                    res.status(404).json({ error: "Payment not found or voided" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error fetching payment" });
            }
        });
    }
    // Crear un nuevo pago
    createPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const body = req.body;
                // Garantizar valores mínimos / defaults
                const payload = {
                    pacienteId: body.pacienteId,
                    estudioId: (_a = body.estudioId) !== null && _a !== void 0 ? _a : null,
                    monto: body.monto,
                    metodo: (_b = body.metodo) !== null && _b !== void 0 ? _b : "EFECTIVO",
                    fecha: body.fecha, // esperar YYYY-MM-DD desde el frontend
                    estado: (_c = body.estado) !== null && _c !== void 0 ? _c : "PAID",
                };
                const payment = yield Payment_1.Payment.create(payload);
                res.status(201).json(payment);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error creating payment" });
            }
        });
    }
    // Actualizar un pago por ID
    updatePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const body = req.body;
                const payment = yield Payment_1.Payment.findByPk(pk);
                if (!payment) {
                    return res.status(404).json({ error: "Payment not found" });
                }
                yield payment.update(body);
                res.status(200).json(payment);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error updating payment" });
            }
        });
    }
    // "Eliminar" un pago -> marcar como VOID
    deletePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const payment = yield Payment_1.Payment.findByPk(pk);
                if (!payment) {
                    return res.status(404).json({ error: "Payment not found" });
                }
                yield payment.update({ estado: "VOID" });
                res.status(200).json({ message: "Payment set to VOID" });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error deleting payment" });
            }
        });
    }
}
exports.PaymentController = PaymentController;
//# sourceMappingURL=payment.controller.js.map