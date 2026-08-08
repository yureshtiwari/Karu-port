const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}
