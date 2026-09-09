import { Router, type Request, type Response } from "express";
import { PacInfo } from "../../models/PacInfo.ts";

export const pacRouter = Router();

// GET /pac/info
pacRouter.get("/info", async (req: Request, res: Response) => {
  try {
    const pacInfo = await PacInfo.findOne({
      where: { isActive: true },
      order: [["id", "DESC"]], 
    });

    if (!pacInfo) {
      return res.status(404).json({
        ok: false,
        message: "No active PAC info found",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "PAC info fetched successfully",
      data: pacInfo,
    });
  } catch (error) {
    console.error("Error fetching PAC info:", error);

    return res.status(500).json({
      ok: false,
      message: "Something went wrong while fetching PAC info",
    });
  }
});