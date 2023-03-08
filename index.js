// eslint-disable-next-line import/extensions
import { DateTime } from './node_modules/luxon/src/luxon.js';

// eslint-disable-next-line import/extensions
import Book from './modules/book.js';

Book.updateDisplay();
Book.addBook();

const links = document.querySelectorAll('.nav-link');
links.forEach((link) => {
  link.addEventListener('click', (e) => {
    const sectionId = link.getAttribute('href');
    const section = document.querySelector(sectionId);
    document.querySelectorAll('section').forEach((s) => {
      if (s !== section) {
        s.style.display = 'none';
      }
    });
    section.style.display = 'block';
    e.preventDefault();
  });
});

const activeNavItem = document.querySelector('.nav-link.active');
const sectionId = activeNavItem.getAttribute('href');
const section = document.querySelector(sectionId);
document.querySelectorAll('section').forEach((s) => {
  if (s !== section) {
    s.style.display = 'none';
  }
});
section.style.display = 'block';
function updateTime() {
  const date = document.getElementById('time');
  const time = DateTime.local().toLocaleString(
    // eslint-disable-next-line comma-dangle
    DateTime.DATETIME_MED_WITH_SECONDS
  );
  date.innerHTML = time;
}

setInterval(updateTime, 1000);

export default 'index.js';
