"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const pacient_1 = require("./pacient");
const doctor_1 = require("./doctor");
const image_1 = require("./image");
const label_1 = require("./label");
const modalitie_1 = require("./modalitie");
const payment_1 = require("./payment");
const quote_1 = require("./quote");
const report_1 = require("./report");
const team_1 = require("./team");
const studie_1 = require("./studie");
const technologist_1 = require("./technologist");
const user_1 = require("./authorization/user");
const role_1 = require("./authorization/role");
const role_user_1 = require("./authorization/role_user");
const resource_1 = require("./authorization/resource");
const resourcerole_1 = require("./authorization/resourcerole");
const refres_token_1 = require("./authorization/refres_token");
const auth_1 = require("./authorization/auth");
class Routes {
    constructor() {
        this.patientRoutes = new pacient_1.PatientRoutes();
        this.doctorRoutes = new doctor_1.DoctorRoutes();
        this.imageRoutes = new image_1.ImageRoutes();
        this.labelRoutes = new label_1.LabelRoutes();
        this.modalidadRoutes = new modalitie_1.ModalidadRoutes();
        this.paymentRoutes = new payment_1.PaymentRoutes();
        this.quoteRoutes = new quote_1.QuoteRoutes();
        this.reportRoutes = new report_1.ReportRoutes();
        this.teamRoutes = new team_1.TeamRoutes();
        this.studyRoutes = new studie_1.StudyRoutes();
        this.technologistRoutes = new technologist_1.TechnologistRoutes();
        this.userRoutes = new user_1.UserRoutes();
        this.roleRoutes = new role_1.RoleRoutes();
        this.roleUserRoutes = new role_user_1.RoleUserRoutes();
        this.resourceRoutes = new resource_1.ResourceRoutes();
        this.resourceRoleRoutes = new resourcerole_1.ResourceRoleRoutes();
        this.refreshTokenRoutes = new refres_token_1.RefreshTokenRoutes();
        this.authRoutes = new auth_1.AuthRoutes();
    }
    routes(app) {
        this.patientRoutes.routes(app);
        this.doctorRoutes.routes(app);
        this.imageRoutes.routes(app);
        this.labelRoutes.routes(app);
        this.modalidadRoutes.routes(app);
        this.paymentRoutes.routes(app);
        this.quoteRoutes.routes(app);
        this.quoteRoutes.routes(app);
        this.teamRoutes.routes(app);
        this.studyRoutes.routes(app);
        this.technologistRoutes.routes(app);
        this.userRoutes.routes(app);
        this.roleRoutes.routes(app);
        this.roleUserRoutes.routes(app);
        this.resourceRoutes.routes(app);
        this.resourceRoleRoutes.routes(app);
        this.refreshTokenRoutes.routes(app);
        this.authRoutes.routes(app);
        this.reportRoutes.routes(app);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map