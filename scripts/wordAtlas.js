

const WordAtlas = (() => {
  let currentLetter = '';

  function init() {
    determineLetter();
    getLocation();
  }

  function determineLetter() {
    const index = new Date().getDate() % 26;
    currentLetter = String.fromCharCode(65 + index);
    uiUpdates.displayLetter(currentLetter);
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleLocation, useFallbackLocation);
    } else {
      useFallbackLocation();
    }
  }

  function handleLocation({ coords }) {
    generatePrompt(coords.latitude, coords.longitude);
  }

  function useFallbackLocation() {
    const fallbackCities = ["Tokyo", "London", "Rio", "Toronto"];
    const city = fallbackCities[Math.floor(Math.random() * fallbackCities.length)];
    uiUpdates.showPrompt(`Find a word starting with "${currentLetter}" inspired by ${city}.`);
  }

  function generatePrompt(lat, lon) {
    const prompt = `Find a word starting with "${currentLetter}" from your location (${lat.toFixed(1)}, ${lon.toFixed(1)}).`;
    uiUpdates.showPrompt(prompt);
  }

  return { init };
})();

gameNavigation.registerMode("wordAtlas", WordAtlas.init);
