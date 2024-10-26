import { todos } from "../../input/input.js";

let showAllActive = true;
let showActiveActive = false;
let showCompletedActive = false;

/**
 * Renders the menu by setting the inner HTML of the element with the ID "menu".
 * Utilizes the `renderMenuTemplate` function to generate the HTML content.
 */
export function renderMenu() {
  const menuRef = document.getElementById("menu");
  menuRef.innerHTML = renderMenuTemplate();
}

/**
 * Generates the HTML template for the todo list menu.
 *
 * The template includes:
 * - A span showing the number of items left.
 * - Filter options to show all, active, or completed todos.
 * - An option to clear completed todos.
 *
 * @returns {string} The HTML template for the todo list menu.
 */
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

/**
 * Renders the mobile menu by updating the inner HTML of the element with the ID "menuMobile".
 * This function relies on the `renderMenuMobileTemplate` function to generate the HTML content.
 */
export function renderMenuMobile() {
  const menuMobileRef = document.getElementById("menuMobile");
  menuMobileRef.innerHTML = renderMenuMobileTemplate();
}

/**
 * Renders the mobile menu template for the todo list filter options.
 *
 * This function returns an HTML string that includes three filter options:
 * - "All": Shows all todo items.
 * - "Active": Shows only active todo items.
 * - "Completed": Shows only completed todo items.
 *
 * Each filter option has an `onclick` event handler that triggers the corresponding
 * filter function (`showAll`, `showActive`, `showCompleted`). The active filter option
 * is highlighted with the "active" class.
 *
 * @returns {string} The HTML string for the mobile menu template.
 */
function renderMenuMobileTemplate() {
  return /*html*/ `
      <div class="filterOptionsMobile">
          <span onclick="showAll()" class="filterAll ${showAllActive ? "active" : ""}">All</span>
          <span onclick="showActive()" class="filterActive ${showActiveActive ? "active" : ""}">Active</span>
          <span onclick="showCompleted()" class="filterCompleted ${showCompletedActive ? "active" : ""}">Completed</span>
      </div>
      `;
}

/**
 * Updates the DOM element with the ID "itemsLeft" to display the number of unchecked todo items.
 * Iterates through the global `todos` array and counts the items that are not checked.
 * The count is then displayed in the "itemsLeft" element.
 */
export function renderItemsLeft() {
  const itemsLeftRef = document.getElementById("itemsLeft");
  let itemsLeft = 0;
  todos.forEach((item) => {
    if (!item.checked) itemsLeft++;
  });
  itemsLeftRef.innerHTML = `${itemsLeft} items left`;
}

/**
 * Displays all todo items by setting the appropriate flags and updating the item list.
 *
 * This function sets the `showAllActive` flag to true and the `showActiveActive` and
 * `showCompletedActive` flags to false. It then clears the current item list and
 * iterates over the `todos` array, appending each item's content to the item list.
 * Finally, it calls `renderMenu` and `renderMenuMobile` to update the menu display.
 */
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
  renderMenuMobile();
}

window.showAll = showAll;

/**
 * Filters and displays only the active (unchecked) todo items.
 *
 * This function clears the current list of todo items and then iterates
 * through the `todos` array, appending only the items that are not checked
 * to the `itemListRef` element. It also updates the state variables to
 * reflect that the active filter is applied and re-renders the menu.
 */
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
  renderMenuMobile();
}

window.showActive = showActive;

/**
 * Filters and displays only the completed todo items in the list.
 *
 * This function sets the state to show only completed items by updating
 * the `showAllActive`, `showActiveActive`, and `showCompletedActive` flags.
 * It then clears the current list and iterates through the `todos` array,
 * appending the content of each completed item to the `itemListRef` element.
 * Finally, it calls `renderMenu` and `renderMenuMobile` to update the menu UI.
 */
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
  renderMenuMobile();
}

window.showCompleted = showCompleted;
