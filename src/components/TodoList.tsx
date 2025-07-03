import { useTodos } from '../contexts/TodoContext';
import TodoItem from "./TodoItem";
import '../styles/TodoList.css';

function TodoList() {
  const { todos } = useTodos();
  if (todos.length === 0) {
    return (
      <div className="todo-list empty">
        <p>No todos yet. Add one above! 📝</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo}
        />
      ))}
    </div>
  )
}

export default TodoList;