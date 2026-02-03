import './style.css'

const form = document.querySelector<HTMLFormElement>('#todo-form')
const list = document.querySelector<HTMLUListElement>('#todo-elements')
const input = document.querySelector<HTMLInputElement>('#todo-input')
const error = document.querySelector<HTMLDivElement>('#error')
const deleteAllBtn = document.querySelector<HTMLButtonElement>('#delete-all')

if (!form || !input || !list || !error || !deleteAllBtn) {
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
    if (!Array.isArray(parsedTodos)) return []

    for (const todo of parsedTodos) {
      if (
        !todo ||
        typeof todo.id !== 'string' ||
        typeof todo.text !== 'string' ||
        typeof todo.completed !== 'boolean'
      ) {
        return []
      }
    }

    return parsedTodos
  } catch {
    return []
  }
}

const todos: Todo[] = loadTodos()

const renderTodos = () => {
  list.innerHTML = ''
  input.value = ''
  todos.forEach((todo) => {
    const li = document.createElement('li')
    li.className = 'todo-item'

    const span = document.createElement('span')
    span.textContent = todo.text

    const removeBtn = document.createElement('button')
    removeBtn.textContent = 'Remove'
    removeBtn.className = 'remove-btn'

    removeBtn.addEventListener('click', () => {
      const index = todos.findIndex((t) => t.id === todo.id)
      if (index !== -1) {
        todos.splice(index, 1)
        localStorage.setItem('todos', JSON.stringify(todos))
        renderTodos()
      }
    })

    li.append(span, removeBtn)
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

form.addEventListener('submit', (e) => {
  e.preventDefault()
  addTodo()
})

if (deleteAllBtn) {
  deleteAllBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear your entire to-do list?')) {
      todos.length = 0
      localStorage.removeItem('todos')
      renderTodos()
      input.value = ''
    }
  })
}
