import { Router, type Request, type Response } from "express";
import { Project } from "../../models/Projects.ts";

export const projectsRouter = Router();

projectsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const projects = await Project.findAll({
      order: [["createdAt", "DESC"]], 
    });

    if (projects.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "No projects found",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Projects fetched successfully",
      data: projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);

    return res.status(500).json({
      ok: false,
      message: "Something went wrong while fetching projects",
    });
  }
});


projectsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(Number(id));

    if (!project) {
      return res.status(404).json({
        ok: false,
        message: "Projet non trouvé",
      });
    }

    return res.status(200).json(project);
  } catch (error) {
    console.error("Erreur lors de la récupération du projet:", error);
    return res.status(500).json({
      ok: false,
      message: "Erreur serveur lors de la récupération du projet",
    });
  }
});