const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path");  // 引入 path 模組

const app = express();
const PORT = process.env.PORT || 3000;

const FRONTEND_FOLDER = '../frontend/';

// Middleware
app.use(cors());               // 允許跨域請求
app.use(express.json());       // 解析 JSON 請求
app.use(bodyParser.json());

// 提供靜態文件（HTML、CSS、JS）
app.use(express.static(path.join(__dirname, FRONTEND_FOLDER)));

// 啟動伺服器
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Properly close the server on Ctrl + C signal
process.on("SIGINT", () => {
  console.log("Closing server...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

const notesRouter = require('./routes/notes');
app.use('/api/notes', notesRouter);
