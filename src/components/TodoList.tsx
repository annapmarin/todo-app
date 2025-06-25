import { useTodos } from '../contexts/TodoContext';
import TodoItem from "./TodoItem";

function TodoList() {
  const { todos } = useTodos();
  if (todos.length === 0) {
    return (
      <div className="todo-list empty">
        <p>No todos yet. Add one above! 📝</p>
      </div>
    );
  }

  console.log('🎉 TodoList - ¡Mostrando', todos.length, 'todos!');

  return (
    <div className="todo-list">
      <p>Todos: {todos.length}</p>

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