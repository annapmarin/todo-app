import { useState } from 'react';
import { useTodoManager } from '../hooks/useTodoManager';
import '../styles/TodoInput.css';

function TodoInput() {
  const { todoManager } = useTodoManager();
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      todoManager.addTodo(inputValue);
      setInputValue('');
    }
  }

  return (
    <div className="todo-input">
      <input 
        id="todo-input-field"
        type="text" 
        placeholder="Create a new todo..." 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      
    </div>
  );
}

export default TodoInput;