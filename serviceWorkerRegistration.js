// serviceWorkerRegistration.js

export function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
        console.warn('Service workers are not supported in this browser.');
        return;
    }

    // Use relative path to current module for service worker URL
    const swUrl = new URL('service-worker.js', import.meta.url);

    window.addEventListener('load', () => {
        navigator.serviceWorker.register(swUrl, { updateViaCache: 'none' })
            .then(registration => {
                console.log('ServiceWorker registered with scope:', registration.scope);

                // Check if there's an update to the SW
                registration.onupdatefound = () => {
                    const installingWorker = registration.installing;
                    if (!installingWorker) return;

                    installingWorker.onstatechange = () => {
                        if (installingWorker.state === 'installed') {
                            if (navigator.serviceWorker.controller) {
                                console.log('New content is available; please refresh.');
                                // Optionally prompt user to reload here
                            } else {
                                console.log('Content is cached for offline use.');
                            }
                        }
                    };
                };

                // Periodic update check (e.g., every hour)
                setInterval(() => {
                    registration.update();
                }, 60 * 60 * 1000); // 1 hour

                // Wait until SW is active and ready
                navigator.serviceWorker.ready.then(reg => {
                    console.log('ServiceWorker is active and ready.');
                });
            })
            .catch(error => {
                console.error('ServiceWorker registration failed:', error);
            });
    });
}