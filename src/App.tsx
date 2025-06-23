import './App.css'
import ThemeToggleButton from './components/ThemeToggleButton'

function App() {

  return (
    <>
      <section className='app-container'>
        <header className='app-header'>
          <h1>TODO</h1>
          <ThemeToggleButton />
        </header>
      </section>
    </>
  )
}

export default App
