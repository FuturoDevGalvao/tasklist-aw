export class Task {
  #id;
  #title;
  #description;
  #priority;
  #created;
  #completed;
  #color;

  constructor(
    id = 0,
    title,
    description,
    priority,
    created = "",
    color = "",
    completed = false
  ) {
    if (id) this.#id = id;

    this.#title = title;
    this.#description = description;
    this.#priority = priority;

    if (completed) {
      this.#completed = completed;
    } else {
      this.#completed = completed;
    }

    if (created) {
      this.#created = created;
    } else {
      this.#created = new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    }

    if (color) this.#color = color;
  }

  set id(id) {
    this.#id = id;
  }

  get id() {
    return this.#id;
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
      color: this.#color,
      completed: this.#completed,
    };
  }

  static fromJSON(json) {
    const { id, title, description, priority, created, color, completed } =
      json;

    return new Task(
      id,
      title,
      description,
      priority,
      created,
      color,
      completed
    );
  }
}
