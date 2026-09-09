import { Router, type Request, type Response } from "express";
import { PresidentActivity } from "../../models/PresidentActivity.ts";

export const presidentActivityRouter = Router();

presidentActivityRouter.get("/", async (req: Request, res: Response) => {
  try {
    const presidentActivities = await PresidentActivity.findAll({
      where: { isPublished: true },
      order: [["eventDate", "DESC"]], 
    });

    if (presidentActivities.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "No published president activities found",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "The president activities were fetched successfully",
      data: presidentActivities,
    });
  } catch (error) {
    console.error("Error fetching president activities:", error);

    return res.status(500).json({
      ok: false,
      message: "Something went wrong while fetching the president activities",
    });
  }
});


presidentActivityRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate that id is a valid integer
    const activityId = Number(id)
    
    if (isNaN(activityId)) {
      return res.status(400).json({
        ok: false,
        message: "Invalid activity ID format",
      });
    }

    const activity = await PresidentActivity.findOne({
      where: { id: activityId, isPublished: true },
    });

    if (!activity) {
      return res.status(404).json({
        ok: false,
        message: "President activity not found",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "President activity fetched successfully",
      data: activity,
    });
  } catch (error) {
    console.error("Error fetching single president activity:", error);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong while fetching the president activity",
    });
  }
});

