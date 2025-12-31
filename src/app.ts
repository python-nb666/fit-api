import express from "express";
import cors from "cors";
import exerciseRouter from "./routes/exercises";
import recordRouter from "./routes/records";
import { setupSwagger } from "./swagger";

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use("/api/exercises", exerciseRouter);
app.use("/api/records", recordRouter);

// Swagger 文档
setupSwagger(app);

// 测试路由
app.get("/", (req, res) => {
  res.send("Express app is ready");
});

export default app;
