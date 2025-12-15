import './style.css'

const button = document.querySelector<HTMLButtonElement>('#add-todo-button') /* c'est comme je suis sûre qu'il y de HTMLButtonElement*/
const list = document.querySelector<HTMLUListElement>('#todo-elements')
const input = document.querySelector<HTMLInputElement>('#todo-input')

if (!input || !button || !list) { /* ! - si les elements n'existe pas */
  throw new Error("Attention !!! Input n'a pas été trouvé sur la page") /* je peux aussi utiliser console.logo avant avec message - protege*/
}

const error = document.createElement('div')
error.textContent = 'Veuillez entrer une tâche.'
error.style.color = 'red'
error.style.display = 'none'
input.insertAdjacentElement('beforebegin', error)

const addTodo = () => { /* rend la valeur du contexte où la fonction a été créée */
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
