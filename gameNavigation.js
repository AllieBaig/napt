// gameNavigation.js

// Configuration: mapping of game modes to their respective DOM element IDs
const gameAreas = {
    regular: 'regularGameArea',
    diceChallenge: 'diceChallengeArea',
    wordSafari: 'wordSafariArea'
};

// Internal state to track the current active mode
let currentMode = 'regular';

/**
 * Switches to the specified game mode by updating DOM visibility.
 * @param {string} mode - The game mode to activate (e.g., 'regular', 'diceChallenge', 'wordSafari')
 */
function switchToMode(mode) {
    if (!gameAreas.hasOwnProperty(mode)) {
        console.warn(`Unknown game mode: ${mode}`);
        return;
    }

    Object.entries(gameAreas).forEach(([key, id]) => {
        const area = document.getElementById(id);
        if (area) {
            area.style.display = key === mode ? 'block' : 'none';
        }
    });

    currentMode = mode;
}

/**
 * Gets the currently active game mode.
 * @returns {string} - The current game mode (e.g., 'regular', 'diceChallenge', 'wordSafari')
 */
function getActiveGameMode() {
    return currentMode;
}

// Optional: Mode-specific helper functions (can be removed if unused elsewhere)
function switchToRegularGame() {
    switchToMode('regular');
}

function switchToDiceChallenge() {
    switchToMode('diceChallenge');
}

function switchToWordSafari() {
    switchToMode('wordSafari');
}

export {
    switchToMode,
    getActiveGameMode,
    switchToRegularGame,
    switchToDiceChallenge,
    switchToWordSafari
};
