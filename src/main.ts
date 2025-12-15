import './style.css'
const button =
  document.querySelector<HTMLButtonElement>(
    '#add-todo-button',
  ) /* this is how I make sure it’s an HTMLButtonElement */
const list = document.querySelector<HTMLUListElement>('#todo-elements')
const input = document.querySelector<HTMLInputElement>('#todo-input')
const error = document.querySelector<HTMLDivElement>('#error')

if (!input || !button || !list || !error) {
  /* ! - if elements doesn't exist */
  throw new Error(
    "Attention !!! Input n'a pas été trouvé sur la page",
  ) /* I can also use console.log before message - protection*/
}

const addTodo = () => {
  /* keeps the value in the context where the function was created */
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

button.addEventListener('click', addTodo)
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTodo()
})
