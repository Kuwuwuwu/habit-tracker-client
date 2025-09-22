const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

// GET
router.get('/', async (req, res) => {
  const habits = await Habit.find();
  res.json(habits);
});

// POST
router.post('/', async (req, res) => {
  const habit = new Habit(req.body);
  await habit.save();
  res.json(habit);
});

// PUT
router.put('/:id', async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  habit.completed = !habit.completed;
  habit.completedAt = habit.completed ? new Date() : null;
  await habit.save();
  res.json(habit);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Habit.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;