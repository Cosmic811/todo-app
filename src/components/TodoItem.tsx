import type { Todo } from '../types'

type Props = { todo: Todo; onToggle: (id: number) => void; onDelete: (id: number) => void }

function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <label>
        <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} />
        <span>{todo.text}</span>
      </label>
      <button type="button" className="delete-button" onClick={() => onDelete(todo.id)}>Удалить</button>
    </li>
  )
}

export default TodoItem
