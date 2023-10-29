// import { Todo } from './todo.js'
const Todo = require('./todo.js')
function todoManagement() {
  let todos = []
  function addTodo(id, desc, done) {
    todos.push(new Todo(id, desc, done))
    return todos[todos.length - 1].id
  }
  function clearTodo() {
    todos = []
  }
  function removeTodo(removeId) {
    todos = todos.filter((todo) => todo.id !== removeId)
  }
  function findTodo(searchId) {
    return todos.find((todo) => todo.id === searchId)
  }
  function getTodos() {
    return todos
  }
  function getNumberOfDone() {
    return todos.filter((todo) => todo.done === true).length
  }
  function getNumberOfNotDone() {
    return todos.filter((todo) => todo.done === false).length
  }
  function setItemToDone(doneId) {
    const doneItem = todos.find((todo) => todo.id === Number(doneId))
    // console.log(doneItem)
    if (doneItem !== undefined) doneItem.setDone(true)
    // else console.log(doneId)
  }
  function loadTodos(userTodos) {
    // todos = [...userTodos]
    Todo.setRunningId(userTodos[userTodos.length - 1].id + 1)

    userTodos.forEach((todo) => {
      addTodo(todo.id, todo.description, todo.done)
    })
  }
  return {
    addTodo,
    removeTodo,
    findTodo,
    getTodos,
    getNumberOfDone,
    getNumberOfNotDone,
    setItemToDone,
    loadTodos,
    clearTodo
  }
}
// export { todoManagement }
module.exports = todoManagement
