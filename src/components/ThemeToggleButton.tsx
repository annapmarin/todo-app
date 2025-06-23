import { useState, useEffect } from 'react';
import iconMoon from '../assets/icon-moon.svg';
import iconSun from '../assets/icon-sun.svg';

const ThemeToggleButton = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <button onClick={toggleTheme} className='theme-toggle'>
      <img
        src={theme === 'light' ? iconMoon : iconSun}
        alt="toggle theme"
      />
    </button>
  );
};

export default ThemeToggleButton;