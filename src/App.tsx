import { useEffect, useMemo, useState } from 'react'
import './App.css'
import TodoFilters from './components/TodoFilters'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import type { Filter, Todo } from './types'

const STORAGE_KEY = 'todos'

function App() {
  const [taskText, setTaskText] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY)
    if (savedTodos) {
      try { setTodos(JSON.parse(savedTodos) as Todo[]) }
      catch { localStorage.removeItem(STORAGE_KEY) }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos, isLoaded])

  const addTodo = () => {
    const text = taskText.trim()
    if (!text) return
    setTodos((current) => [...current, { id: Date.now(), text, completed: false }])
    setTaskText('')
  }

  const toggleTodo = (id: number) => setTodos((current) => current.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  const deleteTodo = (id: number) => setTodos((current) => current.filter((todo) => todo.id !== id))
  const clearCompleted = () => setTodos((current) => current.filter((todo) => !todo.completed))

  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((todo) => !todo.completed)
    if (filter === 'completed') return todos.filter((todo) => todo.completed)
    return todos
  }, [todos, filter])

  const activeCount = todos.filter((todo) => !todo.completed).length
  const completedCount = todos.length - activeCount

  return (
    <main className="app">
      <section className="todo-card">
        <header className="todo-header">
          <p className="eyebrow">React + TypeScript</p>
          <h1>Todo App</h1>
          <p>Добавляй задачи, отмечай выполненные и фильтруй список.</p>
        </header>
        <TodoForm taskText={taskText} onTaskTextChange={setTaskText} onAddTodo={addTodo} />
        <TodoFilters filter={filter} onFilterChange={setFilter} />
        <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
        <footer className="todo-footer">
          <span>Осталось: {activeCount}</span>
          <button type="button" onClick={clearCompleted} disabled={completedCount === 0}>Очистить выполненные</button>
        </footer>
      </section>
    </main>
  )
}

export default App
