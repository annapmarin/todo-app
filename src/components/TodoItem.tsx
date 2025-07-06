import { useTodos } from "../contexts/TodoContext";
import { type ITodo } from "../models/TodoManager";
import IconCheck from '../assets/icon-check.svg';
import IconCross from '../assets/icon-cross.svg';
import '../styles/TodoList.css';

interface TodoItemProps {
  todo: ITodo;
}

function TodoItem({ todo }: TodoItemProps) {
  const { todoManager } = useTodos();

  const handleToggle = () => {
    todoManager.toggleTodo(todo.id);
  };

  const handleDelete = () => {
    todoManager.deleteTodo(todo.id);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <button
          type="button"
          className={`check-btn ${todo.completed ? 'checked' : ''}`}
          onClick={handleToggle}
          aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {todo.completed && <img src={IconCheck} alt="Check" className="check-icon" />}
        </button>
        <span className="todo-text">{todo.text}</span>
      </div>

      <button
        onClick={handleDelete}
        className="delete-btn"
        aria-label="Delete Todo"
      >
        { IconCross && <img src={IconCross} alt="Delete todo" className="delete-icon" /> }
      </button>
    </div>
  )
}

export default TodoItem;