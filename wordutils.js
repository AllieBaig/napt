

// word-utils.js

import { normalizeWord } from './utils.js';

export function getRandomWordFromList(wordList) {
    if (!Array.isArray(wordList) || wordList.length === 0) return '';
    return wordList[Math.floor(Math.random() * wordList.length)];
}

export function isWordValid(word, validWordsSet) {
    return validWordsSet.has(normalizeWord(word));
}

export function calculateScore(word, config = { lengthBonus: 5 }) {
    if (!word || typeof word !== 'string') return 0;
    const normalized = normalizeWord(word);
    const lengthBonus = normalized.length >= 5 ? config.lengthBonus : 0;
    const uniqueLetters = new Set(normalized).size;
    return normalized.length + lengthBonus + uniqueLetters;
}
