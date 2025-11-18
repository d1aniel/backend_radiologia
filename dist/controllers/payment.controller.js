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
    getPaymentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const payment = yield Payment_1.Payment.findOne({
                    where: { id: pk, estado: { [sequelize_1.Op.ne]: "VOID" } },
                });
                if (payment) {
                    res.status(200).json({ payment });
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
    createPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { pacienteId, estudioId, monto, metodo, fecha, estado } = req.body;
            try {
                const body = {
                    pacienteId,
                    estudioId: estudioId !== null && estudioId !== void 0 ? estudioId : null,
                    monto,
                    metodo: metodo !== null && metodo !== void 0 ? metodo : "EFECTIVO",
                    fecha,
                    estado: estado !== null && estado !== void 0 ? estado : "PAID",
                };
                const newPayment = yield Payment_1.Payment.create(Object.assign({}, body));
                res.status(201).json(newPayment);
            }
            catch (error) {
                console.error(error);
                res.status(400).json({ error: (_a = error.message) !== null && _a !== void 0 ? _a : "Error creating payment" });
            }
        });
    }
    updatePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { id: pk } = req.params;
            const { pacienteId, estudioId, monto, metodo, fecha, estado } = req.body;
            try {
                const body = {
                    pacienteId,
                    estudioId,
                    monto,
                    metodo,
                    fecha,
                    estado,
                };
                const paymentExist = yield Payment_1.Payment.findOne({
                    where: { id: pk, estado: { [sequelize_1.Op.ne]: "VOID" } },
                });
                if (paymentExist) {
                    yield paymentExist.update(body);
                    res.status(200).json(paymentExist);
                }
                else {
                    res.status(404).json({ error: "Payment not found or voided" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(400).json({ error: (_a = error.message) !== null && _a !== void 0 ? _a : "Error updating payment" });
            }
        });
    }
    deletePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const paymentToDelete = yield Payment_1.Payment.findByPk(id);
                if (paymentToDelete) {
                    yield paymentToDelete.destroy();
                    res.status(200).json({ message: "Payment deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Payment not found" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error deleting payment" });
            }
        });
    }
    deletePaymentAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const paymentToUpdate = yield Payment_1.Payment.findOne({
                    where: { id: pk, estado: { [sequelize_1.Op.ne]: "VOID" } },
                });
                if (paymentToUpdate) {
                    yield paymentToUpdate.update({ estado: "VOID" });
                    res.status(200).json({ message: "Payment marked as VOID" });
                }
                else {
                    res.status(404).json({ error: "Payment not found or already voided" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error marking payment as VOID" });
            }
        });
    }
}
exports.PaymentController = PaymentController;
//# sourceMappingURL=payment.controller.js.map