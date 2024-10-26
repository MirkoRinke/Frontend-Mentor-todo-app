import { overwriteIdCounter, idCounter } from "../input/input.js";
import { renderTodos, ifChecked } from "../todoList/todoList.js";
import { overwriteTodos, todos } from "../input/input.js";

/**
 * Saves the current state of todos and the id counter to local storage.
 *
 * This function serializes the `todos` array and the `idCounter` variable
 * and stores them in the browser's local storage under the keys "todos"
 * and "idCounter" respectively.
 */
export function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("idCounter", idCounter);
}

/**
 * Loads todos and idCounter from localStorage, if they exist, and updates the application state accordingly.
 *
 * This function performs the following steps:
 * 1. Checks if there are todos stored in localStorage. If so, it overwrites the current todos with the stored ones.
 * 2. Checks if there is an idCounter stored in localStorage. If so, it overwrites the current idCounter with the stored one.
 * 3. Calls the ifChecked function to update the state of checkboxes.
 * 4. Calls the renderTodos function to render the todos on the UI.
 */
export function loadTodos() {
  if (JSON.parse(localStorage.getItem("todos"))) {
    overwriteTodos(JSON.parse(localStorage.getItem("todos")));
  }
  if (JSON.parse(localStorage.getItem("idCounter"))) {
    overwriteIdCounter(JSON.parse(localStorage.getItem("idCounter")));
  }
  ifChecked();
  renderTodos();
}
