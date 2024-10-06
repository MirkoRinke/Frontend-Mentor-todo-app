import { overwriteTodos, overwriteIdCounter, todos, idCounter } from "../../js/globals.js";
import { renderTodos, ifChecked } from "../todoList/todoList.js";

export function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("idCounter", idCounter);
}

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
