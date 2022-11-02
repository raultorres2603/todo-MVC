class TodosController {
    #todos = [];
    #todoInp;
    #todoFinInp;
    #todoInsertInp;
    #init;

    constructor() {
        this.#init = this.#initController();
    }

    #initController() {
        window.addEventListener('load', (ev) => {
            this.setTodoInp(document.getElementById('todoInp'));
            this.setTodoFinInp(document.getElementById('todoFinInp'));
            this.setTodoInsert(document.getElementById('insertTodo'));
            this.getTodoInsert().addEventListener('click', (ev) => {
                
            })
        })
    }

    addTodo(todo) {
        this.getTodos().push(todo);
    }

/////////////////////////////// SETTERS AND GETTERS ///////////////////////////////
    setTodoInp(todoInp) {
        this.#todoInp = todoInp
    }

    setTodoFinInp(todoFinInp) {
        this.#todoFinInp = todoFinInp
    }

    getTodoInp() {
        return this.#todoInp;
    }

    getTodoFinInp() {
        return this.#todoFinInp;
    }

    getTodos() {
        return this.#todos;
    }

    setTodoInsert(todoInsInp) {
        this.#todoInsertInp = todoInsInp;
    }

    getTodoInsert() {
        return this.#todoInsertInp;
    }
/////////////////////////////// FIN SETTERS AND GETTERS ///////////////////////////////
}