const eHttpStatusCode = Object.freeze({
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
});

const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const DB_FILE = './database/notes.db';
const SCHEMA_FILE = './database/migrations/schema.sql';
let db; // 定義 db 變數

if (!fs.existsSync(DB_FILE)) {
  console.log('資料庫檔案不存在，正在初始化...');
  const schema = fs.readFileSync(SCHEMA_FILE, 'utf8');
  db = new sqlite3.Database(DB_FILE); // 初始化 db 變數
  db.exec(schema, (err) => {
    if (err) {
      console.error('初始化資料庫失敗:', err);
    } else {
      console.log('資料庫初始化成功！');
    }
  });
} else {
  console.log('資料庫檔案已經存在，正在連接...');
  db = new sqlite3.Database(DB_FILE); // 初始化 db 變數
}


// **1️⃣ 建立 (Create)**
router.post('/', (req, res) => {
  const { content } = req.body;
  db.run('INSERT INTO notes (content) VALUES (?)', [content], function (err) {
    if (err) return res.status(eHttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: err.message });
    res.json({ id: db.lastID, content });
  });
});

// **2️⃣ 讀取 (Read)**
router.get('/', (req, res) => {
  db.all('SELECT * FROM notes', [], (err, rows) => {
    if (err) return res.status(eHttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: err.message });
    res.json(rows);
  });
});

// **3️⃣ 更新 (Update)**
router.put('/:id', (req, res) => {
  const { content } = req.body;
  const { id } = req.params;
  db.run('UPDATE notes SET content = ? WHERE id = ?', [content, id], function (err) {
    if (err) return res.status(eHttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: err.message });
    if (this.changes === 0) return res.status(eHttpStatusCode.NOT_FOUND).json({ message: 'Note not found' });
    res.json({ message: 'Note updated' });
  });
});

// **4️⃣ 刪除 (Delete)**
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM notes WHERE id = ?', [id], function (err) {
    if (err) return res.status(eHttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: err.message });
    if (this.changes === 0) return res.status(eHttpStatusCode.NOT_FOUND).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted' });
  });
});

module.exports = router;
