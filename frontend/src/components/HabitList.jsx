import HabitItem from './HabitItem';

function HabitList({ habits, onToggle, onDelete }) {
  if (habits.length === 0) {
    return <p>Немає звичок. Додайте першу!</p>;
  }

  return (
    <ul>
      {habits.map(habit => (
        <HabitItem
          key={habit.id}
          habit={habit}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default HabitList;