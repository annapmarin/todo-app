import { TodoManager } from "./TodoManager";

describe('TodoManager', () => {
  let todoManager: TodoManager;

  beforeEach(() => {
    todoManager = new TodoManager();
  })

  test('should add a valid todo', () => {
    todoManager.addTodo('Test todo');
    const todos = todoManager.getTodos();

    expect(todos).toHaveLength(1);
    expect(todos[0].text).toBe('Test todo');
    expect(todos[0].completed).toBe(false)
  });

  test('should not add an empty todo', () => {
    todoManager.addTodo('    ');
    expect(todoManager.getTodos()).toHaveLength(0);
  });

  test('should trim whitespace from todo text', () => {
    todoManager.addTodo('    Learn Jest   ');
    const todos = todoManager.getTodos();

    expect(todos[0].text).toBe('Learn Jest');
  });

  test('should add multiple todos', () => {
    todoManager.addTodo('First todo');
    todoManager.addTodo('Second todo');
    const todos = todoManager.getTodos();

    expect(todos).toHaveLength(2);
    expect(todos[0].text).toBe('First todo');
    expect(todos[1].text).toBe('Second todo');
  });

  test('should generate unique IDs for todos', () => {
    todoManager.addTodo('Todo 1');
    todoManager.addTodo('Todo 2');

    const todos = todoManager.getTodos();
    expect(todos[0].id).not.toBe(todos[1].id);
  });

  test('should notify listeners when todo is added', () => {
    const mockListener = jest.fn();

    todoManager.subscribe(mockListener);
    todoManager.addTodo('Notify me');

    expect(mockListener).toHaveBeenCalledTimes(1);
    expect(mockListener).toHaveBeenCalledWith([
      expect.objectContaining({
        text: 'Notify me',
        completed: false
      })
    ])
  });
});