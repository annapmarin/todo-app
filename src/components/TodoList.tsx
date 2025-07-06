import { useState } from 'react';
import { useTodos } from '../contexts/TodoContext';
import TodoItem from "./TodoItem";
import TodoFooter from "./TodoFooter";
import '../styles/TodoList.css';
import type { FilterType } from './TodoFooter';

function TodoList() {
  const { todos } = useTodos();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      case 'all':
      default:
        return true;
    }
  });

  if (todos.length === 0) {
    return (
      <div className="todo-list empty">
        <p>No todos yet. Add one above! 📝</p>
      </div>
    );
  }

  return (
    <>
      <section className="todo-list">
        <div className="todo-list-items">
          {filteredTodos.map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo}
            />
          ))}
        </div>
        <TodoFooter filter={filter} onFilterChange={setFilter} />
      </section>
    </>
  )
}

export default TodoList;