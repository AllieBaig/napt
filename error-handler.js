// error-handler.js

/**
 * Optional remote logger function. Should accept an object: { message, level, timestamp, context }
 */
let remoteLogger = null;

/**
 * Configure global error handler options.
 * @param {Object} options
 * @param {function} [options.remote] - Remote logging function
 */
function configureErrorHandler({ remote } = {}) {
    if (typeof remote === 'function') {
        remoteLogger = remote;
    }
}

/**
 * Appends a message to the error log UI container.
 * @param {string} message
 * @param {Date} timestamp
 */
function appendErrorToLogUI(message, timestamp) {
    const errorLogContainer = document.getElementById('errorLog');
    if (errorLogContainer) {
        const entry = document.createElement('li');
        entry.textContent = `${timestamp.toISOString()}: ${message}`;
        errorLogContainer.appendChild(entry);
    }
}

/**
 * Logs an error locally and optionally remotely.
 * @param {string} message - The error message
 * @param {'info'|'warn'|'error'} [level='error'] - Severity level
 * @param {Object} [context] - Additional context for logging
 */
function logError(message, level = 'error', context = {}) {
    const timestamp = new Date();

    // Log to UI
    try {
        appendErrorToLogUI(message, timestamp);
    } catch (uiError) {
        console.error("Failed to append to error log UI:", uiError);
    }

    // Console
    console[level](`[${timestamp.toISOString()}] ${message}`, context);

    // Remote logger
    try {
        if (remoteLogger) {
            remoteLogger({ message, level, timestamp, context });
        }
    } catch (e) {
        console.error("Remote logger failed:", e);
    }
}

/**
 * Attaches a safe event listener with try/catch error logging.
 * @param {Element} element - The DOM element
 * @param {string} eventType - The event type (e.g., 'click')
 * @param {Function} handler - The event handler function
 * @param {string} [name='unknown'] - Identifier for debugging
 */
function attachSafeListener(element, eventType, handler, name = 'unknown') {
    if (!element) {
        logError(`Element not found for listener: ${name}`);
        return;
    }

    if (typeof handler !== 'function') {
        logError(`Handler for "${name}" is not a function`);
        return;
    }

    function wrappedHandler(event) {
        try {
            handler.call(element, event);
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            logError(`Error in ${eventType} handler for "${name}": ${message}`, 'error', { event, name });
        }
    }

    element.addEventListener(eventType, wrappedHandler);
}

export {
    configureErrorHandler,
    logError,
    attachSafeListener
};
