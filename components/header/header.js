export function renderHeader() {
  const headerRef = document.getElementById("header");
  headerRef.innerHTML = renderHeaderTemplate();
}

function renderHeaderTemplate() {
  return /*html*/ `
        <h1 class="title">Todo</h1>
        <span class="themeToggle"><img src="./assets/icons/icon-sun.svg" alt="" /></span>
    `;
}
