

// Game.js

export class Game {
    constructor(playerNames = [], isComputer = false) {
        this.players = playerNames.map(name => ({ name, score: 0 }));
        this.currentTurn = 0;
        this.isComputer = isComputer;
        this.words = ['apple', 'banana', 'cat', 'dog', 'elephant', 'flower', 'grape', 'hat'];
    }

    getCurrentPlayer() {
        return this.players[this.currentTurn];
    }

    getCurrentPlayerIndex() {
        return this.currentTurn;
    }

    nextTurn() {
        this.currentTurn = (this.currentTurn + 1) % this.players.length;
    }

    getRandomWord() {
        const index = Math.floor(Math.random() * this.words.length);
        return this.words[index];
    }

    submitAnswer(answer, originalWord) {
        const isCorrect = answer.trim().toLowerCase() === originalWord.toLowerCase();
        if (isCorrect) {
            this.players[this.currentTurn].score += 1;
        }
        return isCorrect;
    }

    getScoreDisplay() {
        return this.players.map(p => `${p.name}: ${p.score}`).join(' | ');
    }

    isComputerTurn() {
        return this.isComputer && this.currentTurn === 1;
    }

    simulateComputerGuess(correctAnswer) {
        const correct = Math.random() > 0.4;
        if (correct) this.players[this.currentTurn].score += 1;
        return correct;
    }
}


