// routes/index.js
const express = require("express");
const router = express.Router(); // ใช้ router แทน app

let todos = []; // จำลองฐานข้อมูล

// ทดสอบ endpoint /api/home
router.get("/home", (req, res) => {
  res.json("Hello Nodejs");
});

// GET ทั้งหมด
router.get("/todos", (req, res) => {
  res.json(todos);
});

// POST เพิ่ม todo
router.post("/todos", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "กรุณาใส่ข้อความ" });

  const newTodo = { id: Date.now(), text };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

module.exports = router;
