class Todo {
  constructor(name, final) {
    this.name = name;
    this.final = final;
  }

  getName() {
    return this.name;
  }

  getFinal() {
    return this.final;
  }

  setName(name) {
    this.name = name;
  }

  setFinal(final) {
    this.final = final;
  }
}
