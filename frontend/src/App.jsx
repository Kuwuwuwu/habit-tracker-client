import { useState, useEffect } from 'react';
import { getHabits, addHabit, toggleHabit, deleteHabit } from './api';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';
import ThemeToggle from './components/ThemeToggle';
import './styles/app.css';

function App() {
  const [habits, setHabits] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getHabits()
      .then(res => setHabits(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAddHabit = (habitName) => {
    const newHabit = {
      name: habitName,
      completed: false,
      completedAt: null,
    };

    addHabit(newHabit)
      .then(res => setHabits([...habits, res.data]))
      .catch(err => console.error(err));
  };

  const handleToggleHabit = (id) => {
    toggleHabit(id)
      .then(res => {
        const updated = habits.map(habit =>
          habit._id === id ? res.data : habit
        );
        setHabits(updated);
      })
      .catch(err => console.error(err));
  };

  const handleDeleteHabit = (id) => {
    deleteHabit(id)
      .then(() => setHabits(habits.filter(habit => habit._id !== id)))
      .catch(err => console.error(err));
  };

  const completedCount = habits.filter(habit => habit.completed).length;
  const progress = habits.length > 0 ? (completedCount / habits.length) * 100 : 0;

  const last7Days = habits.filter(habit => {
    if (!habit.completedAt) return false;
    const date = new Date(habit.completedAt);
    const now = new Date();
    const diff = (now - date) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  });

  const filteredHabits = habits.filter(habit => {
    if (filter === 'completed') return habit.completed;
    if (filter === 'active') return !habit.completed;
    return true;
  });

  return (
    <div className="app">
      <ThemeToggle />
      <h1>Трекер звичок</h1>

      <p>Завершено: {completedCount} / {habits.length}</p>
      <p>За останні 7 днів: {last7Days.length}</p>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      {progress === 100 && (
        <p className="fade-in" style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>
          Всі звички виконано 🎉
        </p>
      )}

      <div style={{ marginBottom: '20px' }}>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Всі</option>
          <option value="completed">Завершені</option>
          <option value="active">Незавершені</option>
        </select>
      </div>

      <HabitForm onAdd={handleAddHabit} />
      <HabitList
        habits={filteredHabits}
        onToggle={handleToggleHabit}
        onDelete={handleDeleteHabit}
      />
    </div>
  );
}

export default App;