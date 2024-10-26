import { todos } from "../input/input.js";
import { saveTodos } from "../storage/storage.js";
import { renderItemsLeft } from "./menu/menu.js";
let draggedElement = null;

/**
 * Renders the list of todos by updating the inner HTML of the item list element.
 * Clears the current list and appends each todo item's content.
 * Also saves the current state of todos and updates the count of items left.
 *
 * @function
 */
export function renderTodos() {
  const itemListRef = document.getElementById("itemList");
  itemListRef.innerHTML = "";
  todos.forEach((item) => {
    itemListRef.innerHTML += item.content;
  });
  saveTodos();
  renderItemsLeft();
}

/**
 * Event listener for clicks on checkbox buttons.
 * When an element with the "checkboxButton" class is clicked, toggles the
 * "checkboxButtonChecked" class to visually indicate the checkbox status.
 * Then calls functions to update and save the state of the associated "todo" object.
 *
 * @event
 * @param {MouseEvent} event - The click event triggered when an element with the "checkboxButton" class is clicked.
 *
 * @function ifChecked - Checks if the Todo item is marked as "checked" and performs an associated action.
 * @function saveTodos - Saves the current state of the Todo list.
 *
 * @global
 * @property {Array<Object>} todos - A list of Todo objects, each with an `id` and a `checked` status.
 *
 * @property {number} data-id - The ID of the Todo item stored as an attribute in the parent element (`todoBox`).
 *
 */
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

/**
 * Removes all checked todos from the list and re-renders the remaining todos.
 * Iterates through the todos array in reverse order to safely remove items.
 * Calls the renderTodos function to update the UI after removal.
 */
function removeCheckedTodos() {
  for (let index = todos.length - 1; index >= 0; index--) {
    if (todos[index].checked) {
      todos.splice(index, 1);
    }
  }
  renderTodos();
}
window.removeCheckedTodos = removeCheckedTodos;

/**
 * Removes a todo item from the list based on the provided id.
 *
 * @param {number} id - The unique identifier of the todo item to be removed.
 */
function removeSelected(id) {
  for (let index = todos.length - 1; index >= 0; index--) {
    if (todos[index].id === id) {
      todos.splice(index, 1);
    }
  }
  renderTodos();
}
window.removeSelected = removeSelected;

/**
 * Updates the content of each todo item based on its checked status.
 * If a todo item is checked and does not already have the "checkboxButtonChecked" class,
 * it adds the "checkboxButtonChecked" and "todoTextAreaChecked" classes to the content.
 * If a todo item is not checked and has the "checkboxButtonChecked" class,
 * it removes the "checkboxButtonChecked" and "todoTextAreaChecked" classes from the content.
 * Finally, it calls the renderTodos function to update the UI.
 */
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

//! Drag and Drop functionality

/**
 * Handles the drag start event for a draggable element.
 *
 * @param {DragEvent} event - The drag start event object.
 */
export function dragStart(event) {
  draggedElement = event.target;
  event.dataTransfer.effectAllowed = "move";
  draggedElement.classList.add("dragging");
}
window.dragStart = dragStart;

/**
 * Handles the dragover event to allow dropping.
 *
 * @param {DragEvent} event - The dragover event object.
 */
export function dragOver(event) {
  event.preventDefault();
}
window.dragOver = dragOver;

/**
 * Handles the drop event for a draggable todo item.
 *
 * @param {DragEvent} event - The drop event triggered when a draggable element is dropped.
 * @returns {void}
 *
 * @description
 * This function prevents the default drop action, removes the "dragging" class from the dragged element,
 * and reorders the todo items based on the drop target. It updates the `todos` array and re-renders the todo list.
 *
 * @example
 * Assuming `draggedElement` is a global variable representing the currently dragged element,
 * and `todos` is an array of todo objects with `id` properties.
 *
 * document.addEventListener('drop', drop);
 */
export function drop(event) {
  event.preventDefault();
  draggedElement.classList.remove("dragging");
  const targetElement = event.target.closest(".todoBox");
  if (draggedElement !== targetElement) {
    const draggedIndex = todos.findIndex((todo) => todo.id == draggedElement.dataset.id);
    const targetIndex = todos.findIndex((todo) => todo.id == targetElement.dataset.id);
    const [movedTodo] = todos.splice(draggedIndex, 1);
    todos.splice(targetIndex, 0, movedTodo);
    renderTodos();
  }
}
window.drop = drop;
