// wireframeGenerator.js

/**
 * Creates a heading element for a section title.
 * @param {string} text
 * @returns {HTMLElement}
 */
function createTitle(text) {
  const titleElem = document.createElement('h3');
  titleElem.textContent = text;
  return titleElem;
}

/**
 * Creates a list of items for a section.
 * @param {Array} items
 * @returns {HTMLElement}
 */
function createItemList(items) {
  const list = document.createElement('ul');
  items.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = String(item);
    list.appendChild(listItem);
  });
  return list;
}

/**
 * Creates a wireframe section element.
 * @param {Object} section
 * @param {string} [section.title]
 * @param {string} [section.flex='1']
 * @param {Array} [section.items]
 * @returns {HTMLElement}
 */
function createSection({ title, flex = '1', items = [] }) {
  const sectionElem = document.createElement('section');
  sectionElem.classList.add('wireframe-section');
  sectionElem.style.flex = flex;
  sectionElem.setAttribute('role', 'region');
  if (title) {
    sectionElem.setAttribute('aria-label', title);
    sectionElem.appendChild(createTitle(title));
  }
  if (Array.isArray(items) && items.length > 0) {
    sectionElem.appendChild(createItemList(items));
  }
  return sectionElem;
}

/**
 * Creates a wireframe layout inside a given container element or by ID.
 * @param {string|HTMLElement} containerOrId
 * @param {Object} layoutConfig
 * @param {Array} layoutConfig.sections
 */
function createWireframe(containerOrId, layoutConfig = { sections: [] }) {
  const container = typeof containerOrId === 'string'
    ? document.getElementById(containerOrId)
    : containerOrId;

  if (!container) {
    console.error('Wireframe container not found.');
    return;
  }

  const { sections } = layoutConfig;

  if (!Array.isArray(sections)) {
    console.error('Invalid layoutConfig: "sections" must be an array.');
    return;
  }

  container.innerHTML = '';
  const fragment = document.createDocumentFragment();

  sections.forEach(section => {
    const sectionElem = createSection(section);
    fragment.appendChild(sectionElem);
  });

  container.appendChild(fragment);
}

export { createWireframe };
