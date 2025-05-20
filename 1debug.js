// debug.js

document.addEventListener('DOMContentLoaded', initDebugPanel);

function initDebugPanel() {
    // Prevent multiple panels
    if (document.getElementById('debugPanel')) return;

    console.log("Debugging tools loaded");

    const debugPanel = document.createElement('div');
    debugPanel.id = 'debugPanel';
    Object.assign(debugPanel.style, {
        position: 'fixed',
        bottom: '0',
        left: '0',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px',
        fontSize: '12px',
        zIndex: '9999'
    });

    const buttons = [
        createButton('Refresh Game', () => location.reload()),
        createButton('Clear Storage', () => {
            localStorage.clear();
            sessionStorage.clear();
            alert('Storage cleared. Reload the page.');
        }),
        createButton('Show Storage', showStorage),
        createButton('Close Debug Panel', () => debugPanel.remove())
    ];

    buttons.forEach(btn => debugPanel.appendChild(btn));
    document.body.appendChild(debugPanel);
}

function createButton(label, onClick) {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.onclick = onClick;
    Object.assign(btn.style, {
        marginRight: '10px',
        padding: '4px 8px',
        cursor: 'pointer'
    });
    return btn;
}

function showStorage() {
    console.log('--- LocalStorage ---');
    Object.keys(localStorage).forEach(key =>
        console.log(`${key}: ${localStorage.getItem(key)}`)
    );

    console.log('--- SessionStorage ---');
    Object.keys(sessionStorage).forEach(key =>
        console.log(`${key}: ${sessionStorage.getItem(key)}`)
    );
}
