import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  completedAt: String,
});

export default mongoose.model('Habit', habitSchema);