import { Request, Response } from "express";
export declare class TeamController {
    getAllTeams(req: Request, res: Response): Promise<void>;
    getTeamById(req: Request, res: Response): Promise<void>;
    createTeam(req: Request, res: Response): Promise<void>;
    updateTeam(req: Request, res: Response): Promise<void>;
    deleteTeam(req: Request, res: Response): Promise<void>;
    deleteTeamAdv(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=team.controller.d.ts.map