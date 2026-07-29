// =============================================================================
// Инициализация библиотеки OverlayScrollbars (кастомный скроллбар)
// Ее собственно запуск в файле блока scrollbar.exe
// При необходимости в css файле блока можно кастомизировать стили под тему
// =============================================================================

// Single entry point for all OverlayScrollbars instances and scroll-lock logic on the page.
import { OverlayScrollbars } from 'overlayscrollbars';
import 'overlayscrollbars/overlayscrollbars.scriptingenabled.css';

const DEFAULT_OPTIONS = {
  scrollbars: {
    theme: 'os-theme-dark',
    autoHide: 'scroll',
  },
};

function createScrollbar(target, options = {}) {
  if (!target) return null;

  return OverlayScrollbars(target, {
    ...DEFAULT_OPTIONS,
    ...options,
    scrollbars: {
      ...DEFAULT_OPTIONS.scrollbars,
      ...options.scrollbars,
    },
  });
}

let pageScrollbar = null;

// Counter instead of a boolean — several overlays (menu + modal, nested cases, etc.)
// can legitimately be open at the same time; we only unlock once all of them are closed.
let lockCount = 0;

export function lockPageScroll() {
  lockCount += 1;
  if (lockCount === 1) {
    pageScrollbar?.options({ overflow: { y: 'hidden' } });
  }
}

export function unlockPageScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    pageScrollbar?.options({ overflow: { y: 'scroll' } });
  }
}

// Any CoreUI modal or offcanvas on the page locks/unlocks scroll automatically —
// no per-instance JS needed, just standard CoreUI markup.
function bindCoreUiOverlays() {
  ['shown.coreui.modal', 'shown.coreui.offcanvas'].forEach((eventName) => {
    document.addEventListener(eventName, lockPageScroll);
  });
  ['hidden.coreui.modal', 'hidden.coreui.offcanvas'].forEach((eventName) => {
    document.addEventListener(eventName, unlockPageScroll);
  });
}

export function initPageScrollbar() {
  pageScrollbar = createScrollbar(document.body);
  bindCoreUiOverlays();
  return pageScrollbar;
}

export function initCustomScrollbars(options = {}) {
  const elements = document.querySelectorAll('[data-scrollbar]');
  return Array.from(elements).map((element) => createScrollbar(element, options));
}

initPageScrollbar();
initCustomScrollbars();
