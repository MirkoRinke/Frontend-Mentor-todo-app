let darkMode = true;

/**
 * Renders the header by setting the inner HTML of the header element.
 * The header element is identified by the ID "header".
 */
export function renderHeader() {
  const headerRef = document.getElementById("header");
  headerRef.innerHTML = renderHeaderTemplate();
}

/**
 * Renders the header template for the Todo application.
 *
 * @returns {string} The HTML string for the header, including the title and theme toggle button.
 */
function renderHeaderTemplate() {
  return /*html*/ `
        <h1 class="title">Todo</h1>
        <span onclick="toggleTheme()" class="themeToggle"><img src=${darkMode ? "./assets/icons/icon-sun.svg" : "./assets/icons/icon-moon.svg"} alt="" /></span>
    `;
}

/**
 * Toggles the theme of the application between light and dark modes.
 *
 * This function switches the CSS classes on the body and content elements
 * to apply the appropriate styles for light or dark mode. It also updates
 * the `darkMode` state and re-renders the header.
 *
 * @function toggleTheme
 */
export function toggleTheme() {
  const bodyRef = document.getElementById("body");
  const contentRef = document.getElementById("content");
  bodyRef.classList.toggle("light");
  contentRef.classList.toggle("contentBackgroundLight");
  darkMode = !darkMode;
  renderHeader();
}

window.toggleTheme = toggleTheme;
