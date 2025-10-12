"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientRoutes = void 0;
const pacient_controller_1 = require("../controllers/pacient.controller");
class PatientRoutes {
    constructor() {
        this.patientController = new pacient_controller_1.PatientController();
    }
    routes(app) {
        // Obtener todos los pacientes activos
        app.route("/patients").get(this.patientController.getAllPatients);
        // Obtener un paciente por ID
        app.route("/patients/:id").get(this.patientController.getPatientById);
        // Crear un nuevo paciente
        app.route("/patients").post(this.patientController.createPatient);
        // Actualizar un paciente por ID
        app.route("/patients/:id").put(this.patientController.updatePatient);
        // Eliminar (status = INACTIVE)
        app.route("/patients/:id").delete(this.patientController.deletePatient);
    }
}
exports.PatientRoutes = PatientRoutes;
//# sourceMappingURL=pacient.js.map