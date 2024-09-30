import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import cors from "cors";

const app: Application = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("/api/v1/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("iam home");
});

export default app;
