function HabitItem({ habit, onToggle, onDelete }) {
  const handleDelete = () => {
    if (confirm('Ви впевнені, що хочете видалити звичку?')) {
      onDelete(habit.id);
    }
  };

  return (
    <li className="bounce-in">
      <span
        onClick={() => onToggle(habit.id)}
        className={habit.completed ? 'completed' : ''}
      >
        {habit.name}
      </span>
      {habit.completed && habit.completedAt && (
        <small style={{ fontSize: '0.8rem', color: 'gray' }}>
          Завершено: {new Date(habit.completedAt).toLocaleDateString()}
        </small>
      )}
      <button onClick={handleDelete}>✖</button>
    </li>
  );
}

export default HabitItem;
