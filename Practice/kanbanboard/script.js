const outerbox = document.getElementById("kanban");
const addCon = document.getElementById("addcontainer");
const addTask = document.getElementById("addtaskbtn");
const allcon = document.querySelectorAll(".container");
const alltask = document.querySelectorAll(".items");

function moveElements(target) {
  target.addEventListener("dragover", (event) => {
    event.preventDefault(); // Required to allow dropping
  });

  target.addEventListener("drop", () => {
    const flyingElement = document.querySelector(".flying");
    if (flyingElement) {
      target.appendChild(flyingElement);
      allcon.forEach((board) => Updatecnt(board));
    }
  });
}

function addContainer() {
  const newcon = document.createElement("div");
  newcon.classList.add("container");

  const heading = document.createElement("h2");
  heading.classList.add("heading");
  heading.textContent = "New Container";

  newcon.appendChild(heading);
  outerbox.appendChild(newcon);
  moveElements(newcon);
  Initailcnt(newcon);
  allcon.forEach((board) => Updatecnt(board));
}

function addDragEvents(target) {
  target.addEventListener("dragstart", () => {
    target.classList.add("flying");
  });

  target.addEventListener("dragend", () => {
    target.classList.remove("flying");
  });
}

function addNewTask() {
  const input = prompt("Enter new task");
  if (!input) return;

  const newTask = document.createElement("p");
  newTask.classList.add("items");
  newTask.textContent = input;
  newTask.setAttribute("draggable", "true");

  addDragEvents(newTask);

  const todoContainer = document.getElementById("todo");
  todoContainer.appendChild(newTask);
  Updatecnt(todoContainer);
}

addCon.addEventListener("click", addContainer);
addTask.addEventListener("click", addNewTask);

alltask.forEach((task) => addDragEvents(task));
allcon.forEach((board) => {
  moveElements(board);
  Initailcnt(board);
});

function Updatecnt(target) {
  const noOfTasks = target.querySelectorAll(".items").length;
  const countElement = target.querySelector(".count");
  if (countElement) {
    countElement.textContent = `Count: ${noOfTasks}`;
  }
}

function Initailcnt(target) {
  const noOfTasks = target.querySelectorAll(".items").length;
  const count = document.createElement("h4");
  count.classList.add("count");
  count.textContent = `Count: ${noOfTasks}`;
  target.appendChild(count);
}
