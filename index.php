<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Init</title>
  <link rel="stylesheet" href="./libraries/bootstrap-5.0.2-dist/css/bootstrap.min.css" />
  <script src="./libraries/bootstrap-5.0.2-dist/js/bootstrap.min.js"></script>
</head>

<body>

  <div class="row">
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
  </div>
  <script src="./includes/model/Todo.js"></script>
  <script src="./includes/model/TodosController.js"></script>
  <script>
    var controller = new TodosController();
  </script>
</body>

</html>