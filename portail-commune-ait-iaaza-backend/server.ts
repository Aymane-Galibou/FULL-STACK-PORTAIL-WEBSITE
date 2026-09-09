import express, { type Express, type Request, type Response } from "express";
import { createServer } from "node:http";
import { bootstrap } from "./src/app.controller.js";
import cors from 'cors'

const port = process.env.PORT || 4000;

const app = express();
const Server = createServer(app);

app.use(cors())

bootstrap(app);


app.get("/", (req: Request, res: Response) => {
  res.send({
    ok: true,
    message: "Resources are fetched successfuly",
  });
});

Server.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
