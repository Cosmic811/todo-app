import type { Todo } from '../types'
import TodoItem from './TodoItem'

type Props = { todos: Todo[]; onToggle: (id: number) => void; onDelete: (id: number) => void }

function TodoList({ todos, onToggle, onDelete }: Props) {
  if (todos.length === 0) return <p className="empty-message">Задач пока нет</p>

  return <ul className="todo-list">{todos.map((todo) => <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />)}</ul>
}

export default TodoList
