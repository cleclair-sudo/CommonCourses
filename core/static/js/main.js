// Main utilities - keep it simple

function showNotification(msg, type = 'info') {
    // TODO: make this actually toast eventually
    console.log(`[${type.toUpperCase()}] ${msg}`);
}

// Light/dark toggle (homepage, course pages, game top bar)
const themeBtn = document.getElementById('themeToggle');
if (themeBtn) {
    const root = document.documentElement;
    const label = () => {
        themeBtn.textContent = root.dataset.theme === 'dark' ? '☀️ Switch to light mode' : '🌙 Switch to dark mode';
    };
    label();
    themeBtn.addEventListener('click', () => {
        root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
        label();
    });
}

// API stuff - pretty standard
async function fetchAPI(url, opts = {}) {
    try {
        const res = await fetch(url, {
            headers: { 'Content-Type': 'application/json', ...opts.headers },
            ...opts
        });

        if (!res.ok) throw new Error(`${res.status} error`);
        return await res.json();
    } catch (err) {
        console.error('API broke:', err);
        showNotification(err.message, 'error');
        throw err;
    }
}

// Progress tracking
async function saveProgress(courseId, moduleId) {
    return fetchAPI('/api/progress', {
        method: 'POST',
        body: JSON.stringify({ course_id: courseId, module_id: moduleId })
    });
}

async function getProgress(courseId) {
    return fetchAPI(`/api/progress/${courseId}`);
}

// Local storage - wrapped so we don't have to try/catch everywhere
function saveLocal(key, val) {
    try {
        localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
        console.warn('cant save to storage:', e);
    }
}

function getLocal(key, def = null) {
    try {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : def;
    } catch (e) {
        return def;
    }
}

function removeLocal(key) {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        // fail silently
    }
}
