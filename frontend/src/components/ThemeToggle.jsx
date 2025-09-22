import { useEffect, useState } from 'react';

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button onClick={toggleTheme} style={{ marginBottom: '20px' }}>
      Змітити тему: {theme === 'dark' ? 'Світла' : 'Темна'}
    </button>
  );
}

export default ThemeToggle;