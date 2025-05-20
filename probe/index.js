// probe/index.js

import { logError } from '../error-handler.js';

const PROBE_ENDPOINT = '/api/probe'; // Replace with actual endpoint

const Probe = (() => {
    const send = async (payload) => {
        try {
            console.log('Sending probe data:', payload);
            await fetch(PROBE_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
        } catch (error) {
            console.error('Probe send failed:', error);
            logError(`Probe send failed: ${error.message}`);
        }
    };

    const collectDeviceInfo = () => ({
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screenWidth: screen.width,
        screenHeight: screen.height,
        devicePixelRatio: window.devicePixelRatio || 1,
    });

    const trackInteraction = (elementName) => {
        send({
            event: 'userInteraction',
            data: {
                type: 'click',
                element: elementName,
                timestamp: new Date().toISOString(),
            },
        });
    };

    const trackError = (errorData) => {
        send({
            event: 'clientError',
            data: {
                ...errorData,
                timestamp: new Date().toISOString(),
            },
        });
    };

    const trackMetric = (metric, value) => {
        send({
            metric,
            value,
            timestamp: new Date().toISOString(),
        });
    };

    const trackPageLoad = () => {
        send({
            event: 'pageLoad',
            data: collectDeviceInfo(),
        });
    };

    return {
        send,
        trackInteraction,
        trackError,
        trackMetric,
        trackPageLoad,
    };
})();

export default Probe;
