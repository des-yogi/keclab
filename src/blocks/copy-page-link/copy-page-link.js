(function () {
  'use strict';

  var BUTTON_ID = 'currentPageLink';
  var MESSAGE_SELECTOR = '.download-panel__descr--warning';
  var VISIBLE_CLASS = 'download-panel__descr--visible';
  var MESSAGE_DURATION = 2200; // ms, how long the message stays visible

  // Copy text using Clipboard API
  function copyTextToClipboard(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      return navigator.clipboard.writeText(text);
    }
    return Promise.reject(new Error('Clipboard API is not available'));
  }

  // Write message into the button's descr element and toggle visibility
  function showMessage(button, text) {
    var messageEl = button.querySelector(MESSAGE_SELECTOR);
    if (!messageEl) return;

    if (messageEl._hideTimer) {
      clearTimeout(messageEl._hideTimer);
    }

    messageEl.textContent = text;
    messageEl.classList.add(VISIBLE_CLASS);

    messageEl._hideTimer = setTimeout(function () {
      messageEl.classList.remove(VISIBLE_CLASS);
      messageEl._hideTimer = null;
    }, MESSAGE_DURATION);
  }

  function handleClick(button) {
    var successMessage = button.getAttribute('data-success') || 'Link copied';
    var errorMessage = button.getAttribute('data-error') || 'Failed to copy link';

    return function (e) {
      e.preventDefault();

      copyTextToClipboard(window.location.href)
        .then(function () {
          showMessage(button, successMessage);
        })
        .catch(function (err) {
          console.error('Copy failed:', err);
          showMessage(button, errorMessage);
        });
    };
  }

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById(BUTTON_ID);
    if (button) {
      button.addEventListener('click', handleClick(button));
    }
  });
})();
