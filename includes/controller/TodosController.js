import { Todo } from "../model/Todo.js";
import { View } from "../model/View.js";

/**
 * Represents a Controller of the APP
 * @constructor
 */
export class TodosController {
  #todos = new Array();
  #init;
  #view;

  constructor() {
    this.#view = new View("main");
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
      this.getView().draw(this.getTodos());
      this.#addListeners();
    });
  }

  /**
   * Add Listeners to each input
   */
  #addListeners() {
    switch (this.getView().getMenu()) {
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
        this.#addDeleteTodoListener();
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
    this.getView().draw(this.getTodos());
    this.#addDeleteTodoListener();
  }

  #addDeleteTodoListener() {
    document.querySelectorAll(".todoDelete").forEach((element, index) => {
      element.addEventListener("click", () => {
        this.#deleteTodo(element.dataset.todoIndex);
      });
    });
  }

  /**
   * Delete a todo by the passed index on locanStorage and prop
   * @param {Int} todoIndex
   */
  #deleteTodo(todoIndex) {
    this.getTodos().splice(todoIndex, 1);
    if (this.getTodos().length == 0) {
      localStorage.removeItem("todos");
    } else {
      localStorage.setItem("todos", JSON.stringify(this.getTodos()));
    }
    this.getView().draw(this.getTodos());
    this.#addDeleteTodoListener();
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
   * @returns {View}
   */
  getView() {
    return this.#view;
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
  setView(menu) {
    this.#view = new View(menu);
    this.getView().draw(this.getTodos());
    this.#addListeners();
  }

  /////////////////////////////// FIN SETTERS AND GETTERS ///////////////////////////////
}
