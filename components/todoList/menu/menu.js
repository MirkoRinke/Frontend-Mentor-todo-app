import { menuRef, todos } from "../../../js/globals.js";

let showAllActive = true;
let showActiveActive = false;
let showCompletedActive = false;

export function renderMenu() {
  menuRef.innerHTML = renderMenuTemplate();
}

function renderMenuTemplate() {
  return /*html*/ `
    <span id="itemsLeft" class="itemsLeft">5 items left</span>
    <div class="filterOptions">
        <span onclick="showAll()" class="filterAll ${showAllActive ? "active" : ""}">All</span>
        <span onclick="showActive()" class="filterActive ${showActiveActive ? "active" : ""}">Active</span>
        <span onclick="showCompleted()" class="filterCompleted ${showCompletedActive ? "active" : ""}">Completed</span>
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
  showAllActive = true;
  showActiveActive = false;
  showCompletedActive = false;
  const itemListRef = document.getElementById("itemList");
  itemListRef.innerHTML = "";
  todos.forEach((item) => {
    itemListRef.innerHTML += item.content;
  });
  renderMenu();
}

window.showAll = showAll;

function showActive() {
  showAllActive = false;
  showActiveActive = true;
  showCompletedActive = false;
  const itemListRef = document.getElementById("itemList");
  itemListRef.innerHTML = "";
  todos.forEach((item) => {
    if (!item.checked) {
      itemListRef.innerHTML += item.content;
    }
  });
  renderMenu();
}

window.showActive = showActive;

function showCompleted() {
  showAllActive = false;
  showActiveActive = false;
  showCompletedActive = true;
  const itemListRef = document.getElementById("itemList");
  itemListRef.innerHTML = "";
  todos.forEach((item) => {
    if (item.checked) {
      itemListRef.innerHTML += item.content;
    }
  });
  renderMenu();
}

window.showCompleted = showCompleted;
