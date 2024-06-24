import express from "express";
import cors from "cors";


//import routes
import studentRouter from "./routes/student.routes.js";
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());
app.use("/api/v1/students", studentRouter);
export { app };
