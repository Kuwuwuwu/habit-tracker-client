import { useState } from 'react';

function HabitForm({ onAdd }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input.trim());
      setInput('');
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    if (error) setError(false); // скидаємо помилку при введенні
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Нова звичка"
        value={input}
        onChange={handleChange}
        className={error ? 'input-error' : ''}
        autoFocus
      />
      <button type="submit">Додати</button>
      {error && <p className="error">Введіть назву звички</p>}
    </form>
  );
}

export default HabitForm;
