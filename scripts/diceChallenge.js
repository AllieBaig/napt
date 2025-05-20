// diceChallenge.js

import { getRandomElement } from './utils.js';
import { attachSafeClickListener, logError } from './error-handler.js';

// Config
const MAX_ATTEMPTS = 3;
const wordList = ['apple', 'bread', 'candy', 'delta', 'eagle', 'flame'];

// Game State
const gameState = {
    currentWord: '',
    attemptsLeft: MAX_ATTEMPTS,
    hintRevealed: false
};

// Cached DOM Elements
const elements = {
    input: document.getElementById('diceWordInput'),
    submitBtn: document.getElementById('diceSubmitBtn'),
    hintBtn: document.getElementById('revealHintBtn'),
    message: document.getElementById('diceMessage'),
    maskedWord: document.getElementById('maskedDiceWord'),
    attempts: document.getElementById('attemptsLeft')
};

// Game Control
function startDiceChallenge() {
    gameState.currentWord = getRandomElement(wordList).toLowerCase();
    gameState.attemptsLeft = MAX_ATTEMPTS;
    gameState.hintRevealed = false;

    resetUI();
    updateUI();
    setButtonsDisabled(false, false);
}

function submitDiceGuess() {
    try {
        const guess = elements.input.value.trim().toLowerCase();
        if (!guess) {
            showMessage('Please enter a guess.', 'warning');
            return;
        }

        if (guess === gameState.currentWord) {
            showMessage('Correct! You win.', 'success');
            endChallenge();
        } else {
            gameState.attemptsLeft--;
            if (gameState.attemptsLeft <= 0) {
                showMessage(`Out of attempts! The word was "${gameState.currentWord}".`, 'error');
                endChallenge();
            } else {
                showMessage('Incorrect guess. Try again.', 'warning');
                updateUI();
            }
        }
    } catch (error) {
        console.error("Error in submitDiceGuess:", error);
        logError(`submitDiceGuess failed: ${error.message}`);
    }
}

function revealHint() {
    gameState.hintRevealed = true;
    updateUI();
    elements.hintBtn.disabled = true;
}

function endChallenge() {
    setButtonsDisabled(true, true);
}

function updateUI() {
    elements.maskedWord.textContent = gameState.hintRevealed
        ? getHint(gameState.currentWord)
        : '*'.repeat(gameState.currentWord.length);

    elements.attempts.textContent = `Attempts left: ${gameState.attemptsLeft}`;
}

function resetUI() {
    if (elements.input) elements.input.value = '';
    clearMessages();
}

function setButtonsDisabled(submitDisabled, hintDisabled) {
    if (elements.submitBtn) elements.submitBtn.disabled = submitDisabled;
    if (elements.hintBtn) elements.hintBtn.disabled = hintDisabled;
}

function getHint(word) {
    if (word.length <= 2) return word[0] + '*';
    return word[0] + '*'.repeat(word.length - 2) + word[word.length - 1];
}

function showMessage(msg, type) {
    if (elements.message) {
        elements.message.textContent = msg;
        elements.message.className = type;
    }
}

function clearMessages() {
    if (elements.message) {
        elements.message.textContent = '';
        elements.message.className = '';
    }
}

export function initializeDiceChallenge() {
    if (elements.submitBtn) {
        attachSafeClickListener(elements.submitBtn, submitDiceGuess, 'diceSubmitBtn');
    } else {
        logError('Missing submit button element');
    }

    if (elements.hintBtn) {
        attachSafeClickListener(elements.hintBtn, revealHint, 'revealHintBtn');
    } else {
        logError('Missing hint button element');
    }
}

export { startDiceChallenge, initializeDiceChallenge };
