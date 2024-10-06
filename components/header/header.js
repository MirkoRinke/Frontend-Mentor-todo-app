let darkMode = true;

export function renderHeader() {
  const headerRef = document.getElementById("header");
  headerRef.innerHTML = renderHeaderTemplate();
}

function renderHeaderTemplate() {
  return /*html*/ `
        <h1 class="title">Todo</h1>
        <span onclick="toggleTheme()" class="themeToggle"><img src=${darkMode ? "./assets/icons/icon-sun.svg" : "./assets/icons/icon-moon.svg"} alt="" /></span>
    `;
}

export function toggleTheme() {
  const bodyRef = document.getElementById("body");
  const contentRef = document.getElementById("content");
  bodyRef.classList.toggle("light");
  contentRef.classList.toggle("contentBackgroundLight");
  darkMode = !darkMode;
  renderHeader();
}

window.toggleTheme = toggleTheme;
