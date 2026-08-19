const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('teclea-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(isDark) {
  document.body.classList.toggle('theme-dark', isDark);
  themeToggle.innerHTML = `<i class="fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}" aria-hidden="true"></i>`;
  themeToggle.setAttribute('aria-label', isDark ? 'Activar modo claro' : 'Activar modo oscuro');
  themeToggle.setAttribute('title', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
}

setTheme(savedTheme ? savedTheme === 'dark' : prefersDark);
themeToggle.addEventListener('click', () => {
  const isDark = !document.body.classList.contains('theme-dark');
  setTheme(isDark);
  localStorage.setItem('teclea-theme', isDark ? 'dark' : 'light');
});
