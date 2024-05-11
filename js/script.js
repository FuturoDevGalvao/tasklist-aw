"use strict";

import {
  editTaskContainElements,
  tasksContainElements,
} from "./viewElements.js";

import { Task } from "./Task.js";
import { TaskRepository } from "./TaskRepository.js";

const showAlert = () => {
  const inputs = Object.values(editTaskContainElements.inputs);

  inputs
    .filter((input) => input.empty)
    .forEach((input) => input.alert.classList.add("show-alert"));
};

const hideAlert = (inputElement) => {
  const inputs = Object.values(editTaskContainElements.inputs);

  const input = inputs.find((input) => input.element == inputElement);

  input.alert.classList.remove("show-alert");
};

const addErrorStyleInputs = () => {
  const { inputTitle, inputDescription } = editTaskContainElements.inputs;

  inputTitle.element.classList.add("error");
  inputDescription.element.classList.add("error");
};

const showTaskEmpty = () => {
  const { tasksContain } = tasksContainElements;

  tasksContain.innerHTML = `          
    <div class="tasks-empty">
      <lord-icon
        src="https://cdn.lordicon.com/pflszboa.json"
        trigger="loop"
        delay="2000"
        colors="primary:#f0f8ff"
        style="width: 150px; height: 150px"
      >
      </lord-icon>
      <p>Sem tasks por aqui...</p>
    </div>
  `;
};

const hideTaskEmpty = () => {
  const { tasksEmpty } = tasksContainElements;

  tasksEmpty.classList.add("hide-tasks-empty");
};

const updateInputStatus = (input) => {
  const notEmpty = input.element.value.trim() !== "";

  input.empty = !notEmpty;
};

const validateTask = () => {
  const inputs = Object.values(editTaskContainElements.inputs);

  inputs.forEach(updateInputStatus);

  const hasEmpty = inputs.some((input) => input.empty);

  return !hasEmpty;
};

const getTaskData = () => {
  const { inputTitle, inputDescription } = editTaskContainElements.inputs;
  const { priorities } = editTaskContainElements;

  return {
    inputTitleValue: inputTitle.element.value,
    inputDescriptionValue: inputDescription.element.value,
    priorityValue: priorities.value,
  };
};

const createTaskOfDomElement = (domElement) => {
  const title = domElement.querySelector("#title");
  const description = domElement.querySelector("#description");
  const priority = document.querySelector("#priority");

  return new Task(
    title.textContent,
    description.textContent,
    priority.textContent
  );
};

const createTask = (taskData) => {
  const { inputTitleValue, inputDescriptionValue, priorityValue } = taskData;

  return new Task(inputTitleValue, inputDescriptionValue, priorityValue);
};

const getTimeCriationTask = (task) => {};

const createTaskCards = () => {
  const { tasksContain } = tasksContainElements;
  const allTasks = TaskRepository.getAllTasks();

  console.log(allTasks);
  /*   
  const timeOfCreation = getTimeCriationTask(task);
  console.log(timeOfCreation);
  */

  if (allTasks !== null) {
    hideTaskEmpty();
    tasksContain.innerHTML = "";

    allTasks.forEach((task) => {
      tasksContain.innerHTML += `
        <div class="task">
            <div class="header-task">
                <div class="about-task">
                  <span id="title">${task.title}</span>
                  <span id="time-of-creation">1 day ago ${task.created}</span>
                </div>
                <span id="priority">${task.priority}</span>
            </div>
            <div class="body-task">
                <span id="description">${task.description}</span>
            </div>
            <div class="actions">
                <button class="btn-action" id="edit">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="btn-action" id="delete">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                <button class="btn-action" id="completed">
                    <i class="fa-solid fa-check"></i>
                </button>
            </div>
        </div>
        `;

      addListenerButtonsAction();
    });
  } else {
    tasksContain.innerHTML = "";
    showTaskEmpty();
  }
};

const addTask = () => {
  const isValidated = validateTask();

  console.log(isValidated);

  if (isValidated) {
    const taskData = getTaskData();

    const task = createTask(taskData);

    TaskRepository.saveTask(task);

    createTaskCards();
  } else {
    addErrorStyleInputs();
    showAlert();
  }
};

const getTaskDomElement = () => {
  return {
    tasks: document.querySelectorAll(".task"),
  };
};

const addListenerButtonsAction = () => {
  const { tasks } = getTaskDomElement();

  tasks.forEach((task) => {
    task.addEventListener("click", (event) => {
      const targetButton = event.target.closest("button");
      if (!targetButton) return; // Saia se o clique não foi em um botão

      const buttonId = targetButton.id;

      // Capturar a task pai (a div com a classe "task")
      const clickedTask = event.currentTarget;

      console.log(`Botão com ID "${buttonId}" clicado na task:`);
      console.log(targetButton);
      console.log(clickedTask);

      switch (buttonId) {
        case "edit":
          break;

        case "delete":
          const task = createTaskOfDomElement(clickedTask);
          TaskRepository.deleteTask(task);
          createTaskCards();
          break;

        case "completed":
          break;
      }
    });
  });
};

const addListenerElements = () => {
  const { btnAddTask } = editTaskContainElements;
  const inputs = Object.values(editTaskContainElements.inputs);

  inputs.forEach((input) =>
    input.element.addEventListener("input", (event) => {
      hideAlert(event.target);
    })
  );

  btnAddTask.addEventListener("click", () => {
    addTask();
  });

  createTaskCards();
};

window.onload = addListenerElements;
