export const editTaskContainElements = {
  inputs: {
    inputTitle: {
      element: document.getElementById("input-title"),
      empty: true,
      alert: document.getElementById("input-title-alert"),
    },
    inputDescription: {
      element: document.getElementById("input-description"),
      empty: true,
      alert: document.getElementById("input-description-alert"),
    },
  },
  priorities: document.getElementById("priorities"),
  btnAddTask: document.getElementById("btn-add-task"),
};

export const tasksContainElements = {
  tasksContain: document.querySelector(".tasks"),
  tasksEmpty: document.querySelector(".tasks-empty"),
};
