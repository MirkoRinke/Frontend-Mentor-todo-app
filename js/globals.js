export const headerRef = document.getElementById("header");
export const newItemRef = document.getElementById("newItem");
export const menuRef = document.getElementById("menu");

export let todos = []; // todos is an array of objects, each object represents a todo
export function overwriteTodos(overwrite) {
  todos = overwrite;
}

export let idCounter = 0; // idCounter is used to give each todo a unique id
export function overwriteIdCounter(overwrite) {
  idCounter = overwrite;
}
