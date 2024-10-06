import { todos } from "../input/input.js";
import { saveTodos } from "../storage/storage.js";
import { renderItemsLeft } from "./menu/menu.js";

export function renderTodos() {
  const itemListRef = document.getElementById("itemList");
  itemListRef.innerHTML = "";
  todos.forEach((item) => {
    itemListRef.innerHTML += item.content;
  });
  saveTodos();
  renderItemsLeft();
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("checkboxButton")) {
    event.target.classList.toggle("checkboxButtonChecked");
    const parentBox = event.target.closest(".todoBox");
    const todoId = parseInt(parentBox.getAttribute("data-id"));
    let todo;
    todos.forEach(function (currentTodo) {
      if (currentTodo.id === todoId) todo = currentTodo;
    });
    if (todo) {
      todo.checked = event.target.classList.contains("checkboxButtonChecked");
      ifChecked();
      saveTodos();
    }
  }
});

function removeCheckedTodos() {
  for (let index = todos.length - 1; index >= 0; index--) {
    if (todos[index].checked) {
      todos.splice(index, 1);
    }
  }
  renderTodos();
}
window.removeCheckedTodos = removeCheckedTodos;

function removeSelected(id) {
  for (let index = todos.length - 1; index >= 0; index--) {
    if (todos[index].id === id) {
      todos.splice(index, 1);
    }
  }
  renderTodos();
}
window.removeSelected = removeSelected;

export function ifChecked() {
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
