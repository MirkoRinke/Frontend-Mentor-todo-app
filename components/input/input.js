import { renderTodos } from "../todoList/todoList.js";

export let todos = [];
export let idCounter = 0;

/**
 * Overwrites the current list of todos with a new list.
 *
 * @param {Array} overwrite - The new list of todos to replace the current list.
 */
export function overwriteTodos(overwrite) {
  todos = overwrite;
}

/**
 * Overwrites the current value of the idCounter with the provided value.
 *
 * @param {number} overwrite - The new value to set for the idCounter.
 */
export function overwriteIdCounter(overwrite) {
  idCounter = overwrite;
}

/**
 * Renders the input element by setting its inner HTML to the input template.
 *
 * This function selects the HTML element with the ID "newItem" and updates its
 * inner HTML content using the `renderInputTemplate` function.
 */
export function renderInput() {
  const newItemRef = document.getElementById("newItem");
  newItemRef.innerHTML = renderInputTemplate();
}

/**
 * Renders the HTML template for the input component of the todo app.
 *
 * @returns {string} The HTML string for the input component.
 */
function renderInputTemplate() {
  return /*html*/ `
      <div class="todoBox">
        <div class="todoHolder">
          <button class="checkboxButton"></button>
          <input id="inputFeld" class="inputFeld" type="text" placeholder="Create a new todo…" />
        </div>
      </div>
    `;
}

/**
 * Retrieves the input value from the input field, creates a new todo item,
 * and adds it to the list of todos. If the input field is empty, the function returns without doing anything.
 *
 * @function
 * @name getInput
 * @returns {void}
 */
export function getInput() {
  const inputRef = document.getElementById("inputFeld");
  let inputValue = inputRef.value;
  if (inputValue.trim() === "") return;
  let itemId = idCounter++;
  let itemBox = /*html*/ ` 
      <div class="todoBox" data-id="${itemId}"> 
          <div class="todoHolder">
            <button class="checkboxButton"></button>
            <p class="todoTextArea">${inputValue}</p>
          </div>
          <span class="deleteButton" onclick="removeSelected(${itemId})">X</span>   
      </div>
    `;
  todos.push({ id: itemId, content: itemBox, checked: false });
  inputRef.value = "";
  renderTodos();
}

/**
 * Event listener for detecting "Enter" key presses on the input field.
 * When the "Enter" key is pressed while the specified input field is focused,
 * it triggers the `getInput` function to process the input.
 *
 * @event
 * @param {KeyboardEvent} event - The keydown event that is triggered when a key is pressed.
 *
 * @function getInput - Processes the input from the specified input field when the "Enter" key is pressed.
 *
 * @global
 * @property {HTMLElement} inputRef - Reference to the input field element with the ID "inputFeld".
 *
 */
document.addEventListener("keydown", function (event) {
  const inputRef = document.getElementById("inputFeld");
  if (event.key === "Enter" && document.activeElement === inputRef) {
    getInput();
  }
});
