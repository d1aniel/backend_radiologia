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
    
    this.patientRoutes.routes(app);

    
    this.doctorRoutes.routes(app);

    
    this.imageRoutes.routes(app);

    
    this.labelRoutes.routes(app);

    
    this.modalidadRoutes.routes(app);

    
    this.paymentRoutes.routes(app);

    
    this.quoteRoutes.routes(app);

    
    this.quoteRoutes.routes(app)

    
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
