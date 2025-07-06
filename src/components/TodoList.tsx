import { useState } from 'react';
import { useTodos } from '../contexts/TodoContext';
import TodoItem from "./TodoItem";
import TodoFooter from "./TodoFooter";
import '../styles/TodoList.css';
import type { FilterType } from './TodoFooter';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';

function TodoList() {
  const { todos, todoManager } = useTodos();
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

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;

    const reordered = Array.from(filteredTodos);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);

    todoManager.reorderTodos(
      todos.map(todo => {
        const idx = filteredTodos.findIndex(t => t.id === todo.id);
        if (idx !== -1) {
          return reordered[idx].id;
        }
        return todo.id;
      })
    );
  };

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
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todo-list-droppable">
            {(provided) => (
              <div
                className="todo-list-items"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {filteredTodos.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TodoItem todo={todo} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <TodoFooter filter={filter} onFilterChange={setFilter} />
      </section>
    </>
  )
}

export default TodoList;