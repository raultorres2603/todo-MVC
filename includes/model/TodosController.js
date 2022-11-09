import { Todo } from "./Todo.js";
import { View } from "./View.js";

/**
 * Represents a Controller of the APP
 * @constructor
 */
export class TodosController {
  #todos = new Array();
  #init;
  #menu;
  #view;

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

      this.#addListeners();

      this.#draw();
    });
  }

  /**
   * Add Listeners to each input
   */
  #addListeners() {
    switch (this.getMenu()) {
      case "main":
        document
          .getElementById("insertTodo")
          .addEventListener("click", (ev) => {
            let todo = new Todo(
              document.getElementById("todoInp").value,
              document.getElementById("todoFinInp").value
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
    switch (this.getMenu()) {
      case "main":
        console.log("DIBUJANDO");
        let tableBody = document.querySelector(".tBodyTODO");
        // Clean table body
        tableBody.replaceChildren();
        // For each todo, insert row with the cells
        this.getTodos().forEach((todo, index) => {
          //Creamos la ROW para meter las celdas siguientes
          let row = tableBody.insertRow();
          let todoName = row.insertCell();
          todoName.innerHTML = todo.getName();
          let todoCreate = row.insertCell();
          todoCreate.innerHTML = new Date(
            todo.getCreated()
          ).toLocaleDateString();
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
        break;

      default:
        break;
    }
  }

  #menuController() {
    this.setView(new View(this.getMenu()));
  }

  /////////////////////////////// SETTERS AND GETTERS ///////////////////////////////

  /**
   *  Getter of todos
   * @returns {HTMLElement}
   */
  getTodos() {
    return this.#todos;
  }

  /**
   *  Getter of menu
   * @returns {HTMLElement}
   */
  getMenu() {
    return this.#menu;
  }

  /**
   *  Getter of menu
   * @returns {View}
   */
  getView() {
    return this.#view;
  }

  /**
   *  Setter of menu
   */
  setMenu(menu) {
    this.#menu = menu;
    this.#menuController();
  }

  /**
   *  Setter of todos
   */
  setTodos(todos) {
    this.#todos = todos;
  }

  /**
   *  Setter of views
   */
  setView(view) {
    this.#view = view;
  }

  /////////////////////////////// FIN SETTERS AND GETTERS ///////////////////////////////
}
