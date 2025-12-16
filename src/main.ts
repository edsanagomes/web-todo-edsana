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

const todos: string[] = JSON.parse(localStorage.getItem('todos') || '[]')

const renderTodos = () => {
  list.innerHTML = ''
  todos.forEach((todo) => {
    const li = document.createElement('li')
    li.textContent = todo
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

  todos.push(value)
  localStorage.setItem('todos', JSON.stringify(todos))
  renderTodos()
  input.value = ''
}

form.addEventListener('submit', (e: SubmitEvent) => {
  e.preventDefault()
  addTodo()
})
