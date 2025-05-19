// playerManager.js

let currentPlayer = null;

export function createPlayer(name) {
    currentPlayer = { name, score: 0 };
}

export function addScore(points) {
    if (!currentPlayer) throw new Error('No player initialized.');
    currentPlayer.score += points;
    return currentPlayer.score;
}

export function getCurrentPlayer() {
    return currentPlayer;
}

export function reset() {
    currentPlayer = null;
}
