// src/controllers/team.controller.ts
import { Request, Response } from "express";
import Team, { TeamI } from "../models/Team";

export class TeamController {
  // Obtener todos los equipos
  public async getAllTeams(req: Request, res: Response) {
    try {
      const teams: TeamI[] = await Team.findAll();
      res.status(200).json({ teams });
    } catch (error) {
      console.error("getAllTeams error:", error);
      res.status(500).json({ error: "Error fetching teams" });
    }
  }

  // Obtener un equipo por ID
  public async getTeamById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const team = await Team.findOne({ where: { id: pk } });

      if (team) {
        res.status(200).json(team);
      } else {
        res.status(404).json({ error: "Team not found" });
      }
    } catch (error) {
      console.error("getTeamById error:", error);
      res.status(500).json({ error: "Error fetching team" });
    }
  }

  // Crear un nuevo equipo
  public async createTeam(req: Request, res: Response) {
    try {
      const body = req.body as TeamI;
      const team = await Team.create(body as any);
      res.status(201).json(team);
    } catch (error) {
      console.error("createTeam error:", error);
      res.status(500).json({ error: "Error creating team" });
    }
  }

  // Actualizar un equipo por ID
  public async updateTeam(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const body = req.body as Partial<TeamI>;

      const team = await Team.findByPk(pk);
      if (!team) {
        return res.status(404).json({ error: "Team not found" });
      }

      await team.update(body);
      res.status(200).json(team);
    } catch (error) {
      console.error("updateTeam error:", error);
      res.status(500).json({ error: "Error updating team" });
    }
  }

  // Eliminar un equipo (borrado físico)
  public async deleteTeam(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const team = await Team.findByPk(pk);

      if (!team) {
        return res.status(404).json({ error: "Team not found" });
      }

      await team.destroy();
      res.status(200).json({ message: "Team deleted" });
    } catch (error) {
      console.error("deleteTeam error:", error);
      res.status(500).json({ error: "Error deleting team" });
    }
  }
}