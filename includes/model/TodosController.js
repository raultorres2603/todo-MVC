class TodosController {
  #todos = new Array();
  #todoInp;
  #todoFinInp;
  #todoInsertInp;
  #init;

  constructor() {
    this.#init = this.#initController();
  }

  convertLocalStorage() {
    let todosStorage = JSON.parse(localStorage.getItem("todos"));
    todosStorage.forEach((todo) => {
      Object.setPrototypeOf(todo, Todo.prototype);
    });
    console.log(localStorage.getItem("todos"));
    return todosStorage;
  }

  #initController() {
    window.addEventListener("load", (ev) => {
      if (localStorage.getItem("todos")) {
        this.setTodos(this.convertLocalStorage());
      }

      this.setTodoInp(document.getElementById("todoInp"));
      this.setTodoFinInp(document.getElementById("todoFinInp"));
      this.setTodoInsert(document.getElementById("insertTodo"));

      this.getTodoInsert().addEventListener("click", (ev) => {
        let todo = new Todo(
          this.getTodoInp().value,
          this.getTodoFinInp().value
        );
        this.addTodo(todo);
      });
      console.log(this.getTodos());
    });
  }

  addTodo(todo) {
    this.getTodos().push(todo);
    localStorage.setItem("todos", JSON.stringify(this.getTodos()));
    console.log(this.getTodos());
  }

  /////////////////////////////// SETTERS AND GETTERS ///////////////////////////////

  getTodoInp() {
    return this.#todoInp;
  }

  getTodoFinInp() {
    return this.#todoFinInp;
  }

  getTodos() {
    return this.#todos;
  }

  getTodoInsert() {
    return this.#todoInsertInp;
  }

  setTodoInsert(todoInsInp) {
    this.#todoInsertInp = todoInsInp;
  }

  setTodos(todos) {
    this.#todos = todos;
  }

  setTodoInp(todoInp) {
    this.#todoInp = todoInp;
  }

  setTodoFinInp(todoFinInp) {
    this.#todoFinInp = todoFinInp;
  }

  /////////////////////////////// FIN SETTERS AND GETTERS ///////////////////////////////
}
