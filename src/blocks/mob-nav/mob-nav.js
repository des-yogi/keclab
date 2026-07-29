import Collapse from '@coreui/coreui/js/src/collapse.js';
import { lockPageScroll, unlockPageScroll } from '../scrollbar/scrollbar.js';

(function () {
  const mobMenuCollapsed = document.getElementById('mob-menu-container');
  const overlay = document.getElementById('menuOverlay');
  const triggerButton = document.getElementById('menuToggler');
  if (!mobMenuCollapsed || !overlay || !triggerButton) return;

  mobMenuCollapsed.addEventListener('shown.coreui.collapse', (event) => {
    if (event.target !== mobMenuCollapsed) return;
    overlay.classList.add('visible');
    lockPageScroll();
    triggerButton.classList.add('burger--close');
    triggerButton.setAttribute('aria-expanded', 'true');
  });

  mobMenuCollapsed.addEventListener('hidden.coreui.collapse', (event) => {
    if (event.target !== mobMenuCollapsed) return;
    overlay.classList.remove('visible');
    unlockPageScroll();
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
