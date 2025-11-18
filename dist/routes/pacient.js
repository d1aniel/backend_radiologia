"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientRoutes = void 0;
const pacient_controller_1 = require("../controllers/pacient.controller");
const auth_1 = require("../middleware/auth");
class PatientRoutes {
    constructor() {
        this.patientController = new pacient_controller_1.PatientController();
    }
    routes(app) {
        app.route("/api/pacientes")
            .get(auth_1.authMiddleware, this.patientController.getAllPatients)
            .post(auth_1.authMiddleware, this.patientController.createPatient);
        app.route("/api/pacientes/:id")
            .get(auth_1.authMiddleware, this.patientController.getPatientById)
            .patch(auth_1.authMiddleware, this.patientController.updatePatient)
            .delete(auth_1.authMiddleware, this.patientController.deletePatient);
        app.route("/api/pacientes/:id/logic")
            .delete(auth_1.authMiddleware, this.patientController.deletePatientAdv);
    }
}
exports.PatientRoutes = PatientRoutes;
//# sourceMappingURL=pacient.js.map