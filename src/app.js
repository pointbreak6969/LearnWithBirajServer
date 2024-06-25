import express from "express";
import cors from "cors";

//import routes
import studentRouter from "./routes/student.routes.js";
import QueryRouter from "./routes/query.routes.js";
const app = express();
app.use(
  cors({
    origin: "https://learn-with-biraj-clientv1.vercel.app/",
  })
);
app.use(express.json());
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/query", QueryRouter);
export { app };
