class Todo {
  static runningId = 1

  static setRunningId(loadingId) {
    Todo.runningId = loadingId
  }

  constructor(id, description, done = false) {
    this.id = id ?? Todo.runningId++
    // console.log(this.id)
    this.description = description
    this.done = done
    // this.done = done ?? false
    // console.log(this.done)
  }

  getTodo() {
    // return { id: this.id, description: this.description, done: this.done }
    return this
  }
  setDescription(newDescription) {
    this.description = newDescription
  }
  setDone(value) {
    this.done = value
  }
}

// export { Todo }
module.exports = Todo
