"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenRoutes = void 0;
const refres_token_controller_1 = require("../../controllers/refres_token.controller");
class RefreshTokenRoutes {
    constructor() {
        this.refreshTokenController = new refres_token_controller_1.RefreshTokenController();
    }
    routes(app) {
        app.route("/refresk-token")
            .get(this.refreshTokenController.getAllRefreshToken);
    }
}
exports.RefreshTokenRoutes = RefreshTokenRoutes;
//# sourceMappingURL=refres_token.js.map