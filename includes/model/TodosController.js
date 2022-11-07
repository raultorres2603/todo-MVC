import { Todo } from "./Todo.js";

/**
 * Represents a Controller of the APP
 * @constructor
 */
export class TodosController {
  #todos = new Array();
  #todoInp;
  #todoFinInp;
  #todoInsertInp;
  #tableTODOSbody;
  #init;
  #menu;

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
    this.setMenu("main");
    window.addEventListener("load", (ev) => {
      if (localStorage.getItem("todos")) {
        this.setTodos(this.convertLocalStorage());
      }

      this.#draw();
    });
  }

  /**
   * Add Listeners to each input
   */
  #addListeners() {
    switch (this.getMenu()) {
      case "main":
        this.setTodoInp(document.getElementById("todoInp"));
        this.setTodoFinInp(document.getElementById("todoFinInp"));
        this.setTodoInsert(document.getElementById("insertTodo"));
        this.setTodoTableBody(document.querySelector(".tBodyTODO"));

        this.getTodoInsert().addEventListener("click", (ev) => {
          let todo = new Todo(
            this.getTodoInp().value,
            this.getTodoFinInp().value
          );
          this.#addTodo(todo);
        });
        break;

      default:
        break;
    }
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

  #menuController() {
    switch (this.getMenu()) {
      case "main":
        document.querySelector(".root").innerHTML = `<div class="row">
      <div class="col-md-12">
        <div class="display-2 text-center">
          TODO's
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="card">
              <h5 class="card-header display-4 text-center bg-info">List</h5>
              <div class="card-body">
                <div class="row">
                  <table class="table tableTODOS">
                    <thead class="table-dark text-center">
                      <tr>
                        <th>TODO</th>
                        <th>Creation</th>
                        <th>Finalization</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody class="text-center tBodyTODO">
                    </tbody>
                  </table>
                </div>
  
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <h5 class="card-header display-4 text-center bg-info">Create</h5>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">TODO</span>
                      </div>
                      <input type="text" class="form-control" id="todoInp" placeholder="Ex: Do homework" aria-label="homework" aria-describedby="basic-addon1">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Finalization</span>
                      </div>
                      <input type="date" class="form-control" id="todoFinInp" aria-label="homework" aria-describedby="basic-addon1">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="d-grid gap-2">
                      <button type="button" id="insertTodo" class="btn btn-success btn-lg btn-block">Insert</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
        this.#addListeners();
        break;

      default:
        break;
    }
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
   *  Getter of menu
   * @returns {HTMLElement}
   */
  getMenu() {
    return this.#menu;
  }

  /**
   *  Setter of todoInsertInp
   */
  setTodoInsert(todoInsInp) {
    this.#todoInsertInp = todoInsInp;
  }

  /**
   *  Setter of menu
   */
  setMenu(menu) {
    this.#menu = menu;
    this.#menuController();
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
