/*// (function () {
//   const mobMenuCollapsed = document.getElementById('mob-menu-container');
//   const overlay = document.getElementById('menuOverlay');
//   mobMenuCollapsed.addEventListener('shown.coreui.collapse', event => {
//     overlay.classList.add('visible');
//   })
//   mobMenuCollapsed.addEventListener('hidden.coreui.collapse', event => {
//     overlay.classList.remove('visible');
//   })
// })();
//import { Collapse } from '@coreui/coreui';

(function () {
  const mobMenuCollapsed = document.getElementById('mob-menu-container');
  const overlay = document.getElementById('menuOverlay');
  const body = document.body; // Ссылка на тег body

  // Отслеживание открытия меню
  mobMenuCollapsed.addEventListener('shown.coreui.collapse', event => {
    // Изолируем всплытие: реагируем только на главный контейнер
    if (event.target !== mobMenuCollapsed) return;

    overlay.classList.add('visible');
    //body.classList.add('overflow-hidden'); // Блокируем прокрутку body
    body.style.overflow = 'hidden';
  });

  // Отслеживание закрытия меню
  mobMenuCollapsed.addEventListener('hidden.coreui.collapse', event => {
    // Изолируем всплытие: реагируем только на главный контейнер
    if (event.target !== mobMenuCollapsed) return;

    overlay.classList.remove('visible');
    //body.classList.remove('overflow-hidden'); // Возвращаем прокрутку body
    body.style.overflow = '';
  });

  // Универсальная функция закрытия меню через симуляцию клика
  function closeMenu() {
    if (overlay.classList.contains('visible')) {
      const triggerButton = document.getElementById('menuToggler');

      if (triggerButton) {
        triggerButton.click();
      }
    }
  }

  // Скрытие по клику на сам слой оверлея
  overlay.addEventListener('click', event => {
    if (event.target === overlay) {
      closeMenu();
    }
  });
})();
*/

import Collapse from '@coreui/coreui/js/src/collapse.js';

(function () {
  const mobMenuCollapsed = document.getElementById('mob-menu-container');
  const overlay = document.getElementById('menuOverlay');
  const triggerButton = document.getElementById('menuToggler');
  const body = document.body;
  if (!mobMenuCollapsed || !overlay || !triggerButton) return;

  mobMenuCollapsed.addEventListener('shown.coreui.collapse', (event) => {
    if (event.target !== mobMenuCollapsed) return;
    overlay.classList.add('visible');
    body.style.overflow = 'hidden';
    triggerButton.classList.add('burger--close');
    triggerButton.setAttribute('aria-expanded', 'true');
  });

  mobMenuCollapsed.addEventListener('hidden.coreui.collapse', (event) => {
    if (event.target !== mobMenuCollapsed) return;
    overlay.classList.remove('visible');
    body.style.overflow = '';
    triggerButton.classList.remove('burger--close');
    triggerButton.setAttribute('aria-expanded', 'false');
  });

  // Close via the Collapse API directly instead of simulating a click,
  // so behavior doesn't depend on CoreUI's internal trigger-array bookkeeping.
  function closeMenu() {
    if (!mobMenuCollapsed.classList.contains('show')) return;
    Collapse.getOrCreateInstance(mobMenuCollapsed).hide();
  }

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeMenu();
  });
})();
