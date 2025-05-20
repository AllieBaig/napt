// game-ui.js

import { getElement, setVisibility, setTextContent, clearChildren } from './dom-utils.js';

function displayWordList(wordList, containerId) {
    const container = getElement(containerId);
    if (container && Array.isArray(wordList)) {
        clearChildren(container);
        const fragment = document.createDocumentFragment();
        wordList.forEach(word => {
            const li = document.createElement('li');
            li.textContent = word;
            fragment.appendChild(li);
        });
        container.appendChild(fragment);
    }
}

function updateTextWithLabel(label, value, elementId) {
    const element = getElement(elementId);
    if (element) {
        element.textContent = `${label}: ${value}`;
    }
}

function updateScoreDisplay(score, elementId = 'scoreDisplay') {
    updateTextWithLabel('Score', score, elementId);
}

function updateTimerDisplay(seconds, elementId = 'timerDisplay') {
    updateTextWithLabel('Time Left', `${seconds}s`, elementId);
}

function showElement(elementId) {
    setVisibility(elementId, true);
}

function hideElement(elementId) {
    setVisibility(elementId, false);
}

function setElementText(elementId, text) {
    setTextContent(elementId, text);
}

function toggleVisibility(elementId, visible) {
    setVisibility(elementId, visible);
}

export {
    displayWordList,
    updateScoreDisplay,
    updateTimerDisplay,
    showElement,
    hideElement,
    setElementText,
    toggleVisibility
};