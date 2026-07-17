import type { FormEvent } from 'react'

type Props = { taskText: string; onTaskTextChange: (value: string) => void; onAddTodo: () => void }

function TodoForm({ taskText, onTaskTextChange, onAddTodo }: Props) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onAddTodo()
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input value={taskText} onChange={(e) => onTaskTextChange(e.target.value)} placeholder="Введите задачу" />
      <button type="submit">Добавить</button>
    </form>
  )
}

export default TodoForm
