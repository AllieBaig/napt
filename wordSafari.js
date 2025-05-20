// wordSafari.js

import { getRandomElement } from './utils.js';
import { attachSafeClickListener, logError } from './error-handler.js';
import * as uiUpdates from './uiUpdates.js';
import { getWordsForCategory, categories, wordsPerCategory } from './wordData.js';

const getEl = id => document.getElementById(id);

let currentCategoryIndex = 0;
let currentWords = [];
let submittedWords = [];

function startGame() {
    currentCategoryIndex = 0;
    submittedWords = [];
    currentWords = generateWordsForCategory(categories[currentCategoryIndex]);
    updateCategoryDisplay();
    updateSubmittedWordsDisplay();
    resetInput();
    getEl('submitSafariWordBtn').disabled = false;
    focusInput();
}

function generateWordsForCategory(category) {
    const allWords = getWordsForCategory(category);
    if (!allWords) return [];

    const shuffled = [...allWords].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, wordsPerCategory);
}

function submitWord() {
    const wordInput = getEl('wordSafariInput');
    const word = wordInput.value.trim();

    if (!word) return;

    if (!/^[a-zA-Z]+$/.test(word)) {
        uiUpdates.displayMessage("Please enter valid alphabetic characters only.", 'warning');
        return;
    }

    const lowerWord = word.toLowerCase();
    const lowerCurrentSet = new Set(currentWords.map(w => w.toLowerCase()));
    const lowerSubmittedSet = new Set(submittedWords.map(w => w.toLowerCase()));

    if (!lowerCurrentSet.has(lowerWord)) {
        uiUpdates.displayMessage("That word isn’t in the list.", 'warning');
    } else if (lowerSubmittedSet.has(lowerWord)) {
        uiUpdates.displayMessage("You already submitted that word.", 'info');
    } else {
        submittedWords.push(word);
        updateSubmittedWordsDisplay();
        resetInput();
        focusInput();

        if (submittedWords.length === currentWords.length) {
            endCategory();
        }
    }
}

function endCategory() {
    if (currentCategoryIndex < categories.length - 1) {
        currentCategoryIndex++;
        currentWords = generateWordsForCategory(categories[currentCategoryIndex]);
        submittedWords = [];
        updateCategoryDisplay();
        updateSubmittedWordsDisplay();
        resetInput();
        focusInput();
    } else {
        endGame();
    }
}

function endGame() {
    getEl('wordSafariArea').style.display = 'none';
    console.log("Word Safari Ended! Submitted words:", submittedWords);
    uiUpdates.displayMessage("Word Safari Ended!", 'success');
}

function updateCategoryDisplay() {
    const categoryDisplay = getEl('currentSafariCategory');
    if (categoryDisplay) {
        categoryDisplay.textContent = `Category: ${categories[currentCategoryIndex]}`;
    }
}

function updateSubmittedWordsDisplay() {
    const listEl = getEl('submittedSafariWords');
    if (listEl) {
        listEl.innerHTML = submittedWords.map(word => `<li>${word}</li>`).join('');
    }
}

function resetInput() {
    const inputEl = getEl('wordSafariInput');
    if (inputEl) inputEl.value = '';
}

function focusInput() {
    const inputEl = getEl('wordSafariInput');
    if (inputEl) inputEl.focus();
}

function initializeWordSafari() {
    const button = getEl('submitSafariWordBtn');
    if (button) {
        attachSafeClickListener(button, submitWord, 'submitSafariWordBtn');
    }

    const inputEl = getEl('wordSafariInput');
    if (inputEl) {
        inputEl.addEventListener('keypress', e => {
            if (e.key === 'Enter') submitWord();
        });
    }
}

export { startGame, initializeWordSafari, submitWord };
