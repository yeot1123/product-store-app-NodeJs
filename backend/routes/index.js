const express = require("express");
const router = express.Router();
let todos = [];

router.get("/todos", (req, res) => {
  res.json(todos);
});

router.post("/todos", (req, res) => {
  const { username, age, bio, gender } = req.body;

  // ตรวจสอบ input
  if (!username || !age || !bio || !gender) {
    return res.status(400).json({ error: "ข้อมูลไม่ครบ" });
  }

  const newTodo = {
    id: Date.now(),
    username,
    age,
    bio,
    gender,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

module.exports = router;
