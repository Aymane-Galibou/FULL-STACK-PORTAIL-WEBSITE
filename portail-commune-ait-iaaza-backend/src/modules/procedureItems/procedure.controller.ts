import { Router, type Request, type Response } from "express";
import { ProcedureItem } from "../../models/ProcedureItems.ts";

export const procedureItemsRouter = Router();

// get all the procedures of a category 
procedureItemsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { category,id } = req.query;

    const whereClause:Record<string,string|number>= {}

    if(category) whereClause['categorySlug'] =String(category)
    
    if(id) whereClause['id']=Number(id)

    const procedures = await ProcedureItem.findAll({
      where: whereClause,
      order: [["id", "ASC"]], 
    });

    if (procedures.length === 0) {
      return res.status(404).json({
        ok: false,
        message: category
          ? `No procedures found for category '${category}'`
          : "No procedures found",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Procedure items fetched successfully",
      data: procedures,
    });
  } catch (error) {
    console.error("Error fetching procedure items:", error);

    return res.status(500).json({
      ok: false,
      message: "Something went wrong while fetching procedure items",
    });
  }
});

