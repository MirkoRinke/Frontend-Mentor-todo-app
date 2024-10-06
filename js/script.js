import { loadTodos } from "../components/storage/storage.js";
import { getInput } from "../components/input/input.js";
import { renderHeader } from "../components/header/header.js";
import { renderInput } from "../components/input/input.js";
import { renderMenu } from "../components/todoList/menu/menu.js";

window.getInput = getInput;

renderHeader();
renderInput();
renderMenu();
loadTodos();
