"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorRoutes = void 0;
const doctor_controller_1 = require("../controllers/doctor.controller");
class DoctorRoutes {
    constructor() {
        this.doctorController = new doctor_controller_1.DoctorController();
    }
    routes(app) {
        // Obtener todos los doctores activos
        app.route("/doctors").get(this.doctorController.getAllDoctors);
        // Obtener un doctor por ID
        app.route("/doctors/:id").get(this.doctorController.getDoctorById);
        // Crear un nuevo doctor
        app.route("/doctors").post(this.doctorController.createDoctor);
        // Actualizar un doctor por ID
        app.route("/doctors/:id").put(this.doctorController.updateDoctor);
        // Eliminar (status = INACTIVE)
        app.route("/doctors/:id").delete(this.doctorController.deleteDoctor);
    }
}
exports.DoctorRoutes = DoctorRoutes;
//# sourceMappingURL=doctor.js.map