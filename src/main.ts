import './style.css'
const form = document.querySelector<HTMLFormElement>('#todo-form')
const list = document.querySelector<HTMLUListElement>('#todo-elements')
const input = document.querySelector<HTMLInputElement>('#todo-input')
const error = document.querySelector<HTMLDivElement>('#error')

if (!form || !input || !list || !error) {
  /* ! - if elements doesn't exist */
  throw new Error(
    'Fatal Error: A required DOM element could not be found.',
  ) /* I can also use console.log before message - protection*/
}

type Todo = {
  id: string
  text: string
  completed: boolean
}

function loadTodos(): Todo[] {
  const storedTodos = localStorage.getItem('todos')
  if (!storedTodos) return []
  try {
    const parsedTodos = JSON.parse(storedTodos)
    if (
      Array.isArray(parsedTodos) &&
      parsedTodos.every(
        (todo) =>
          todo &&
          typeof todo.id === 'string' &&
          typeof todo.text === 'string' &&
          typeof todo.completed === 'boolean',
      )
    ) {
      return parsedTodos
    }
  } catch (e) {
    console.error('Failed to parse todos from localStorage.', e)
    localStorage.removeItem('todos')
  }
  return []
}

const todos: Todo[] = loadTodos()
const renderTodos = () => {
  list.innerHTML = '' /*clear the list*/
  todos.forEach((todo) => {
    const li = document.createElement('li')
    li.className = 'todo-item'

    const span = document.createElement('span')
    span.textContent = todo.text

    const removeBtn = document.createElement('button')
    removeBtn.textContent = 'Remove'
    removeBtn.className = 'remove-btn'

    removeBtn.onclick = () => {
      const index = todos.findIndex((t) => t.id === todo.id)
      if (index !== -1) {
        todos.splice(index, 1)
        localStorage.setItem('todos', JSON.stringify(todos))
        renderTodos()
      }
    }

    li.appendChild(span)
    li.appendChild(removeBtn)
    list.appendChild(li)
  })
}
const addTodo = () => {
  const value = input.value.trim()
  if (value === '') {
    error.textContent = 'Please enter a task.'
    error.classList.add('is-visible')
    return
  }
  error.classList.remove('is-visible')

  const newTodo: Todo = {
    id: crypto.randomUUID(),
    text: value,
    completed: false,
  }

  todos.push(newTodo)
  localStorage.setItem('todos', JSON.stringify(todos))
  renderTodos()
  input.value = ''
}

form.addEventListener('submit', (e: SubmitEvent) => {
  e.preventDefault()
  addTodo()
})

renderTodos()
