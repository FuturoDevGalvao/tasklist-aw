import { Task } from "./Task.js";

export class TaskRepository {
  static getAllTasks() {
    const keys = Object.keys(localStorage).sort().reverse();
    const allTasks = [];

    if (keys.length === 0) return null;

    keys.forEach((key) => allTasks.push(JSON.parse(localStorage.getItem(key))));

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      allTasks[i].id = key;
    }

    return allTasks.map((task) => Task.fromJSON(task));
  }

  static getTaskById(taskId) {
    const task = JSON.parse(localStorage.getItem(taskId));
    task.id = taskId;
    return Task.fromJSON(task);
  }

  static #getNextId() {
    const keys = Object.keys(localStorage).sort();

    if (keys.length === 0) return 1;

    const lastId = Number(keys[keys.length - 1]);
    const newId = lastId + 1;

    return newId;
  }

  static saveTask(task) {
    localStorage.setItem(this.#getNextId(), JSON.stringify(task));
  }

  static updateTask(task) {
    const id = task.id;
    delete task.id;
    localStorage.setItem(id, JSON.stringify(task));
  }

  static deleteTask(task) {
    localStorage.removeItem(task.id);
  }
}
