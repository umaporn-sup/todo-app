// import { todoManagement } from '../lib/todoManagement.js'
// import { todoUserInterface } from '../UI/todoList.js'
// const { showTodoItem, showNumberOfDone, showNumberOfNotDone, removeTodoItem } =
//   todoUserInterface()
// const {
//   addTodo,
//   removeTodo,
//   findTodo,
//   getTodos,
//   getNumberOfDone,
//   getNumberOfNotDone,
//   setItemToDone,
//   loadTodos,
//   clearTodo
// } = todoManagement()

const todoManagement = require('../lib/todoManagement.js')
const todoUserInterface = require('../UI/todoList.js')

const { showTodoItem, showNumberOfDone, showNumberOfNotDone, removeTodoItem } =
  todoUserInterface()
const {
  addTodo,
  removeTodo,
  findTodo,
  getTodos,
  getNumberOfDone,
  getNumberOfNotDone,
  setItemToDone,
  loadTodos,
  clearTodo
} = todoManagement()

const addTodoHandler = () => {
  const todoItem = document.querySelector('input').value
  if (todoItem.trim().length !== 0) {
    const todoId = addTodo(undefined, todoItem, undefined)
    showTodoItem(todoId, todoItem)
    addButtonHandler(todoId)
    showNumberOfDone(getNumberOfDone())
    showNumberOfNotDone(getNumberOfNotDone())
  }
}
const addButtonHandler = (todoId) => {
  document
    .getElementById(todoId)
    .children[1].addEventListener('click', notDoneButtonHandler)
  document
    .getElementById(todoId)
    .children[2].addEventListener('click', removeButtonHandler)
  document.querySelector('input').value = ''
}

const notDoneButtonHandler = (event) => {
  const doneButtonFire = event.target
  setdoneStyle(doneButtonFire)
  setItemToDone(doneButtonFire.parentElement.getAttribute('id'))
  showNumberOfDone(getNumberOfDone())
  showNumberOfNotDone(getNumberOfNotDone())
}

const setdoneStyle = (doneButtonFire) => {
  doneButtonFire.textContent = 'Done'
  doneButtonFire.style = 'background-color: green;color: white'
}

const removeButtonHandler = (event) => {
  const removeButtonFire = event.target
  const removeId = removeButtonFire.parentElement.getAttribute('id')
  removeTodoItem(removeId)
  removeTodo(Number(removeId))
  showNumberOfDone(getNumberOfDone())
  showNumberOfNotDone(getNumberOfNotDone())
}

const beforeUnloadHandler = (event) => {
  event.preventDefault()
  localStorage.setItem('todos', JSON.stringify(getTodos()))
  clearTodo()
}

const loadHandler = () => {
  const localTodos = localStorage.getItem('todos')
  const yourTodos = JSON.parse(localTodos)

  if (
    yourTodos !== null &&
    yourTodos !== undefined &&
    yourTodos?.length !== 0
  ) {
    //[{"id":1,"description":"Shopping","done":true},{"id":2,"description":"Watch Movie","done":false},{"id":3,"description":"sleep","done":true}]

    loadTodos(yourTodos)
    getTodos().forEach((todo) => {
      showTodoItem(todo.id, todo.description)
      addButtonHandler(todo.id)
      if (todo.done) {
        const doneButtonFire = document.getElementById(todo.id).children[1]
        setdoneStyle(doneButtonFire)
      }
    })
    showNumberOfDone(getNumberOfDone())
    showNumberOfNotDone(getNumberOfNotDone())
  }
  const addButton = document.getElementById('addBtn')
  addButton.addEventListener('click', () => addTodoHandler())

  const inputTodo = document.querySelector('input')
  inputTodo.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') addTodoHandler()
  })
}

// export {
//   addTodoHandler,
//   notDoneButtonHandler,
//   removeButtonHandler,
//   beforeUnloadHandler,
//   loadHandler
// }

module.exports = {
  addTodoHandler,
  notDoneButtonHandler,
  removeButtonHandler,
  beforeUnloadHandler,
  loadHandler
}
