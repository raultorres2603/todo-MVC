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
      this.setView("main");
    });
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
    this.#view = new View(menu, this.getTodos());
  }

  /////////////////////////////// FIN SETTERS AND GETTERS ///////////////////////////////
}
