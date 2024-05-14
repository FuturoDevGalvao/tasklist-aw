import { Task } from "./Task.js";

export class TaskRepository {
  /**
   *
   * @returns retorna nulo, caso o localStorage esteja vazio
   */
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

  // Método para buscar uma task pelo ID no banco de dados
  static getTaskById(taskId) {
    const task = JSON.parse(localStorage.getItem(taskId));
    task.id = taskId;
    return Task.fromJSON(task);
  }

  static #getNextId() {
    // Obter todas as chaves do localStorage
    const keys = Object.keys(localStorage).sort();

    if (keys.length === 0) return 1;

    const lastId = Number(keys[keys.length - 1]);
    const newId = lastId + 1;

    return newId;
  }

  // Método para salvar uma nova task no banco de dados
  static saveTask(task) {
    console.log(task);
    //const taskFormatedToJSON = JSON.stringify(task);

    if (task.id === undefined) {
      localStorage.setItem(this.#getNextId(), JSON.stringify(task));
    } else {
      this.updateTask(task);
    }
  }

  // AINDA IMPLEMENTANDO
  // Método para atualizar uma task existente no banco de dados
  static updateTask(task) {
    console.log(task);
    const id = task.id;
    delete task.id;
    localStorage.setItem(id, JSON.stringify(task));
  }

  static getIDTask(taskToSearch) {
    const keys = Object.keys(localStorage);

    for (const key of keys) {
      const task = Task.fromJSON(JSON.parse(localStorage.getItem(key)));

      if (task.title === taskToSearch.title) {
        console.log(key);
        return key;
      }
    }

    return -1;
  }
  // Método para deletar uma task pelo ID no banco de dados
  static deleteTask(task) {
    localStorage.removeItem(this.getIDTask(task));
  }
}
