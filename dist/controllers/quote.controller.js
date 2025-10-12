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
class QuoteController {
    // Obtener todas las citas
    getAllQuotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quotes = yield Quote_1.Quote.findAll();
                res.status(200).json({ quotes });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching quotes" });
            }
        });
    }
    // Obtener una cita por ID
    getQuoteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const quote = yield Quote_1.Quote.findByPk(pk);
                if (quote) {
                    res.status(200).json(quote);
                }
                else {
                    res.status(404).json({ error: "Quote not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching quote" });
            }
        });
    }
    // Crear una nueva cita
    createQuote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const quote = yield Quote_1.Quote.create(body);
                res.status(201).json(quote);
            }
            catch (error) {
                res.status(500).json({ error: "Error creating quote" });
            }
        });
    }
    // Actualizar una cita por ID
    updateQuote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const body = req.body;
                const quote = yield Quote_1.Quote.findByPk(pk);
                if (!quote) {
                    return res.status(404).json({ error: "Quote not found" });
                }
                yield quote.update(body);
                res.status(200).json(quote);
            }
            catch (error) {
                res.status(500).json({ error: "Error updating quote" });
            }
        });
    }
    // Eliminar una cita (aquí puedes hacer borrado físico o lógico si prefieres)
    deleteQuote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const quote = yield Quote_1.Quote.findByPk(pk);
                if (!quote) {
                    return res.status(404).json({ error: "Quote not found" });
                }
                yield quote.destroy();
                res.status(200).json({ message: "Quote deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting quote" });
            }
        });
    }
}
exports.QuoteController = QuoteController;
//# sourceMappingURL=quote.controller.js.map