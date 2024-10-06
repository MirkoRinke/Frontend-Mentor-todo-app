import { inputRef } from "./globals.js";

let todos = []; // todos is an array of objects, each object represents a todo
let idCounter = 0; // idCounter is used to give each todo a unique id

function logTodos() {
  console.log(todos);
}
window.logTodos = logTodos;

function getInput() {
  let inputValue = inputRef.value;
  if (inputValue.trim() === "") return;
  let itemId = idCounter++; // give the todo a unique id
  // data-id is used to identify the todo
  let itemBox = /*html*/ ` 
    <div class="todoBox" data-id="${itemId}"> 
        <div class="todoHolder">
          <button class="checkboxButton"></button>
          <p class="todoTextArea">${inputValue}</p>
        </div>
        <span class="deleteButton" onclick="removeSelected(${itemId})">X</span>   
    </div>
  `;
  todos.push({ id: itemId, content: itemBox, checked: false }); // add the todo to the todos array as an object with the todo's id, content and checked status.
  inputRef.value = "";
  renderTodos();
}

inputRef.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    getInput();
  }
});

function renderTodos() {
  const itemListRef = document.getElementById("itemList");
  itemListRef.innerHTML = "";
  todos.forEach((item) => {
    // for each todo in the todos array, add the todo's content to the itemListRef
    itemListRef.innerHTML += item.content;
  });
  saveTodos();
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("checkboxButton")) {
    // if the clicked element has the class checkboxButton
    event.target.classList.toggle("checkboxButtonChecked"); // toggle the class checked on the clicked element
    const parentBox = event.target.closest(".todoBox"); // find the closest parent element with the class itemBox
    const todoId = parseInt(parentBox.getAttribute("data-id")); // get the todo's id from the parent element's data-id attribute
    let todo;
    todos.forEach(function (currentTodo) {
      // find the todo in the todos array with the same id as the clicked todo
      if (currentTodo.id === todoId) todo = currentTodo; // set the todo variable to the found todo
    });
    if (todo) {
      todo.checked = event.target.classList.contains("checkboxButtonChecked"); // set the todo's checked status to true if the clicked element has the class checked and false if it doesn't
      ifChecked();
      saveTodos();
    }
  }
});

function removeCheckedTodos() {
  for (let index = todos.length - 1; index >= 0; index--) {
    // loop through the todos array backwards to avoid skipping elements
    if (todos[index].checked) {
      todos.splice(index, 1);
    }
  }
  renderTodos();
}
window.removeCheckedTodos = removeCheckedTodos;

function removeSelected(id) {
  for (let index = todos.length - 1; index >= 0; index--) {
    // loop through the todos array backwards to avoid skipping elements
    if (todos[index].id === id) {
      todos.splice(index, 1);
    }
  }
  renderTodos();
}

window.removeSelected = removeSelected;

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("idCounter", idCounter);
}

function loadTodos() {
  if (JSON.parse(localStorage.getItem("todos"))) todos = JSON.parse(localStorage.getItem("todos"));
  if (JSON.parse(localStorage.getItem("idCounter"))) idCounter = JSON.parse(localStorage.getItem("idCounter"));
  ifChecked();
  renderTodos();
}
loadTodos();

function ifChecked() {
  todos.forEach(function (todo) {
    if (todo.checked && !todo.content.includes("checkboxButtonChecked")) {
      todo.content = todo.content.replaceAll("checkboxButton", "checkboxButton checkboxButtonChecked");
      todo.content = todo.content.replaceAll("todoTextArea", "todoTextArea todoTextAreaChecked");
    } else if (!todo.checked && todo.content.includes("checkboxButtonChecked")) {
      todo.content = todo.content.replaceAll("checkboxButton checkboxButtonChecked", "checkboxButton");
      todo.content = todo.content.replaceAll("todoTextArea todoTextAreaChecked", "todoTextArea");
    }
  });
  renderTodos();
}
