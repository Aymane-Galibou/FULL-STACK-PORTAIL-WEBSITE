import { Router, type Request, type Response } from "express";
import { SessionReport, type SessionType } from "../../models/SessionReports.ts";

export const sessionReportsRouter = Router();

sessionReportsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { type, year } = req.query;

    // Construction dynamique de la clause WHERE
    const whereClause: Record<string, SessionType | number> = {};

    if (type) {
      whereClause.sessionType = String(type).toUpperCase() as SessionType;
    }

    if (year) {
      whereClause.year = Number(year);
    }

    const reports = await SessionReport.findAll({
      where: whereClause,
      order: [["sessionDate", "DESC"]], // Sessions les plus récentes en premier
    });

    if (reports.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "No session reports found",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Session reports fetched successfully",
      data: reports,
    });
  } catch (error) {
    console.error("Error fetching session reports:", error);

    return res.status(500).json({
      ok: false,
      message: "Something went wrong while fetching session reports",
    });
  }
});