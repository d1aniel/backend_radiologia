"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudyRoutes = void 0;
const studie_controller_1 = require("../controllers/studie.controller");
const auth_1 = require("../middleware/auth");
class StudyRoutes {
    constructor() {
        this.studyController = new studie_controller_1.StudyController();
    }
    routes(app) {
        app.route("/api/estudios")
            .get(auth_1.authMiddleware, this.studyController.getAllStudies)
            .post(auth_1.authMiddleware, this.studyController.createStudy);
        app.route("/api/estudios/:id")
            .get(auth_1.authMiddleware, this.studyController.getStudyById)
            .patch(auth_1.authMiddleware, this.studyController.updateStudy)
            .delete(auth_1.authMiddleware, this.studyController.deleteStudy);
        app.route("/api/estudios/:id/logic")
            .delete(auth_1.authMiddleware, this.studyController.deleteStudy);
    }
}
exports.StudyRoutes = StudyRoutes;
//# sourceMappingURL=studie.js.map