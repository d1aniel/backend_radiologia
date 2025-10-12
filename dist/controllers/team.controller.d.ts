import { Request, Response } from "express";
export declare class TeamController {
    getAllTeams(req: Request, res: Response): Promise<void>;
    getTeamById(req: Request, res: Response): Promise<void>;
    createTeam(req: Request, res: Response): Promise<void>;
    updateTeam(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteTeam(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=team.controller.d.ts.map