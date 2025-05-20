

// dom-utils.js

function getElement(id) {
    const el = document.getElementById(id);
    if (!el) {
        console.warn(`Element with ID "${id}" not found.`);
    }
    return el;
}

function setVisibility(id, isVisible) {
    const el = getElement(id);
    if (el) {
        el.classList.toggle('hidden', !isVisible);
        el.classList.toggle('visible', isVisible);
    }
}

function setTextContent(id, text) {
    const el = getElement(id);
    if (el) {
        el.textContent = text;
    }
}

function clearChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

export {
    getElement,
    setVisibility,
    setTextContent,
    clearChildren
};