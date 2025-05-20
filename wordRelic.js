// wordRelic.js

import { getRandomElement } from './utils.js';
import { attachSafeClickListener, logError } from './error-handler.js';

// ====== Constants ======
const dailyRelics = [
    {
        word: "watch",
        category: "Thing",
        clue: "I’m something you wear, but I’m not clothing. I measure your moments.",
        lore: "This relic was used by the Timekeepers of Aralon.",
        pronunciation: "watch.mp3",
        definition: "A small timepiece worn typically on a strap on one's wrist.",
        rarity: "common"
    },
    {
        word: "maple",
        category: "Thing",
        clue: "I have leaves that change color in the fall, and my syrup is sweet.",
        lore: "The ancient scrolls speak of the Great Maple of Eldoria, a source of wisdom.",
        pronunciation: "maple.mp3",
        definition: "A deciduous tree with lobed leaves and winged fruits, known for its syrup.",
        rarity: "common"
    },
    // Add more relics...
];

// ====== State ======
let currentRelic = null;
let hasGuessedCategory = false;

// ====== Cached DOM References ======
const DOMRefs = {
    relicClue: document.getElementById('relicClue'),
    categoryGuessArea: document.getElementById('categoryGuessArea'),
    wordGuessInput: document.getElementById('wordGuess'),
    restoreButton: document.getElementById('restoreRelicBtn'),
    relicInfoArea: document.getElementById('relicInfo'),
    selectedCategory: document.getElementById('selectedCategory'),
    findRelicButton: document.getElementById('findRelicBtn')
};

// ====== Utility Functions ======
function getRandomRelic() {
    return getRandomElement(dailyRelics);
}

function renderRelicInfo(relic) {
    const bonusMap = { rare: 20, uncommon: 10, common: 0 };
    const bonusPoints = bonusMap[relic.rarity] || 0;

    return `
        <h3>Relic Restored!</h3>
        <p><strong>Word:</strong> ${relic.word}</p>
        <p><strong>Category:</strong> ${relic.category}</p>
        <p><strong>Definition:</strong> ${relic.definition}</p>
        <p><strong>Lore:</strong> ${relic.lore}</p>
        <button type="button" class="pronounce-btn" aria-label="Play pronunciation for ${relic.word}">Pronounce</button>
        <p><strong>Rarity:</strong> ${relic.rarity}</p>
        <p><strong>Bonus Points:</strong> +${bonusPoints}</p>
    `;
}

function resetGameUI() {
    if (DOMRefs.relicClue) DOMRefs.relicClue.textContent = currentRelic.clue;
    if (DOMRefs.categoryGuessArea) DOMRefs.categoryGuessArea.style.display = 'block';
    if (DOMRefs.wordGuessInput) {
        DOMRefs.wordGuessInput.value = '';
        DOMRefs.wordGuessInput.disabled = false;
    }
    if (DOMRefs.restoreButton) DOMRefs.restoreButton.disabled = true;
    if (DOMRefs.relicInfoArea) {
        DOMRefs.relicInfoArea.innerHTML = '';
        DOMRefs.relicInfoArea.style.display = 'none';
    }
    if (DOMRefs.selectedCategory) {
        DOMRefs.selectedCategory.textContent = '';
        DOMRefs.selectedCategory.dataset.category = '';
    }
}

// ====== Core Game Functions ======
function displayRelicClue() {
    try {
        currentRelic = getRandomRelic();
        hasGuessedCategory = false;
        resetGameUI();
    } catch (error) {
        console.error("Error displaying relic clue:", error);
        logError(`Error displaying relic clue: ${error.message}`);
    }
}

function selectCategory(category) {
    try {
        if (currentRelic && !hasGuessedCategory) {
            hasGuessedCategory = true;
            if (DOMRefs.selectedCategory) {
                DOMRefs.selectedCategory.textContent = `Category Guess: ${category}`;
                DOMRefs.selectedCategory.dataset.category = category;
            }
            if (DOMRefs.restoreButton) {
                DOMRefs.restoreButton.disabled = false;
            }
        }
    } catch (error) {
        console.error(`Error selecting category "${category}":`, error);
        logError(`Error selecting category "${category}": ${error.message}`);
    }
}

function restoreRelic() {
    try {
        if (!hasGuessedCategory) {
            alert("Please select a category before trying to restore the relic.");
            return;
        }

        const guessedWord = DOMRefs.wordGuessInput.value.trim().toLowerCase();
        const guessedCategory = DOMRefs.selectedCategory.dataset.category;

        if (
            guessedWord === currentRelic.word.toLowerCase() &&
            guessedCategory === currentRelic.category
        ) {
            DOMRefs.relicInfoArea.innerHTML = renderRelicInfo(currentRelic);
            DOMRefs.relicInfoArea.style.display = 'block';

            DOMRefs.categoryGuessArea.style.display = 'none';
            DOMRefs.wordGuessInput.disabled = true;
            DOMRefs.restoreButton.disabled = true;

            // Attach event listener to pronunciation button
            const pronounceBtn = DOMRefs.relicInfoArea.querySelector('.pronounce-btn');
            if (pronounceBtn) {
                pronounceBtn.addEventListener('click', () => {
                    playPronunciation(currentRelic.pronunciation);
                });
            }

        } else {
            DOMRefs.relicInfoArea.innerHTML = `<p style="color: red;" aria-live="polite">Incorrect guess! Try again tomorrow for a new relic.</p>`;
            DOMRefs.relicInfoArea.style.display = 'block';
        }
    } catch (error) {
        console.error("Error restoring relic:", error);
        logError(`Error restoring relic: ${error.message}`);
    }
}

// ====== Audio Playback ======
function playPronunciation(audioFile) {
    const audio = new Audio(`./audio/${audioFile}`);
    audio.play().catch(err => {
        console.error("Failed to play audio:", err);
        logError(`Audio playback error: ${err.message}`);
    });
}

// ====== Initialization ======
function initializeWordRelic() {
    if (DOMRefs.findRelicButton) {
        attachSafeClickListener(DOMRefs.findRelicButton, displayRelicClue, 'findRelicBtn');
    }

    const categoryButtons = DOMRefs.categoryGuessArea.querySelectorAll('button[data-category]');
    categoryButtons.forEach(button => {
        const category = button.dataset.category;
        attachSafeClickListener(button, () => {
            selectCategory(category);
        }, `categoryButton-${category}`);
    });

    if (DOMRefs.restoreButton) {
        attachSafeClickListener(DOMRefs.restoreButton, restoreRelic, 'restoreRelicBtn');
    }
}

export { initializeWordRelic, displayRelicClue, selectCategory, restoreRelic };
