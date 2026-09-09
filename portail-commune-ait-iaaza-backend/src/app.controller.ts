import express, { type Express, type Request, type Response } from "express";
import path from "path";
import { procedureItemsRouter } from "./modules/procedureItems/procedure.controller.ts";
import { presidentActivityRouter } from "./modules/presidentActivity/presidentActivity.controller.ts";
import { presidentProfileRouter } from "./modules/presidentProfile/president.controller.ts";
import { projectsRouter } from "./modules/projects/project.controller.ts";
import { sessionReportsRouter } from "./modules/sessionReports/sessionReport.controller.ts";
import { internalRegulationsRouter } from "./modules/internalRegulation/regulation.controller.ts";
import { councilMembersRouter } from "./modules/councilMembers/council.controller.ts";
import { downloadsRouter } from "./modules/downloads/download.controller.ts";
import { pacRouter } from "./modules/pac/pac.controller.ts";


export const bootstrap = (app: Express) => {
  app.use(express.json());

  // to make the files within upload folder accessible
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  // president profiler router
  app.use("/president-profile",presidentProfileRouter)

  // president activity router
  app.use("/president-activity",presidentActivityRouter)

  // procedure items router
  app.use("/procedure-items",procedureItemsRouter)

  // concil projects router
  app.use("/projects",projectsRouter)

  // session reports router
  app.use("/session-reports",sessionReportsRouter)

  // internal regulation router
  app.use("/internal-regulation",internalRegulationsRouter)

  // concil members router
  app.use("/council-members",councilMembersRouter)

  // handling download 
  app.use("/downloads",downloadsRouter)

  // handling municipal action plan
  app.use("/pac",pacRouter)

  app.get("/welcome", async (req: Request, res: Response) => {
    res.send({
      ok: true,
      message: "Endpoint /welcome is fetched successfuly",
    });
  });
};
