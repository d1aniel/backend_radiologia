import { Application } from "express";
import { PatientRoutes } from "./pacient";
import { DoctorRoutes } from "./doctor";
import { ImageRoutes } from "./image";
import { LabelRoutes } from "./label";
import { ModalidadRoutes } from "./modalitie";
import { PaymentRoutes } from "./payment";
import { QuoteRoutes } from "./quote";
import { ReportRoutes } from "./report";
import { TeamRoutes } from "./team";
import { StudyRoutes } from "./studie";
import { TechnologistRoutes } from "./technologist";
export declare class Routes {
    patientRoutes: PatientRoutes;
    doctorRoutes: DoctorRoutes;
    imageRoutes: ImageRoutes;
    labelRoutes: LabelRoutes;
    modalidadRoutes: ModalidadRoutes;
    paymentRoutes: PaymentRoutes;
    quoteRoutes: QuoteRoutes;
    reportRoutes: ReportRoutes;
    teamRoutes: TeamRoutes;
    studyRoutes: StudyRoutes;
    technologistRoutes: TechnologistRoutes;
    routes(app: Application): void;
}
//# sourceMappingURL=index.d.ts.map