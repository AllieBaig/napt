// auth.js

/**
 * Generates a cryptographically strong guest ID.
 * Falls back to time-based randomness if crypto API is not available.
 */
function generateGuestId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return `guest_${crypto.randomUUID()}`;
    }
    const randomPart = Math.floor(Math.random() * 10000);
    return `guest_${Date.now()}_${randomPart}`;
}

/**
 * Retrieves the guest ID from the specified storage.
 * @param {Storage} storage - e.g., localStorage or sessionStorage
 * @returns {string|null}
 */
function getStoredGuestId(storage = localStorage) {
    return storage.getItem('guestId');
}

/**
 * Generates and stores a new guest ID in the specified storage.
 * @param {Storage} storage
 * @returns {string} The new guest ID
 */
function createAndStoreGuestId(storage = localStorage) {
    const guestId = generateGuestId();
    storage.setItem('guestId', guestId);
    return guestId;
}

/**
 * Initializes authentication by retrieving or generating a guest ID.
 * @param {Object} options
 * @param {Storage} [options.storage=localStorage]
 * @param {boolean} [options.debug=false]
 * @returns {string|null} The guest ID or null on failure
 */
function initializeAuth({ storage = localStorage, debug = false } = {}) {
    try {
        let guestId = getStoredGuestId(storage);

        if (!guestId) {
            guestId = createAndStoreGuestId(storage);
            if (debug) console.log("New guest ID assigned:", guestId);
        } else if (debug) {
            console.log("Existing guest ID found:", guestId);
        }

        return guestId;
    } catch (error) {
        console.error("Auth initialization error:", error);
        return null;
    }
}

export { initializeAuth, generateGuestId, getStoredGuestId, createAndStoreGuestId };