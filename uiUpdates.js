// uiUpdates.js

let hideMessageTimeout = null;

/**
 * Displays a temporary message to the user.
 * 
 * @param {string} message - The message to display.
 * @param {string} [type='info'] - Type of message: 'info', 'success', 'warning', 'error'.
 * @param {number} [duration=3000] - Duration (ms) to show the message.
 */
function displayMessage(message, type = 'info', duration = 3000) {
  const container = document.getElementById('messageContainer');
  if (!container) {
    console.warn('displayMessage: #messageContainer not found.');
    return;
  }

  container.textContent = message;

  // Preserve non-message classes
  const baseClasses = Array.from(container.classList).filter(c => !c.startsWith('message-'));
  container.className = [...baseClasses, 'message', `message-${type}`, 'visible'].join(' ');

  // Clear any existing timeout to prevent overlap
  if (hideMessageTimeout) clearTimeout(hideMessageTimeout);
  hideMessageTimeout = setTimeout(() => {
    container.classList.remove('visible');
  }, duration);
}

/**
 * Temporarily highlights a DOM element.
 * 
 * @param {string} elementId - ID of the element to highlight.
 * @param {string} [highlightClass='highlight'] - CSS class to apply.
 * @param {number} [duration=1000] - Duration (ms) to keep highlight.
 */
function highlightElementTemporarily(elementId, highlightClass = 'highlight', duration = 1000) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`highlightElementTemporarily: Element #${elementId} not found.`);
    return;
  }

  element.classList.add(highlightClass);
  setTimeout(() => {
    element.classList.remove(highlightClass);
  }, duration);
}

export { displayMessage, highlightElementTemporarily };