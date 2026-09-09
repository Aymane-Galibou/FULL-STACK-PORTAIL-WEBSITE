import { Router, type Request, type Response } from "express";
import { PresidentProfile } from "../../models/PresidentProfile.ts";

export const presidentProfileRouter = Router();

presidentProfileRouter.get("/", async (req: Request, res: Response) => {
  try {
    
    const presidentProfile = await PresidentProfile.findOne({
      where: { isActive: true },
    });

    if (!presidentProfile) {
      return res.status(404).json({
        ok: false,
        message: "President profile not found",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "The president profile was fetched successfully",
      data: presidentProfile,
    });
  } catch (error) {
    console.error("Error fetching president profile:", error);
    
    return res.status(500).json({
      ok: false,
      message: "Something went wrong while fetching the president profile",
    });
  }
});