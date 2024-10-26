import { renderTodos } from "../todoList/todoList.js";

export let todos = [];
export function overwriteTodos(overwrite) {
  todos = overwrite;
}

export let idCounter = 0;
export function overwriteIdCounter(overwrite) {
  idCounter = overwrite;
}

export function renderInput() {
  const newItemRef = document.getElementById("newItem");
  newItemRef.innerHTML = renderInputTemplate();
}

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

document.addEventListener("keydown", function (event) {
  const inputRef = document.getElementById("inputFeld");
  if (event.key === "Enter" && document.activeElement === inputRef) {
    getInput();
  }
});
