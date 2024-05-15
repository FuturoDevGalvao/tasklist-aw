"use strict";

import {
  editTaskContainElements,
  tasksContainElements,
  filterTasksElements,
} from "./viewElements.js";

import { Task } from "./Task.js";
import { TaskRepository } from "./TaskRepository.js";

let added = false;

const showEditTaskContain = () => {
  const { editTasksContain } = editTaskContainElements;

  editTasksContain.style.opacity = "1";
  editTasksContain.style.pointerEvents = "auto";
};

const hideEditTaskContain = () => {
  const { editTasksContain } = editTaskContainElements;

  editTasksContain.style.opacity = "0";
  editTasksContain.style.pointerEvents = "none";
};

const clearFieldsEditTask = () => {
  const { inputs, priorities } = editTaskContainElements;

  Object.values(inputs).forEach((input) => (input.element.value = ""));
  priorities.value = "LOW";
};

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
  const id = domElement.querySelector("#id");
  const title = domElement.querySelector("#title");
  const description = domElement.querySelector("#description");
  const priority = document.querySelector("#priority");

  return new Task(
    id.textContent,
    title.textContent,
    description.textContent,
    priority.textContent
  );
};

const createTask = (taskData) => {
  const { inputTitleValue, inputDescriptionValue, priorityValue } = taskData;

  return new Task(
    0,
    inputTitleValue,
    inputDescriptionValue,
    priorityValue,
    "",
    "",
    false
  );
};

const getTimeCriationTask = (task) => {
  const today = new Date();
  const dateCreationTask = new Date(task.created);
  const diferencaEmMilisegundos = today.getTime() - dateCreationTask.getTime();
  const diferencaEmDias = diferencaEmMilisegundos / (1000 * 60 * 60 * 24);
  const diferencaArredondada = Math.round(diferencaEmDias);

  return diferencaArredondada - 1;
};

const randomBg = (task) => {
  let colors = [
    "#FF7511",
    "#FFA800",
    "#19DB7E",
    "#FF4BA6",
    "#6457F9",
    "#00D4C8",
  ];

  const allTasks = TaskRepository.getAllTasks();
  let lastColor;

  if (allTasks && allTasks.length > 0) {
    lastColor = allTasks[allTasks.length - 1].color;
    colors = colors.filter((c) => c !== lastColor);
  }

  const randomIndex = Math.floor(Math.random() * colors.length);
  task.color = colors[randomIndex];
};

const createTaskCards = (tasksFiltered = null) => {
  const { tasksContain } = tasksContainElements;
  const allTasks = TaskRepository.getAllTasks();
  const classTaskCompleted = "task-completed";

  const tasksForOperation = tasksFiltered ? tasksFiltered : allTasks;

  if (tasksForOperation !== null && tasksForOperation.length > 0) {
    hideTaskEmpty();
    tasksContain.innerHTML = "";

    tasksForOperation.forEach((task) => {
      let timeOfCreation = getTimeCriationTask(task);

      tasksContain.innerHTML += `
        <div class="task ${
          task.completed ? classTaskCompleted : ""
        }" style="background-color: ${task.color}">
            <span id="id">${task.id}</span>
            <div class="header-task">
                <div class="about-task">
                  <span id="title">${task.title}</span>
                  <span id="time-of-creation">added ${
                    timeOfCreation <= 1
                      ? "today"
                      : "there is " + String(timeOfCreation) + " days"
                  }</span>
                </div>
                <span id="priority">${task.priority}</span>
            </div>
            <div class="body-task">
                <span id="description">${task.description}</span>
            </div>
            <div class="actions">
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

  if (isValidated) {
    const task = createTask(getTaskData());

    randomBg(task);
    TaskRepository.saveTask(task);
    added = true;

    createTaskCards();
    hideEditTaskContain();
    clearFieldsEditTask();
  } else {
    showAlert();
  }
};

const addDefaultListerBtnAdd = () => {};

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

      const clickedTask = event.currentTarget;
      let task = createTaskOfDomElement(clickedTask);

      switch (buttonId) {
        case "delete":
          TaskRepository.deleteTask(task);
          createTaskCards();
          break;

        case "completed":
          const taskCompleted = TaskRepository.getTaskById(task.id);

          if (taskCompleted.completed) {
            taskCompleted.completed = false;
          } else {
            taskCompleted.completed = true;
          }

          TaskRepository.updateTask(taskCompleted);
          removeFilterSelectedStyle();
          createTaskCards();
          break;
      }
    });
  });
};

const removeFilterSelectedStyle = () => {
  const { filters } = filterTasksElements;
  filters.forEach((filter) => filter.classList.remove("filter-selected"));
};

const addFilterSelectedStyle = (filter) => {
  if (filter.classList.contains("filter-selected")) {
    //TIROU O FILTRO
    filter.classList.remove("filter-selected");
    return false;
  } else {
    //APLICOU O FILTRO
    removeFilterSelectedStyle();
    filter.classList.add("filter-selected");
    return true;
  }
};

const applyFilter = (filterSelected, apply) => {
  const allTasks = TaskRepository.getAllTasks();

  if (allTasks && apply) {
    const allFilters = {
      checked: () => allTasks.filter((task) => task.completed),
      unchecked: () => allTasks.filter((task) => !task.completed),
      low: () => allTasks.filter((task) => task.priority === "LOW"),
      medium: () => allTasks.filter((task) => task.priority === "MEDIUM"),
      high: () => allTasks.filter((task) => task.priority === "HIGH"),
    };

    createTaskCards(allFilters[filterSelected]());
  } else {
    createTaskCards();
  }
};

const addListenerElements = () => {
  const { btnNewTask } = tasksContainElements;
  const inputs = Object.values(editTaskContainElements.inputs);
  const { btnCloseEditTaskContain } = editTaskContainElements;
  const { filters } = filterTasksElements;
  const { btnAddTask } = editTaskContainElements;

  btnAddTask.addEventListener("click", addTask);

  btnNewTask.addEventListener("click", showEditTaskContain);

  btnCloseEditTaskContain.addEventListener("click", hideEditTaskContain);

  filters.forEach((filter) =>
    filter.addEventListener("click", (event) => {
      let apply = false;
      if (added) apply = addFilterSelectedStyle(event.target);
      applyFilter(event.target.textContent, apply);
    })
  );

  inputs.forEach((input) =>
    input.element.addEventListener("input", (event) => {
      hideAlert(event.target);
    })
  );

  createTaskCards();
};

window.onload = addListenerElements;
