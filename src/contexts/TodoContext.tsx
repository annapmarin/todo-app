import { createContext, useContext, type ReactNode } from "react";
import { useTodoManager } from '../hooks/useTodoManager';
import { TodoManager, type ITodo } from "../models/TodoManager";

interface TodoContextType {
  todos: ITodo[];
  todoManager: TodoManager;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const todoData = useTodoManager();

  return (
    <TodoContext.Provider value={todoData}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodos = () => {
  const context = useContext(TodoContext);

  if(!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }

  return context;
}