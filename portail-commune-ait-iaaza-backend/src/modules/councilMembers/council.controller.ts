import { Router, type Request, type Response } from "express";
import { CouncilMember } from "../../models/CouncilMembers.ts";

export const councilMembersRouter = Router();

councilMembersRouter.get("/", async (req: Request, res: Response) => {
  try {
    const bureau = req.query.bureau === "true";

    // building a dynamic where clause to filter bureau Member
    const whereClause = bureau ? { isBureauMember: true } : {};

    const order: any = bureau
      ? [
          ["bureauOrder", "ASC"],
          ["id", "ASC"],
        ]
      : [["id", "ASC"]];
      
    const members = await CouncilMember.findAll({
      where: whereClause,
      order: order,
    });

    if (members.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "No council members found",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Council members fetched successfully",
      data: members,
    });
  } catch (error) {
    console.error("Error fetching council members:", error);

    return res.status(500).json({
      ok: false,
      message: "Something went wrong while fetching council members",
    });
  }
});
