import express from "express";

const app = express();

// 中间件
app.use(express.json());

// 测试路由
app.get("/", (req, res) => {
  res.send("Express app is ready");
});

export default app;
