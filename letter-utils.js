

// letter-utils.js

import { ALPHABET, getRandomInt, shuffleArray } from './utils.js';

export function getRandomLetter() {
    return ALPHABET[getRandomInt(ALPHABET.length)];
}

export function generateShuffledLetters(baseWord, extraLetters = 2, options = {}) {
    if (typeof baseWord !== 'string' || baseWord.length === 0) return [];

    const baseLetters = baseWord.toUpperCase().split('');
    const letterSource = options.letterSource || getRandomLetter;
    const extras = Array.from({ length: extraLetters }, () => letterSource());

    return shuffleArray([...baseLetters, ...extras]);
}
