import express from 'express';
import Habit from '../models/Habit.js';

const router = express.Router();

// GET all habits
router.get('/', async (req, res) => {
  const habits = await Habit.find();
  res.json(habits);
});

// POST new habit
router.post('/', async (req, res) => {
  const newHabit = new Habit(req.body);
  const saved = await newHabit.save();
  res.json(saved);
});

// PUT toggle habit
router.put('/:id', async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  habit.completed = !habit.completed;
  habit.completedAt = habit.completed ? new Date().toISOString() : null;
  const updated = await habit.save();
  res.json(updated);
});

// DELETE habit
router.delete('/:id', async (req, res) => {
  await Habit.findByIdAndDelete(req.params.id);
  res.json({ message: 'Habit deleted' });
});

export default router;