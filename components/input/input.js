import { overwriteIdCounter, todos, idCounter, newItemRef } from "../../js/globals.js";
import { renderTodos } from "../todoList/todoList.js";

export function renderInput() {
  newItemRef.innerHTML = renderInputTemplate();
}

function renderInputTemplate() {
  return /*html*/ `
      <div class="todoBox">
        <div class="todoHolder">
          <button class="checkboxButton"></button>
          <input id="inputFeld" class="inputFeld" type="text" placeholder="Currently typing" />
        </div>
      </div>
    `;
}

export function getInput() {
  const inputRef = document.getElementById("inputFeld");
  let inputValue = inputRef.value;
  if (inputValue.trim() === "") return;
  let itemId = idCounter; // give the todo a unique id
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
  overwriteIdCounter(idCounter + 1);
  renderTodos();
}

document.addEventListener("keydown", function (event) {
  const inputRef = document.getElementById("inputFeld");
  if (event.key === "Enter" && document.activeElement === inputRef) {
    getInput();
  }
});
