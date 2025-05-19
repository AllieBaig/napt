// uiUpdater.js

let playerDisplay = null;
let scoreDisplay = null;

function cacheElements() {
    playerDisplay = playerDisplay || document.getElementById('playerNameDisplay');
    scoreDisplay = scoreDisplay || document.getElementById('scoreDisplay');
}

export function updatePlayerName(name) {
    cacheElements();
    if (playerDisplay) playerDisplay.textContent = `Player: ${name}`;
}

export function updateScore(score) {
    cacheElements();
    if (scoreDisplay) scoreDisplay.textContent = `Score: ${score}`;
}
