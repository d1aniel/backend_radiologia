"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelRoutes = void 0;
const label_controller_1 = require("../controllers/label.controller");
class LabelRoutes {
    constructor() {
        this.labelController = new label_controller_1.LabelController();
    }
    routes(app) {
        // Obtener todas las etiquetas activas
        app.route("/labels").get(this.labelController.getAllLabels);
        // Obtener una etiqueta por ID
        app.route("/labels/:id").get(this.labelController.getLabelById);
        // Crear una nueva etiqueta
        app.route("/labels").post(this.labelController.createLabel);
        // Actualizar una etiqueta por ID
        app.route("/labels/:id").put(this.labelController.updateLabel);
        // Eliminar (status = INACTIVE)
        app.route("/labels/:id").delete(this.labelController.deleteLabel);
    }
}
exports.LabelRoutes = LabelRoutes;
//# sourceMappingURL=label.js.map