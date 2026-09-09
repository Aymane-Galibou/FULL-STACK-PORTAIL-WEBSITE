import { Router, type Request, type Response } from "express";
import { InternalRegulation } from "../../models/InternalRegulation.ts";

export const internalRegulationsRouter = Router();

internalRegulationsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { active } = req.query;

    // Construction dynamique du filtre si ?active=true/false est fourni
    const whereClause: Record<string, unknown> = {};
    if (active !== undefined) {
      whereClause.isActive = active === "true";
    }

    const regulations = await InternalRegulation.findAll({
      where: whereClause,
      order: [["adoptionDate", "DESC"]], 
    });

    if (regulations.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "No internal regulations found",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Internal regulations fetched successfully",
      data: regulations,
    });
  } catch (error) {
    console.error("Error fetching internal regulations:", error);

    return res.status(500).json({
      ok: false,
      message: "Something went wrong while fetching internal regulations",
    });
  }
});