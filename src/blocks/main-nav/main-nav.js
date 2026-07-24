import Collapse from '@coreui/coreui/js/src/collapse.js';
import { lockPageScroll, unlockPageScroll } from '../../js/index.js';

(function () {
  const overlay = document.getElementById('menuOverlay');
  const mainNav = document.getElementById('main-nav');
  const mainMenuCollapsed = document.getElementById('main-menu-container');
  if (!mainNav || !mainMenuCollapsed || !overlay) return;

  const menuItemCollapsedAll = Array.from(mainMenuCollapsed.querySelectorAll('.collapse'));
  if (!menuItemCollapsedAll.length) return;

  menuItemCollapsedAll.forEach((item) => {
    item.addEventListener('show.coreui.collapse', (event) => {
      if (event.target !== item) return;
      menuItemCollapsedAll.forEach((sibling) => {
        if (sibling === item || !sibling.classList.contains('show')) return;
        Collapse.getOrCreateInstance(sibling).hide();
      });
    });
    item.addEventListener('shown.coreui.collapse', (event) => {
      if (event.target !== item) return;
      overlay.classList.add('visible');
      lockPageScroll();
    });
    item.addEventListener('hidden.coreui.collapse', (event) => {
      if (event.target !== item) return;
      const anyStillOpen = menuItemCollapsedAll.some((el) => el.classList.contains('show'));
      if (!anyStillOpen) {
        overlay.classList.remove('visible');
        unlockPageScroll();
      }
    });
  });

  // Take full manual control over toggler clicks instead of relying on
  // CoreUI's data-coreui-toggle data-api, to avoid double-toggle if the
  // library ends up initialized more than once on the page.
  const togglers = mainNav.querySelectorAll('.main-nav__link--toggler');
  togglers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = trigger.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) return;
      Collapse.getOrCreateInstance(target).toggle();
    });
  });

  function closeMenu() {
    menuItemCollapsedAll.forEach((item) => {
      if (!item.classList.contains('show')) return;
      Collapse.getOrCreateInstance(item).hide();
    });
    overlay.classList.remove('visible');
    unlockPageScroll();
  }

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
})();
