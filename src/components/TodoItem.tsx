import { useTodos } from "../contexts/TodoContext";
import { type ITodo } from "../models/TodoManager";

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
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle} 
        />
        <span className="todo-text">{todo.text}</span>
      </div>

      <button
        onClick={handleDelete}
        className="delete-btn"
        aria-label="Delete Todo"
      >
        ×
      </button>
    </div>
  )
}

export default TodoItem;