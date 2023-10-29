const todoUserInterface = require('./UI/todoList.js')
const todoManagement = require('./lib/todoManagement.js')
const {
  addTodoHandler,
  notDoneButtonHandler,
  removeButtonHandler,
  beforeUnloadHandler,
  loadHandler
} = require('./eventHandler/eventController.js')

const fs = require('fs')

window.document.body.innerHTML = fs.readFileSync('./index.html')

const initialHtml = fs.readFileSync('./index.html')

test('adding the first new todo', () => {
  document.querySelector('input').value = 'Watch Movies'
  const event = new Event('click')
  const addButton = document.getElementById('addBtn')
  addButton.addEventListener('click', addTodoHandler)
  addButton.dispatchEvent(event)

  const itemList = document.getElementById('listTodo')
  expect(itemList.children).toHaveLength(1)

  const firstDiv = itemList.children[0]
  const firstPChild = firstDiv.children[0]
  const firstDoneButton = firstDiv.children[1]
  const firstRemoveButton = firstDiv.children[2]

  expect(firstDiv.getAttribute('id')).toBe('1')
  expect(firstDiv.children).toHaveLength(3)
  expect(firstPChild.nodeName).toBe('P')

  expect(firstPChild.textContent).toBe('Watch Movies')
  expect(firstDoneButton.nodeName).toBe('BUTTON')
  expect(firstDoneButton.textContent).toBe('Not Done')
  expect(firstRemoveButton.nodeName).toBe('BUTTON')
  expect(firstRemoveButton.textContent).toBe('remove')

  const doneP = document.getElementById('done')
  expect(doneP.textContent).toBe(`Number of Done:0`)

  const notDoneP = document.getElementById('notDone')
  expect(notDoneP.textContent).toBe(`Number of Not Done:1`)
})

test('adding the second new todo', () => {
  document.querySelector('input').value = 'Listen Musics'
  const event = new Event('click')
  const addButton = document.getElementById('addBtn')
  addButton.addEventListener('click', addTodoHandler)
  addButton.dispatchEvent(event)

  const itemList = document.getElementById('listTodo')
  expect(itemList.children).toHaveLength(2)

  const secondDiv = itemList.children[1]
  const secondPChild = secondDiv.children[0]
  const secondDoneButton = secondDiv.children[1]
  const secondRemoveButton = secondDiv.children[2]

  expect(secondDiv.getAttribute('id')).toBe('2')
  expect(secondDiv.children).toHaveLength(3)
  expect(secondPChild.nodeName).toBe('P')

  expect(secondPChild.textContent).toBe('Listen Musics')
  expect(secondDoneButton.nodeName).toBe('BUTTON')
  expect(secondDoneButton.textContent).toBe('Not Done')
  expect(secondRemoveButton.nodeName).toBe('BUTTON')
  expect(secondRemoveButton.textContent).toBe('remove')

  const doneP = document.getElementById('done')
  expect(doneP.textContent).toBe(`Number of Done:0`)

  const notDoneP = document.getElementById('notDone')
  expect(notDoneP.textContent).toBe(`Number of Not Done:2`)
})

test('adding the third new todo', () => {
  document.querySelector('input').value = 'Jogging'
  const event = new Event('click')
  const addButton = document.getElementById('addBtn')
  addButton.addEventListener('click', addTodoHandler)
  addButton.dispatchEvent(event)

  const itemList = document.getElementById('listTodo')
  expect(itemList.children).toHaveLength(3)

  const thirdDiv = itemList.children[2]
  const thirdPChild = thirdDiv.children[0]
  const thirdDoneButton = thirdDiv.children[1]
  const thirdRemoveButton = thirdDiv.children[2]

  expect(thirdDiv.getAttribute('id')).toBe('3')
  expect(thirdDiv.children).toHaveLength(3)
  expect(thirdPChild.nodeName).toBe('P')

  expect(thirdPChild.textContent).toBe('Jogging')
  expect(thirdDoneButton.nodeName).toBe('BUTTON')
  expect(thirdDoneButton.textContent).toBe('Not Done')
  expect(thirdRemoveButton.nodeName).toBe('BUTTON')
  expect(thirdRemoveButton.textContent).toBe('remove')

  const doneP = document.getElementById('done')
  expect(doneP.textContent).toBe(`Number of Done:0`)

  const notDoneP = document.getElementById('notDone')
  expect(notDoneP.textContent).toBe(`Number of Not Done:3`)
})

test('done todo', () => {
  let targetTodo = document.getElementById('2')
  const event = new Event('click')

  let doneButton = targetTodo.children[1]
  doneButton.addEventListener('click', notDoneButtonHandler)
  doneButton.dispatchEvent(event)

  expect(doneButton.textContent).toBe('Done')
  expect(doneButton.style['background-color']).toEqual('green')
  expect(doneButton.style['color']).toEqual('white')
  const doneP = document.getElementById('done')
  expect(doneP.textContent).toBe(`Number of Done:1`)

  const notDoneP = document.getElementById('notDone')
  expect(notDoneP.textContent).toBe(`Number of Not Done:2`)

  targetTodo = document.getElementById('1')
  doneButton = targetTodo.children[1]
  doneButton.addEventListener('click', notDoneButtonHandler)
  doneButton.dispatchEvent(event)

  expect(doneButton.textContent).toBe('Done')
  expect(doneButton.style['background-color']).toEqual('green')
  expect(doneButton.style['color']).toEqual('white')

  expect(doneP.textContent).toBe(`Number of Done:2`)
  expect(notDoneP.textContent).toBe(`Number of Not Done:1`)
})

test('remove todo', () => {
  let targetTodo = document.getElementById('1')
  const event = new Event('click')

  let removeButton = targetTodo.children[2]
  removeButton.addEventListener('click', removeButtonHandler)
  removeButton.dispatchEvent(event)

  const itemList = document.getElementById('listTodo')
  expect(itemList.children).toHaveLength(2)

  const doneP = document.getElementById('done')
  expect(doneP.textContent).toBe(`Number of Done:1`)

  const notDoneP = document.getElementById('notDone')
  expect(notDoneP.textContent).toBe(`Number of Not Done:1`)

  targetTodo = document.getElementById('3')

  removeButton = targetTodo.children[2]
  removeButton.addEventListener('click', removeButtonHandler)
  removeButton.dispatchEvent(event)

  expect(itemList.children).toHaveLength(1)
  expect(doneP.textContent).toBe(`Number of Done:1`)
  expect(notDoneP.textContent).toBe(`Number of Not Done:0`)
})

test('store todo', () => {
  document.querySelector('input').value = 'Grading Exam'
  let event = new Event('click')
  let addButton = document.getElementById('addBtn')
  addButton.addEventListener('click', addTodoHandler)
  addButton.dispatchEvent(event)

  let itemList = document.getElementById('listTodo')
  expect(itemList.children).toHaveLength(2)

  const fourthDiv = itemList.children[1]
  const fourthPChild = fourthDiv.children[0]
  const fourthDoneButton = fourthDiv.children[1]
  const fourthRemoveButton = fourthDiv.children[2]

  expect(fourthDiv.getAttribute('id')).toBe('4')
  expect(fourthDiv.children).toHaveLength(3)
  expect(fourthPChild.nodeName).toBe('P')

  expect(fourthPChild.textContent).toBe('Grading Exam')
  expect(fourthDoneButton.nodeName).toBe('BUTTON')
  expect(fourthDoneButton.textContent).toBe('Not Done')
  expect(fourthRemoveButton.nodeName).toBe('BUTTON')
  expect(fourthRemoveButton.textContent).toBe('remove')

  let doneP = document.getElementById('done')
  expect(doneP.textContent).toBe(`Number of Done:1`)

  let notDoneP = document.getElementById('notDone')
  expect(notDoneP.textContent).toBe(`Number of Not Done:1`)

  event = new Event('beforeunload')
  window.addEventListener('beforeunload', (e) => {
    beforeUnloadHandler(e)
  })
  window.dispatchEvent(event)

  window.document.body.innerHTML = initialHtml

  window.addEventListener('load', () => {
    loadHandler()
  })

  event = new Event('load')
  window.dispatchEvent(event)

  expect(localStorage.getItem('todos')).toEqual(
    JSON.stringify([
      { id: 2, description: 'Listen Musics', done: true },
      { id: 4, description: 'Grading Exam', done: false }
    ])
  )

  itemList = document.getElementById('listTodo')

  expect(itemList.children).toHaveLength(2)

  const firstDiv = itemList.children[0]
  const firstPChild = firstDiv.children[0]
  const firstDoneButton = firstDiv.children[1]
  const firstRemoveButton = firstDiv.children[2]

  expect(firstDiv.getAttribute('id')).toBe('2')
  expect(firstDiv.children).toHaveLength(3)
  expect(firstPChild.nodeName).toBe('P')

  expect(firstPChild.textContent).toBe('Listen Musics')
  expect(firstDoneButton.nodeName).toBe('BUTTON')
  expect(firstDoneButton.textContent).toBe('Done')
  expect(firstRemoveButton.nodeName).toBe('BUTTON')
  expect(firstRemoveButton.textContent).toBe('remove')

  const secondDiv = itemList.children[1]
  const secondPChild = secondDiv.children[0]
  const secondDoneButton = secondDiv.children[1]
  const secondRemoveButton = secondDiv.children[2]

  expect(secondDiv.getAttribute('id')).toBe('4')

  expect(secondDiv.children).toHaveLength(3)
  expect(secondPChild.nodeName).toBe('P')
  expect(secondPChild.textContent).toBe('Grading Exam')
  expect(secondDoneButton.nodeName).toBe('BUTTON')
  expect(secondDoneButton.textContent).toBe('Not Done')
  expect(secondRemoveButton.nodeName).toBe('BUTTON')
  expect(secondRemoveButton.textContent).toBe('remove')

  doneP = document.getElementById('done')
  expect(doneP.textContent).toBe(`Number of Done:1`)
  notDoneP = document.getElementById('notDone')
  expect(notDoneP.textContent).toBe(`Number of Not Done:1`)

  document.querySelector('input').value = 'Jogging'
  event = new Event('click')
  addButton = document.getElementById('addBtn')
  addButton.addEventListener('click', addTodoHandler)
  addButton.dispatchEvent(event)

  expect(itemList.children).toHaveLength(3)
  const thirdDiv = itemList.children[2]
  const thirdPChild = thirdDiv.children[0]
  const thirdDoneButton = thirdDiv.children[1]
  const thirdRemoveButton = thirdDiv.children[2]
  expect(thirdDiv.getAttribute('id')).toBe('5')
  expect(thirdDiv.children).toHaveLength(3)
  expect(thirdPChild.nodeName).toBe('P')
  expect(thirdPChild.textContent).toBe('Jogging')
  expect(thirdDoneButton.nodeName).toBe('BUTTON')
  expect(thirdDoneButton.textContent).toBe('Not Done')
  expect(thirdRemoveButton.nodeName).toBe('BUTTON')
  expect(thirdRemoveButton.textContent).toBe('remove')

  doneP = document.getElementById('done')
  expect(doneP.textContent).toBe(`Number of Done:1`)
  notDoneP = document.getElementById('notDone')
  expect(notDoneP.textContent).toBe(`Number of Not Done:2`)
})
