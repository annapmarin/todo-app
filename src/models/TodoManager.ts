export interface ITodo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date
}

export class TodoManager {
  private static instance: TodoManager | null = null;
  private todos: ITodo[] = [];
  private listeners: Array<(todos: ITodo[]) => void> = [];
  
  public constructor() {}

  public static getInstance(): TodoManager {
    if (!TodoManager.instance) {
      TodoManager.instance = new TodoManager();
    }
    return TodoManager.instance;
  }

  addTodo(text: string): void {
    if (!text.trim()) return;

    const newTodo: ITodo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date()
    };

    this.todos.push(newTodo);
    this.notifyListeners();
  }

  toggleTodo(id: string): void {
    this.todos = this.todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.notifyListeners();
  }

  deleteTodo(id: string): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.notifyListeners();
  }

  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.notifyListeners();
  }

  getTodos(): ITodo[] {
    return [...this.todos];
  }

  subscribe(listener: (todos: ITodo[]) => void): void {
    if (!this.listeners.includes(listener)) {
      this.listeners.push(listener);
    }
  }

  unsubscribe(listener: (todos: ITodo[]) => void): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => {
      listener([...this.todos]);
    });
  }
}