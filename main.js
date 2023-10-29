import {
  // addTodoHandler,
  beforeUnloadHandler,
  loadHandler
} from './eventHandler/eventController.js'

window.addEventListener('load', () => {
  loadHandler()
})
window.addEventListener('beforeunload', (event) => {
  beforeUnloadHandler(event)
})

// const addButton = document.getElementById('addBtn')
// addButton.addEventListener('click', () => addTodoHandler())

// const inputTodo = document.querySelector('input')
// inputTodo.addEventListener('keypress', (event) => {
//   if (event.key === 'Enter') addTodoHandler()
// })
