// 加载环境变量
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// ========== 连接数据库 ==========
const dbUri = process.env.DB_URI;

mongoose
  .connect(dbUri)
  .then(() => {
    console.log("✅ MongoDB 连接成功！");
  })
  .catch((err) => {
    console.error("❌ MongoDB 连接失败：", err.message);
  });

// ========== 创建一个简单的数据模型 ==========
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

// ========== 路由 ==========

// 1. 测试接口
app.get("/", (req, res) => {
  res.json({
    message: "🎉 服务器运行正常！",
    database: mongoose.connection.readyState === 1 ? "已连接" : "未连接",
  });
});

// 2. 创建用户（测试写入数据库）
app.post("/api/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.json({
      success: true,
      message: "用户创建成功！",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "创建失败",
      error: error.message,
    });
  }
});

// 3. 获取所有用户（测试读取数据库）
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "查询失败",
      error: error.message,
    });
  }
});

// ========== 启动服务器 ==========
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
});
