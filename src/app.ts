import express, { Application } from "express";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import cors from "cors";
import globalErrorHandler from "./app/middleware/globalError";

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

app.use(globalErrorHandler);

export default app;
