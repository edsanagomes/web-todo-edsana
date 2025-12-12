import './style.css'

console.log('Hello from typescript')
const input = document.getElementById('todo-input') as HTMLInputElement
const button = document.getElementById('add-todo-button') as HTMLButtonElement
const list = document.getElementById('todo-elements') as HTMLUListElement
const error = document.createElement('div')
error.textContent = 'Veuillez entrer une tâche.'
error.style.color = 'red'
error.style.display = 'none'
button.insertAdjacentElement('beforebegin', error)

function addTodo() {
  const value = input.value.trim()
  if (value === '') {
    error.style.display = 'block'
    return
  }
  error.style.display = 'none'
  const li = document.createElement('li')
  li.textContent = value
  list.appendChild(li)
  input.value = ''
}

button.addEventListener('click', addTodo)
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTodo()
})
