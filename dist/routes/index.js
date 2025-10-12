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
    }
    routes(app) {
        // rutas de pacientes
        this.patientRoutes.routes(app);
        // rutas de doctores
        this.doctorRoutes.routes(app);
        // rutas de imágenes
        this.imageRoutes.routes(app);
        // rutas de etiquetas
        this.labelRoutes.routes(app);
        // rutas de modalidades
        this.modalidadRoutes.routes(app);
        // rutas de pagos
        this.paymentRoutes.routes(app);
        // rutas de citas
        this.quoteRoutes.routes(app);
        // rutas de informe
        this.quoteRoutes.routes(app);
        // rutas de equipos
        this.teamRoutes.routes(app);
        // rutas de estudios
        this.studyRoutes.routes(app);
        // rutas de tecnólogos
        this.technologistRoutes.routes(app);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map