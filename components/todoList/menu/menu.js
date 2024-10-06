import { menuRef, todos } from "../../../js/globals.js";

export function renderMenu() {
  menuRef.innerHTML = renderMenuTemplate();
}

function renderMenuTemplate() {
  return /*html*/ `
    <span id="itemsLeft" class="itemsLeft">5 items left</span>
    <div class="filterOptions">
        <span onclick="showAll()" class="filterAll">All</span>
        <span onclick="showActive()" class="filterActive">Active</span>
        <span onclick="showCompleted()" class="filterCompleted">Completed</span>
    </div>
    <span onclick="removeCheckedTodos()" class="clearCompleted">Clear Completed</span>
    `;
}

export function renderItemsLeft() {
  const itemsLeftRef = document.getElementById("itemsLeft");
  let itemsLeft = 0;
  todos.forEach((item) => {
    if (!item.checked) itemsLeft++;
  });
  itemsLeftRef.innerHTML = `${itemsLeft} items left`;
}

function showAll() {
  const itemListRef = document.getElementById("itemList");
  itemListRef.innerHTML = "";
  todos.forEach((item) => {
    itemListRef.innerHTML += item.content;
  });
}

window.showAll = showAll;

function showActive() {
  const itemListRef = document.getElementById("itemList");
  itemListRef.innerHTML = "";
  todos.forEach((item) => {
    if (!item.checked) {
      itemListRef.innerHTML += item.content;
    }
  });
}

window.showActive = showActive;

function showCompleted() {
  const itemListRef = document.getElementById("itemList");
  itemListRef.innerHTML = "";
  todos.forEach((item) => {
    if (item.checked) {
      itemListRef.innerHTML += item.content;
    }
  });
}

window.showCompleted = showCompleted;
