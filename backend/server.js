const express = require('express');
// const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// app.use(cors());               // 允許跨域請求
app.use(express.json());       // 解析 JSON 請求

// 測試路由
app.get('/', (req, res) => {
  res.send('Simple Notes API is running!');
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// 捕捉 Ctrl + C 訊號來正確關閉伺服器
process.on("SIGINT", () => {
  console.log("正在關閉伺服器...");
  server.close(() => {
    console.log("伺服器已關閉");
    process.exit(0);
  });
});

const notesRouter = require('./routes/notes');
app.use('/api/notes', notesRouter);
