export class Task {
  #title;
  #description;
  #priority;
  #created;

  constructor(title, description, priority) {
    this.#title = title;
    this.#description = description;
    this.#priority = priority;
    this.#created = new Date().toLocaleString("pt-br", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  }

  set title(title) {
    this.#title = title;
  }

  get title() {
    return this.#title;
  }

  set description(description) {
    this.#description = description;
  }

  get description() {
    return this.#description;
  }

  set priority(priority) {
    this.#priority = priority;
  }

  get priority() {
    this.#priority;
  }

  get created() {
    return this.#created;
  }
}
