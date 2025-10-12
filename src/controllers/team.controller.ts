// src/controllers/team.controller.ts
import { Request, Response } from "express";
import Team, { TeamI, EstadoTeam } from "../models/Team";

export class TeamController {
  // Obtener todos los equipos
  public async getAllTeams(req: Request, res: Response) {
    try {
      const teams: TeamI[] = await Team.findAll();
      res.status(200).json({ teams });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching teams" });
    }
  }

  // Obtener un equipo por ID
  public async getTeamById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const team = await Team.findOne({ where: { id: pk } });

      if (team) {
        // mantengo el envoltorio { team } siguiendo el patrón del profe
        res.status(200).json({ team });
      } else {
        res.status(404).json({ error: "Team not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching team" });
    }
  }

  // Crear un nuevo equipo
  public async createTeam(req: Request, res: Response) {
    // Desestructuro explícito como en PatientController
    const { nombre, modalidad, ubicacion, estado, observaciones } = req.body;

    try {
      const body: TeamI = {
        nombre,
        modalidad,
        ubicacion,
        estado,
        observaciones,
      };

      const newTeam = await Team.create({ ...body } as any);
      res.status(201).json(newTeam);
    } catch (error: any) {
      console.error(error);
      // Devuelvo 400 si Sequelize lanza validación; 500 para otros casos.
      res.status(400).json({ error: error.message ?? "Error creating team" });
    }
  }

  // Actualizar un equipo (si existe)
  public async updateTeam(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { nombre, modalidad, ubicacion, estado, observaciones } = req.body;

    try {
      const body: TeamI = {
        nombre,
        modalidad,
        ubicacion,
        estado,
        observaciones,
      };

      const teamExist = await Team.findByPk(pk);

      if (teamExist) {
        await teamExist.update(body, { where: { id: pk } });
        res.status(200).json(teamExist);
      } else {
        res.status(404).json({ error: "Team not found" });
      }
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ error: error.message ?? "Error updating team" });
    }
  }

  // Eliminar un equipo físicamente (destroy)
  public async deleteTeam(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const teamToDelete = await Team.findByPk(id);

      if (teamToDelete) {
        await teamToDelete.destroy();
        res.status(200).json({ message: "Team deleted successfully" });
      } else {
        res.status(404).json({ error: "Team not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error deleting team" });
    }
  }

  // "Borrado lógico" alternativo: marcar equipo como MANTENIMIENTO (opcional)
  // Útil si no quieres eliminar físicamente el registro pero sí sacarlo de la agenda
  public async deleteTeamAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const teamToUpdate = await Team.findByPk(pk);

      if (teamToUpdate) {
        await teamToUpdate.update({ estado: "MANTENIMIENTO" as EstadoTeam });
        res.status(200).json({ message: "Team marked as MANTENIMIENTO" });
      } else {
        res.status(404).json({ error: "Team not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error marking team as MANTENIMIENTO" });
    }
  }
}
