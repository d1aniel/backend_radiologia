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
import { UserRoutes } from "./authorization/user";
import { RoleRoutes } from "./authorization/role";
import { RoleUserRoutes } from "./authorization/role_user";
import { ResourceRoutes } from "./authorization/resource";
import { ResourceRoleRoutes } from "./authorization/resourcerole";
import { RefreshTokenRoutes } from "./authorization/refres_token";
import { AuthRoutes } from "./authorization/auth";

export class Routes {
  public patientRoutes: PatientRoutes = new PatientRoutes();
  public doctorRoutes: DoctorRoutes = new DoctorRoutes();
  public imageRoutes: ImageRoutes = new ImageRoutes();
  public labelRoutes: LabelRoutes = new LabelRoutes();
  public modalidadRoutes: ModalidadRoutes = new ModalidadRoutes();
  public paymentRoutes: PaymentRoutes = new PaymentRoutes();
  public quoteRoutes: QuoteRoutes = new QuoteRoutes();
  public reportRoutes: ReportRoutes = new ReportRoutes();
  public teamRoutes: TeamRoutes = new TeamRoutes();
  public studyRoutes: StudyRoutes = new StudyRoutes();
  public technologistRoutes: TechnologistRoutes = new TechnologistRoutes();
  public userRoutes: UserRoutes = new UserRoutes();
  public roleRoutes: RoleRoutes = new RoleRoutes();
  public roleUserRoutes: RoleUserRoutes = new RoleUserRoutes();
  public resourceRoutes: ResourceRoutes = new ResourceRoutes();
  public resourceRoleRoutes: ResourceRoleRoutes = new ResourceRoleRoutes();
  public refreshTokenRoutes: RefreshTokenRoutes = new RefreshTokenRoutes();
  public authRoutes: AuthRoutes = new AuthRoutes(); 

  public routes(app: Application): void {
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
    this.quoteRoutes.routes(app)

    // rutas de equipos
    this.teamRoutes.routes(app);

    // rutas de estudios
    this.studyRoutes.routes(app);

    // rutas de tecnólogos
    this.technologistRoutes.routes(app);

    // rutas de usuarios
    this.userRoutes.routes(app);

    // rutas de roles
    this.roleRoutes.routes(app);

    // rutas de roleUsers
    this.roleUserRoutes.routes(app);

    // rutas de resources
    this.resourceRoutes.routes(app);

    // rutas de resourceRoles
    this.resourceRoleRoutes.routes(app);

    // rutas de refreshTokens
    this.refreshTokenRoutes.routes(app);

    // rutas de autenticación
    this.authRoutes.routes(app);
    
    // rutas de informes
    this.reportRoutes.routes(app);
  }
}
