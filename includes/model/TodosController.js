/**
 * Represents a Controller of the APP
 * @constructor
 */
class TodosController {
  #todos = new Array();
  #todoInp;
  #todoFinInp;
  #todoInsertInp;
  #tableTODOSbody;
  #init;

  constructor() {
    this.#init = this.#initController();
  }

  /**
   * A function that provides an array with good prototype
   * @returns {Array}
   */
  convertLocalStorage() {
    let todosStorage = JSON.parse(localStorage.getItem("todos"));
    todosStorage.forEach((todo) => {
      Object.setPrototypeOf(todo, Todo.prototype);
    });
    return todosStorage;
  }

  /**
   * Function that is called when the Controller it's created
   */
  #initController() {
    window.addEventListener("load", (ev) => {
      if (localStorage.getItem("todos")) {
        this.setTodos(this.convertLocalStorage());
      }

      this.#addListeners();

      this.#draw();
    });
  }

  /**
   * Add Listeners to each input
   */
  #addListeners() {
    this.setTodoInp(document.getElementById("todoInp"));
    this.setTodoFinInp(document.getElementById("todoFinInp"));
    this.setTodoInsert(document.getElementById("insertTodo"));
    this.setTodoTableBody(document.querySelector(".tBodyTODO"));

    this.getTodoInsert().addEventListener("click", (ev) => {
      let todo = new Todo(this.getTodoInp().value, this.getTodoFinInp().value);
      this.#addTodo(todo);
    });
  }

  /**
   * Function that adds a new Todo to the prop and localStorage
   * @param {Todo} todo
   */
  #addTodo(todo) {
    this.getTodos().push(todo);
    localStorage.setItem("todos", JSON.stringify(this.getTodos()));
    this.#draw();
  }

  /**
   * Delete a todo by the passed index on locanStorage and prop
   * @param {Int} todoIndex
   */
  #deleteTodo(todoIndex) {
    this.getTodos().splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(this.getTodos()));
    this.#draw();
  }

  /**
   * Draw method on table body
   */
  #draw() {
    console.log("DIBUJANDO");
    let tableBody = this.getTodoTableBody();
    // Clean table body
    tableBody.replaceChildren();
    // For each todo, insert row with the cells
    this.getTodos().forEach((todo, index) => {
      //Creamos la ROW para meter las celdas siguientes
      let row = tableBody.insertRow();
      let todoName = row.insertCell();
      todoName.innerHTML = todo.getName();
      let todoCreate = row.insertCell();
      todoCreate.innerHTML = new Date(todo.getCreated()).toLocaleDateString();
      let todoFinal = row.insertCell();
      todoFinal.innerHTML = new Date(todo.getFinal()).toLocaleDateString();
      let todoDelete = row.insertCell();
      todoDelete.innerHTML = `<div class="d-grid gap-2">
      <button class="btn btn-danger align-middle" type="button">Delete</button>
    </div>`;
      todoDelete.addEventListener("click", (ev) => {
        this.#deleteTodo(index);
      });
    });
  }

  /////////////////////////////// SETTERS AND GETTERS ///////////////////////////////

  /**
   *  Getter of todoInp
   * @returns {HTMLElement}
   */
  getTodoInp() {
    return this.#todoInp;
  }

  /**
   *  Getter of todoFinInp
   * @returns {HTMLElement}
   */
  getTodoFinInp() {
    return this.#todoFinInp;
  }

  /**
   *  Getter of todos
   * @returns {HTMLElement}
   */
  getTodos() {
    return this.#todos;
  }

  /**
   *  Getter of todoInsertInp
   * @returns {HTMLElement}
   */
  getTodoInsert() {
    return this.#todoInsertInp;
  }

  /**
   *  Getter of tableTODOSbody
   * @returns {HTMLElement}
   */
  getTodoTableBody() {
    return this.#tableTODOSbody;
  }

  /**
   *  Setter of todoInsertInp
   */
  setTodoInsert(todoInsInp) {
    this.#todoInsertInp = todoInsInp;
  }

  /**
   *  Setter of tableTODOSbody
   */
  setTodoTableBody(todoTableBody) {
    this.#tableTODOSbody = todoTableBody;
  }

  /**
   *  Setter of todos
   */
  setTodos(todos) {
    this.#todos = todos;
  }

  /**
   *  Setter of todoInp
   */
  setTodoInp(todoInp) {
    this.#todoInp = todoInp;
  }

  /**
   *  Setter of todoFinInp
   */
  setTodoFinInp(todoFinInp) {
    this.#todoFinInp = todoFinInp;
  }

  /////////////////////////////// FIN SETTERS AND GETTERS ///////////////////////////////
}
