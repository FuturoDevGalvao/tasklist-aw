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

    keys.forEach((key) => allTasks.push(localStorage.getItem(key)));

    return allTasks
      .map((task) => JSON.parse(task))
      .map((task) => Task.fromJSON(task));
  }

  // Método para buscar uma task pelo ID no banco de dados
  static getTaskById(taskId) {
    // Implemente a lógica para buscar uma task pelo ID no banco de dados
    // Retorne a task encontrada ou null se não encontrada
    return null; // Exemplo: retornando null por enquanto
  }

  static #getNextId() {
    // Obter todas as chaves do localStorage
    const keys = Object.keys(localStorage).sort();

    console.log(keys);

    if (keys.length === 0) return 1;

    const lastId = Number(keys[keys.length - 1]);
    console.log(lastId);
    const newId = lastId + 1;
    console.log(newId);

    return newId;
  }

  // Método para salvar uma nova task no banco de dados
  static saveTask(task) {
    const taskFormatedToJSON = JSON.stringify(task);

    localStorage.setItem(this.#getNextId(), taskFormatedToJSON);
  }

  // Método para atualizar uma task existente no banco de dados
  static updateTask(task) {
    // Implemente a lógica para atualizar uma task existente no banco de dados
    // Retorne true se a atualização foi bem-sucedida ou false se ocorreu algum erro
    return true; // Exemplo: retornando true por enquanto
  }

  static #getIDTask(taskToSearch) {
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
    localStorage.removeItem(this.#getIDTask(task));
  }
}
