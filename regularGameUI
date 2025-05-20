// regularGameUI.js

export function getPlayerNames() {
    const name1 = document.getElementById('player1Name').value.trim();
    const name2Input = document.getElementById('player2Name');
    const isComputer = document.getElementById('playWithComputer').checked;
    const name2 = isComputer ? 'Computer' : name2Input.value.trim();

    if (!name1 || (!isComputer && !name2)) {
        return null;
    }
    return { playerNames: [name1, name2], isComputer };
}

export function showGameScreen(playerNames) {
    document.getElementById('regularGameSetup').style.display = 'none';
    document.getElementById('regularGamePlay').style.display = 'block';
    document.getElementById('regularPlayer1Display').textContent = playerNames[0];
    document.getElementById('regularPlayer2Display').textContent = playerNames[1];
}

export function displayNewWord(word) {
    document.getElementById('regularChallengeWord').textContent = word;
    document.getElementById('regularAnswer').value = '';
    document.getElementById('regularAnswer').focus();
}

export function updateScoreDisplay(scoreString) {
    document.getElementById('regularScoreDisplay').textContent = scoreString;
}

export function showMessage(msg) {
    // Replace with better UI in real use
    alert(msg);
}

export function getUserAnswer() {
    return document.getElementById('regularAnswer').value;
}
