"use strict";

import {
  editTaskContainElements,
  tasksContainElements,
} from "./viewElements.js";

import { Task } from "./Task.js";

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

const addTask = () => {
  const isValidated = validateTask();

  console.log(isValidated);

  if (isValidated) {
    const taskData = getTaskData();

    const task = createTask(taskData);

    console.log(task.created);
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
