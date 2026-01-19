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
    // Validate that we have an array of valid Todo objects

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
    console.error('Failed to load todos from localStorage.', e)
    // Clear corrupted data to prevent future errors
    localStorage.removeItem('todos')
  }
  return [] // Return empty array on failure
}

const todos: Todo[] = loadTodos()

const renderTodos = () => {
  list.innerHTML = ''
  todos.forEach((todo) => {
    const li = document.createElement('li')
    li.textContent = todo.text
    list.appendChild(li)
  })
}

renderTodos()

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