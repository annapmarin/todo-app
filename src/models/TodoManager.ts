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
  private static readonly STORAGE_KEY = 'todos';
  
  public constructor() {
    this.loadFromStorage();
  }

  private saveToStorage() {
    localStorage.setItem(
      TodoManager.STORAGE_KEY,
      JSON.stringify(this.todos)
    )
  }

  private loadFromStorage() {
    const data = localStorage.getItem(TodoManager.STORAGE_KEY);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        this.todos = parsed.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
      } catch {
        this.todos = [];
      }
    }
  }

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
    this.saveToStorage();
    this.notifyListeners();
  }

  toggleTodo(id: string): void {
    this.todos = this.todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.saveToStorage();
    this.notifyListeners();
  }

  reorderTodos(newOrderIds: string[]): void {
    const idToTodo = new Map(this.todos.map(todo => [todo.id, todo]));
    this.todos = newOrderIds
      .map(id => idToTodo.get(id)!)
      .filter(Boolean);
    this.saveToStorage();
    this.notifyListeners();
  }

  deleteTodo(id: string): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveToStorage();
    this.notifyListeners();
  }

  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.saveToStorage();
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