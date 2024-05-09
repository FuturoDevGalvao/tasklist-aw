export class Task {
  #title;
  #description;
  #priority;
  #created;

  constructor(title, description, priority, created = null) {
    this.#title = title;
    this.#description = description;
    this.#priority = priority;

    this.#created =
      created ||
      new Date().toLocaleString("pt-br", {
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
    return this.#priority;
  }

  get created() {
    return this.#created;
  }

  toJSON() {
    return {
      title: this.#title,
      description: this.#description,
      priority: this.#priority,
      created: this.#created,
    };
  }

  static fromJSON(json) {
    const { title, description, priority, created } = json;

    return new Task(title, description, priority, created);
  }
}
