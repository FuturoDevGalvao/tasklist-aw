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

const hideTaskEmpty = () => {
  const { tasksEmpty } = tasksContainElements;

  tasksEmpty.classList.toggle("hide-tasks-empty");
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

const createTask = (taskData) => {
  const { inputTitleValue, inputDescriptionValue, priorityValue } = taskData;

  return new Task(inputTitleValue, inputDescriptionValue, priorityValue);
};

const getTimeCriationTask = (task) => {};

const saveTask = (task) => {
  const taskFormatedToJSON = JSON.stringify(task);
};

const setTaskCardData = (task) => {
  const { tasksContain } = tasksContainElements;

  /*   const timeOfCreation = getTimeCriationTask(task);
  console.log(timeOfCreation);
 */
  tasksContain.innerHTML += `
      <div class="task">
          <div class="header-task">
              <div class="about-task">
                <span id="title">${task.title}</span>
                <span id="time-of-creation">1 day ago</span>
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
};

const addTask = () => {
  const isValidated = validateTask();

  console.log(isValidated);

  if (isValidated) {
    const taskData = getTaskData();

    const task = createTask(taskData);

    saveTask(task);

    //setTaskCardData(task);
  } else {
    addErrorStyleInputs();
    showAlert();
  }
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
  hideTaskEmpty();
};

window.onload = addListenerElements;
