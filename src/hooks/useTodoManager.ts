import { useState, useEffect } from 'react';
import { TodoManager, type ITodo } from '../models/TodoManager';

export const useTodoManager = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const todoManager = TodoManager.getInstance();

  useEffect(() => {
    const handleTodosChange = (newTodos: ITodo[]) => {
      setTodos(newTodos);
    };

    todoManager.subscribe(handleTodosChange);
    setTodos(todoManager.getTodos());

    return () => {
      todoManager.unsubscribe(handleTodosChange);
    };
  }, []);

  return {
    todos,
    todoManager
  };
};