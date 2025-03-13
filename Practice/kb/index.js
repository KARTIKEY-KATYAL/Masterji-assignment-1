let Draggingele = null;
// alert("hello")
function addTask(colid) {
  const Input = document.getElementById(`${colid}-input`);
  const taskText = Input.value;
  if (taskText === "") {
    return;
  }

  const TaskElement = createTaskElement(taskText);
  document.getElementById(`${colid}-tasks`).appendChild(TaskElement);
  Input.value = ""; // Clear input after adding a task
}

function addDragClass() {
  this.classList.add("dragging");
  Draggingele = this;
}

function removeDragClass() {
  this.classList.remove("dragging");
  Draggingele = null;
}

const tasksContainers = document.querySelectorAll(".tasks");
tasksContainers.forEach((item) => {
  item.addEventListener("dragover", onDragOver);
});

function createTaskElement(taskContent) {
  const newtaskelement = document.createElement("div");
  newtaskelement.textContent = taskContent;
  newtaskelement.classList.add("card");

  newtaskelement.draggable = true;
  newtaskelement.addEventListener("dragstart", addDragClass);
  newtaskelement.addEventListener("dragend", removeDragClass);

  return newtaskelement;
}

function onDragOver(e) {
  e.preventDefault(); // Allow dropping
  this.appendChild(Draggingele);
}

