const eHttpStatusCode = Object.freeze({
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
});

const express = require('express');
const router = express.Router();

let notes = []; // 模擬記錄 (之後可改為資料庫)

// 取得所有記事
router.get('/', (req, res) => {
  res.json(notes);
});

// 新增記事
router.post('/', (req, res) => {
  const newNote = { id: Date.now(), text: req.body.text };
  notes.push(newNote);
  res.status(eHttpStatusCode.CREATED).json(newNote);
});

// 更新記事
router.put('/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const note = notes.find(n => n.id === noteId);
  if (note) {
    note.text = req.body.text;
    res.json(note);
  } else {
    res.status(eHttpStatusCode.NOT_FOUND).json({ message: "Note not found" });
  }
});

// 刪除記事
router.delete('/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  notes = notes.filter(n => n.id !== noteId);
  res.json({ message: "Note deleted" });
});

module.exports = router;
