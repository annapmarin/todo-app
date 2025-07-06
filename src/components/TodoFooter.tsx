import { useTodos } from '../contexts/TodoContext';

type FilterType = 'all' | 'active' | 'completed';

interface TodoFooterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

function TodoFooter({ filter, onFilterChange }: TodoFooterProps) {
  const { todos, clearCompleted } = useTodos();
  const activeTodos = todos.filter(todo => !todo.completed);
  const hasCompleted = todos.some(todo => todo.completed);

  const handleFilterChange = (newFilter: FilterType) => {
    onFilterChange(newFilter);
  }

  return (
    <section className="todo-footer">
      {activeTodos.length} {activeTodos.length === 1 ? 'item' : 'items'} left
      <div className="filter-todos">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => handleFilterChange('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => handleFilterChange('active')}
        >
          Active
        </button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => handleFilterChange('completed')}
        >
          Completed
        </button>
      </div>
      {todos.length > 0 && (
        <button 
          className="clear-completed"
          onClick={clearCompleted}
          disabled={!hasCompleted}
        >
          Clear completed
        </button>
      )}
    </section>
  )
}

export default TodoFooter;
export type { FilterType };