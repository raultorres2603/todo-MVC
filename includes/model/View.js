export class View {
  #menu;
  constructor(menu) {
    this.#menu = menu;
    this.#render();
  }

  draw(todos) {
    switch (this.getMenu()) {
      case "main":
        console.log("DIBUJANDO");
        let tableBody = document.querySelector(".tBodyTODO");
        // Clean table body
        tableBody.replaceChildren();
        // For each todo, insert row with the cells
        todos.forEach((todo, index) => {
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
          <button class="btn btn-danger todoDelete align-middle" data-todoIndex="${index}" type="button">Delete</button>
          </div>`;
        });
        break;

      default:
        break;
    }
  }

  #render() {
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
        break;

      default:
        break;
    }
  }

  getMenu() {
    return this.#menu;
  }
}
