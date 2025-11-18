"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorRoutes = void 0;
const doctor_controller_1 = require("../controllers/doctor.controller");
const auth_1 = require("../middleware/auth");
class DoctorRoutes {
    constructor() {
        this.doctorController = new doctor_controller_1.DoctorController();
    }
    routes(app) {
        app.route("/api/doctores/public")
            .get(this.doctorController.getAllDoctors)
            .post(this.doctorController.createDoctor);
        app.route("/api/doctores/public/:id")
            .get(this.doctorController.getDoctorById)
            .patch(this.doctorController.updateDoctor)
            .delete(this.doctorController.deleteDoctor);
        app.route("/api/doctores/public/:id/logic")
            .delete(this.doctorController.deleteDoctorAdv);
        app.route("/api/doctores")
            .get(auth_1.authMiddleware, this.doctorController.getAllDoctors)
            .post(auth_1.authMiddleware, this.doctorController.createDoctor);
        app.route("/api/doctores/:id")
            .get(auth_1.authMiddleware, this.doctorController.getDoctorById)
            .patch(auth_1.authMiddleware, this.doctorController.updateDoctor)
            .delete(auth_1.authMiddleware, this.doctorController.deleteDoctor);
        app.route("/api/doctores/:id/logic")
            .delete(auth_1.authMiddleware, this.doctorController.deleteDoctorAdv);
    }
}
exports.DoctorRoutes = DoctorRoutes;
//# sourceMappingURL=doctor.js.map