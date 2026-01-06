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

const addTodo = () => {
  const value = input.value.trim()
  if (value === '') {
    error.textContent = 'Please enter a task.'
    error.classList.add('is-visible')
    return
  }
  error.classList.remove('is-visible')

  const li = document.createElement('li')
  li.textContent = value
  list.appendChild(li)
  input.value = ''
}

form.addEventListener('submit', (e: SubmitEvent) => {
  e.preventDefault()
  addTodo()
})

interface Task {
  id: number
  text: string
  completed: boolean
}

const formCheck = document.querySelector<HTMLFormElement>('#todo-form-check')
const inputCheck = document.querySelector<HTMLInputElement>('#todo-input-check')
const listCheck = document.querySelector<HTMLUListElement>(
  '#todo-elements-check',
)

if (!formCheck || !inputCheck || !listCheck) {
  throw new Error('Checklist elements not found')
}

// 1. Charger les données (Acceptance Criteria 2)
const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]')

const saveAndRender = () => {
  // Technique: Stockage dans localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks))
  render()
}

const render = () => {
  listCheck.innerHTML = ''

  tasks.forEach((task) => {
    const li = document.createElement('li')
    li.className = 'todo-item'

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = task.completed

    // Action: Toggle completion (Acceptance Criteria 1 & 3)
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked
      saveAndRender()
    })

    const span = document.createElement('span')
    span.textContent = task.text
    // Design: Style distinct si complété
    if (task.completed) {
      span.classList.add('completed-text')
    }

    li.append(checkbox, span)
    listCheck.appendChild(li)
  })
}

formCheck.addEventListener('submit', (e) => {
  e.preventDefault()
  const val = inputCheck.value.trim()
  if (val === '') return

  const newTask: Task = {
    id: Date.now(),
    text: val,
    completed: false, // Default: unchecked
  }

  tasks.push(newTask)
  inputCheck.value = ''
  saveAndRender()
})

// Initialisation
render()
