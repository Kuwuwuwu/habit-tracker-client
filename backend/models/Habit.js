const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  completedAt: Date,
});

module.exports = mongoose.model('Habit', HabitSchema);