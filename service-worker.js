// service-worker.js

const CACHE_NAME = 'game-cache-v2';
const OFFLINE_URL = '/offline.html';

const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/game-ui.js',
    '/game-logic.js',
    '/regularGame.js',
    '/diceChallenge.js',
    '/wordSafari.js',
    '/wordRelic.js',
    '/safari-content.js',
    '/utils.js',
    '/auth.js',
    '/core.js',
    '/error-handler.js',
    '/uiUpdates.js',
    '/manifest.json',
    '/images/icon-192.png',
    '/images/icon-512.png',
    OFFLINE_URL
];

// Helper function to cache core files
async function cacheAppShell() {
    const cache = await caches.open(CACHE_NAME);
    console.log('[ServiceWorker] Caching app shell');
    await cache.addAll(urlsToCache);
}

// Helper to remove old caches
async function clearOldCaches() {
    const cacheNames = await caches.keys();
    await Promise.all(
        cacheNames.map(name => {
            if (name !== CACHE_NAME) {
                console.log('[ServiceWorker] Removing old cache:', name);
                return caches.delete(name);
            }
        })
    );
}

// Install: Cache app shell
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        await cacheAppShell();
        self.skipWaiting();
    })());
});

// Activate: Clean up old caches, enable navigation preload
self.addEventListener('activate', event => {
    event.waitUntil((async () => {
        await clearOldCaches();
        if ('navigationPreload' in self.registration) {
            await self.registration.navigationPreload.enable();
        }
        self.clients.claim();
    })());
});

// Fetch: Serve cache first, then update from network if possible
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;

    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(event.request);

        const fetchPromise = fetch(event.request).then(networkResponse => {
            // Update cache for future use
            if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
        }).catch(async () => {
            // If offline and request is a navigation, show fallback
            if (event.request.mode === 'navigate') {
                return await cache.match(OFFLINE_URL);
            }
            return cachedResponse;
        });

        // Serve cached if available, otherwise wait for network
        return cachedResponse || fetchPromise;
    })());
});


