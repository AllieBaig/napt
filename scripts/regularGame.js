// regularGame.js

import { Game } from './Game.js';
import * as UI from './regularGameUI.js';
import { attachSafeClickListener, logError } from './error-handler.js';

let currentGame;
let currentWord;

function startRegularGame() {
    try {
        const setup = UI.getPlayerNames();
        if (!setup) {
            UI.showMessage('Please enter names for both players.');
            return;
        }

        currentGame = new Game(setup.playerNames, setup.isComputer);
        UI.showGameScreen(setup.playerNames);
        nextChallenge();
    } catch (err) {
        logError(`Failed to start game: ${err.message}`);
    }
}

function nextChallenge() {
    currentWord = currentGame.getRandomWord();
    UI.displayNewWord(currentWord);
}

function handleAnswerSubmission() {
    try {
        const answer = UI.getUserAnswer();
        const isCorrect = currentGame.submitAnswer(answer, currentWord);
        const player = currentGame.getCurrentPlayer();

        UI.showMessage(isCorrect
            ? `${player.name} guessed correctly!`
            : `${player.name} guessed incorrectly!`);

        UI.updateScoreDisplay(currentGame.getScoreDisplay());

        if (currentGame.isComputerTurn()) {
            currentGame.nextTurn();
            setTimeout(() => {
                handleComputerTurn();
            }, 1000);
        } else {
            currentGame.nextTurn();
            nextChallenge();
        }
    } catch (err) {
        logError(`Error submitting answer: ${err.message}`);
    }
}

function handleComputerTurn() {
    try {
        const correct = currentGame.simulateComputerGuess(currentWord);
        UI.showMessage(correct
            ? 'Computer guessed correctly!'
            : 'Computer guessed incorrectly!');

        UI.updateScoreDisplay(currentGame.getScoreDisplay());

        currentGame.nextTurn();
        nextChallenge();
    } catch (err) {
        logError(`Computer turn failed: ${err.message}`);
    }
}

export function initializeRegularGame() {
    attachSafeClickListener(
        document.getElementById('startRegularGameBtn'),
        startRegularGame,
        'startRegularGameBtn'
    );
    attachSafeClickListener(
        document.getElementById('submitRegularAnswerBtn'),
        handleAnswerSubmission,
        'submitRegularAnswerBtn'
    );
}

export { initializeRegularGame };
