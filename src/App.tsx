import './App.css'
import ThemeToggleButton from './components/ThemeToggleButton'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import { TodoProvider } from './contexts/TodoContext'

function App() {

  return (
    <TodoProvider>
      <section className='app-container'>
        <header className='app-header'>
          <h1>TODO</h1>
          <ThemeToggleButton />
        </header>
        <main>
          <TodoInput />
          <TodoList />
        </main>
      </section>
    </TodoProvider>
  )
}

export default App
