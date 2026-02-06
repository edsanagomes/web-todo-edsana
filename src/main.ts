import './style.css'

const form = document.querySelector<HTMLFormElement>('#todo-form-check')
const list = document.querySelector<HTMLUListElement>('#todo-elements-check')
const input = document.querySelector<HTMLInputElement>('#todo-input-check')
const error = document.querySelector<HTMLDivElement>('#error-check')
const dateInput = document.querySelector<HTMLInputElement>('#todo-date-input')
const deleteAllBtn = document.querySelector<HTMLButtonElement>('#delete-all')

if (!form || !input || !list || !error || !deleteAllBtn || !dateInput) {
  /* ! - if elements doesn't exist */
  throw new Error(
    'Fatal Error: A required DOM element could not be found.',
  ) /* I can also use console.log before message - protection*/
}

type Todo = {
  id: string
  text: string
  completed: boolean
  dueDate?: string
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
  todos.forEach((todo) => {
    const li = document.createElement('li')
    li.className = 'todo-item'

    const span = document.createElement('span')
    span.textContent = todo.text

    const dateP = document.createElement('p')
    if (todo.dueDate) {
      dateP.innerHTML = `Due: <time>${todo.dueDate}</time>`
    } else {
      dateP.textContent = 'no due date'
    }

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

    li.append(span, dateP, removeBtn)
    list.appendChild(li)
  })
}

const addTodo = () => {
  const value = input.value.trim()
  const selectedDate = dateInput.value
  const today = new Date().toISOString().split('T')[0]

  if (value === '') {
    error.textContent = 'Please enter a task.'
    error.classList.add('is-visible')
    return
  }

  if (selectedDate && selectedDate < today) {
    error.textContent = 'Selected date cannot be in the past.'
    error.classList.add('is-visible')
    return
  }

  error.classList.remove('is-visible')

  const newTodo: Todo = {
    id: crypto.randomUUID(),
    text: value,
    completed: false,
    dueDate: selectedDate || undefined,
  }

  todos.push(newTodo)
  localStorage.setItem('todos', JSON.stringify(todos))
  renderTodos()
  input.value = ''
  dateInput.value = ''
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  addTodo()
})

if (deleteAllBtn) {
  deleteAllBtn.addEventListener('click', () => {
    if (confirm('Clear entire list?')) {
      todos.length = 0
      localStorage.removeItem('todos')
      renderTodos()
    }
  })
}

renderTodos()
