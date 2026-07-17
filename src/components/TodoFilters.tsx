import type { Filter } from '../types'

type Props = { filter: Filter; onFilterChange: (filter: Filter) => void }
const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'completed', label: 'Выполненные' },
]

function TodoFilters({ filter, onFilterChange }: Props) {
  return <div className="filters">{filters.map((item) => <button key={item.value} type="button" className={filter === item.value ? 'active' : ''} onClick={() => onFilterChange(item.value)}>{item.label}</button>)}</div>
}

export default TodoFilters
