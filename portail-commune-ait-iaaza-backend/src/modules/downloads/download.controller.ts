import {Router} from 'express'
import type {Request,Response} from 'express'
import path from 'path'
import fs from 'fs'


export const downloadsRouter = Router();

downloadsRouter.get("/download", (req: Request, res: Response) => {
  const filePath = req.query.file as string;

  if (!filePath) {
    return res.status(400).json({ ok: false, message: "File path required" });
  }

  // Resolve file path safely within uploads folder
  const absolutePath = path.join(process.cwd(), path.basename(filePath));

console.log(absolutePath)

  // Verify file existence
  if (!fs.existsSync(absolutePath)) {
    return res.status(404).json({ ok: false, message: "File not found" });
  }

  // Force browser to download the file directly
  return res.download(absolutePath, (err) => {
    if (err && !res.headersSent) {
      return res.status(500).json({ ok: false, message: "Download failed" });
    }
  });
});