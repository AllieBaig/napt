import { initializeRegularGame } from './regularGame.js';
import { initializeWordRelic } from './wordRelic.js';
import { initializeWordSafari } from './wordSafari.js';
import { initializeDiceChallenge } from './diceChallenge.js';
import { initializeWordAtlas } from './wordAtlas.js';

import './utils.js';
import './auth.js';
import './core.js';
import './debug.js';
import './error-handler.js';
import './game-logic.js';
import './game-ui.js';
import './gameNavigation.js';
import './probe.js';
import './safari-content.js';
import './service-worker.js';
import './serviceWorkerRegistration.js';
import './uiUpdates.js';
import './wireframeGenerator.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeRegularGame();
  initializeWordRelic();
  initializeWordSafari();
  initializeDiceChallenge();
  initializeWordAtlas();
});