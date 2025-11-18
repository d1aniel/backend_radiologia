import { Application } from "express";
import { RefreshTokenController } from "../../controllers/refres_token.controller";

export class RefreshTokenRoutes {
  public refreshTokenController: RefreshTokenController = new RefreshTokenController();

  public routes(app: Application): void {
    
    app.route("/refresk-token")
      .get(this.refreshTokenController.getAllRefreshToken);

    
    



  }
}