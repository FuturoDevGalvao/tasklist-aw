export class Task {
  #title;
  #description;
  #priority;
  #created;
  #completed;
  #color;

  constructor(title, description, priority, created = "", color = "") {
    this.#title = title;
    this.#description = description;
    this.#priority = priority;
    this.#completed = false;

    if (created) {
      this.#created = created;
    } else {
      this.#created = new Date().toLocaleString("pt-br", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
    }

    if (color) this.#color = color;
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

  set completed(completed) {
    this.#completed = completed;
  }

  get completed() {
    return this.#completed;
  }

  get created() {
    return this.#created;
  }

  set color(color) {
    this.#color = color;
  }

  get color() {
    return this.#color;
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
