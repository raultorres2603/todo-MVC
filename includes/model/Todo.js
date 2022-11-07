/**
 * Todo CLASS
 * @constructor
 */
export class Todo {
  constructor(name, final) {
    this.name = name;
    this.final = final;
    this.created = new Date();
  }

  getName() {
    return this.name;
  }

  getCreated() {
    return this.created;
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
