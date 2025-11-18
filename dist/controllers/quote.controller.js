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
exports.QuoteController = void 0;
const Quote_1 = require("../models/Quote");
const Pacient_1 = require("../models/Pacient");
const Technologist_1 = require("../models/Technologist");
class QuoteController {
    getAllQuotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quotes = yield Quote_1.Quote.findAll({
                    include: [
                        {
                            model: Pacient_1.Patient,
                            as: "paciente_obj",
                            attributes: ["id", "nombre", "apellido", "documento"],
                        },
                        {
                            model: Technologist_1.Technologist,
                            as: "technologist_obj",
                            attributes: ["id", "nombre", "especialidad"],
                        },
                    ],
                });
                res.status(200).json({ quotes });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error fetching quotes" });
            }
        });
    }
    getQuoteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const quote = yield Quote_1.Quote.findByPk(pk, {
                    include: [
                        {
                            model: Pacient_1.Patient,
                            as: "paciente_obj",
                            attributes: ["id", "nombre", "apellido", "documento"],
                        },
                        {
                            model: Technologist_1.Technologist,
                            as: "technologist_obj",
                            attributes: ["id", "nombre", "especialidad"],
                        },
                    ],
                });
                if (quote) {
                    res.status(200).json({ quote });
                }
                else {
                    res.status(404).json({ error: "Quote not found" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error fetching quote" });
            }
        });
    }
    createQuote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { patient_id, technologist_id, modalidad, equipo, fechaHora, motivo, estado, } = req.body;
            try {
                const body = {
                    patient_id,
                    technologist_id,
                    modalidad,
                    equipo,
                    fechaHora,
                    motivo,
                    estado: (estado !== null && estado !== void 0 ? estado : "PENDIENTE"),
                };
                const newQuote = yield Quote_1.Quote.create(Object.assign({}, body));
                res.status(201).json(newQuote);
            }
            catch (error) {
                console.error(error);
                res
                    .status(400)
                    .json({ error: (_a = error.message) !== null && _a !== void 0 ? _a : "Error creating quote" });
            }
        });
    }
    updateQuote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { id: pk } = req.params;
            const { patient_id, technologist_id, modalidad, equipo, fechaHora, motivo, estado, } = req.body;
            try {
                const body = {
                    patient_id,
                    technologist_id,
                    modalidad,
                    equipo,
                    fechaHora,
                    motivo,
                    estado,
                };
                const quoteExist = yield Quote_1.Quote.findByPk(pk);
                if (quoteExist) {
                    yield quoteExist.update(body);
                    res.status(200).json(quoteExist);
                }
                else {
                    res.status(404).json({ error: "Quote not found" });
                }
            }
            catch (error) {
                console.error(error);
                res
                    .status(400)
                    .json({ error: (_a = error.message) !== null && _a !== void 0 ? _a : "Error updating quote" });
            }
        });
    }
    deleteQuote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const quoteToDelete = yield Quote_1.Quote.findByPk(id);
                if (quoteToDelete) {
                    yield quoteToDelete.destroy();
                    res.status(200).json({ message: "Quote deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Quote not found" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error deleting quote" });
            }
        });
    }
    deleteQuoteAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const quoteToUpdate = yield Quote_1.Quote.findByPk(pk);
                if (quoteToUpdate) {
                    yield quoteToUpdate.update({ estado: "CANCELADA" });
                    res.status(200).json({ message: "Quote marked as CANCELADA" });
                }
                else {
                    res.status(404).json({ error: "Quote not found" });
                }
            }
            catch (error) {
                console.error(error);
                res
                    .status(500)
                    .json({ error: "Error marking quote as CANCELADA" });
            }
        });
    }
}
exports.QuoteController = QuoteController;
//# sourceMappingURL=quote.controller.js.map