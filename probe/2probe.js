// probe.js

import { attachSafeClickListener } from './error-handler.js';
import Probe from './probe/index.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Probe system initialized.');

    // Send initial device info
    Probe.trackPageLoad();

    // Attach interaction tracking
    document.querySelectorAll('[data-probe-type]').forEach((el) => {
        const type = el.dataset.probeType;
        const label = el.dataset.probeLabel || el.id || el.className || 'unknown';
        const eventId = `${type}:${label}`;

        attachSafeClickListener(el, () => {
            Probe.trackInteraction(eventId);
        }, eventId);
    });

    // Track page load performance metric
    if (performance?.timing) {
        window.addEventListener('load', () => {
            const { loadEventEnd, navigationStart } = performance.timing;
            const loadTime = loadEventEnd - navigationStart;
            Probe.trackMetric('loadTime', loadTime);
        });
    }

    // Global JS error tracking
    window.onerror = (message, source, lineno, colno, error) => {
        Probe.trackError({
            message,
            source,
            line: lineno,
            column: colno,
            stack: error?.stack || null,
        });
        return true; // Prevent default logging
    };

    // Unhandled promise rejection tracking
    window.onunhandledrejection = (event) => {
        Probe.trackError({
            message: event.reason?.message || 'Unhandled promise rejection',
            stack: event.reason?.stack || null,
        });
    };
});
