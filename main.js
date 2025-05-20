

import { initializeWordRelic } from './wordRelic.js';
import { initializeWordSafari } from './wordSafari.js';
import { initializeDiceChallenge } from './diceChallenge.js';
import { initializeRegularGame } from './regularGame.js';
import { initializeWordAtlas } from './wordAtlas.js';
import { setupNavigation } from './gameNavigation.js';

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  initializeWordRelic();
  initializeWordSafari();
  initializeDiceChallenge();
  initializeRegularGame();
  initializeWordAtlas?.(); // Safely optional
});

