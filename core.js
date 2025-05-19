// core.js

import { logError } from './error-handler.js';
import { showSection } from './gameNavigation.js';
import { getGuestName } from './auth.js';
import * as PlayerManager from './playerManager.js';
import * as UI from './uiUpdater.js';

function initGameCore() {
    try {
        const guestName = getGuestName();
        if (guestName) {
            PlayerManager.createPlayer(guestName);
            UI.updatePlayerName(guestName);
            UI.updateScore(0);
        } else {
            showSection('authSection');
        }
    } catch (error) {
        handleError('initGameCore', error);
    }
}

function updateScore(points) {
    try {
        const updatedScore = PlayerManager.addScore(points);
        UI.updateScore(updatedScore);
    } catch (error) {
        handleError('updateScore', error);
    }
}

function resetGame() {
    try {
        PlayerManager.reset();
        UI.updatePlayerName('-');
        UI.updateScore(0);
    } catch (error) {
        handleError('resetGame', error);
    }
}

function getCurrentPlayer() {
    return PlayerManager.getCurrentPlayer();
}

function handleError(context, error) {
    console.error(`Error in ${context}:`, error);
    logError(`Error in ${context}: ${error.message}`);
}

export {
    initGameCore,
    updateScore,
    resetGame,
    getCurrentPlayer,
};
