// Load and display courses on the main page
// This was originally way more complicated lol

async function initializeIndex() {
    try {
        // Load config first
        const config = await fetchAPI('/api/config');
        applyConfig(config);
        
        // Then load courses
        const courses = await fetchAPI('/api/courses');
        renderCourses(courses);
    } catch (error) {
        console.error('oops, cant load courses:', error);
    }
}

function applyConfig(config) {
    if (config.project) {
        const proj = config.project;
        
        // Update page elements
        if (proj.title) {
            document.getElementById('projectTitle').textContent = proj.title;
            document.title = `${proj.title} - Pick Your Path`;
        }
        if (proj.subtitle) {
            document.getElementById('projectSubtitle').textContent = proj.subtitle;
        }
        if (proj.description) {
            document.getElementById('projectDescription').textContent = proj.description;
        }
        if (proj.hero_tip) {
            document.getElementById('heroTip').textContent = proj.hero_tip;
        }
    }
}

function renderCourses(courses) {
    const container = document.getElementById('coursesContainer');
    if (!container) return;
    
    container.innerHTML = '';
    courses.forEach((course, i) => {
        const card = buildCard(course);
        container.appendChild(card);
    });
}

function buildCard(course) {
    const div = document.createElement('div');
    div.className = 'course-card';
    div.setAttribute('data-course', course.id);
    
    // Click to go to course
    div.onclick = () => location.href = `/course/${course.id}`;
    div.style.cursor = 'pointer';

    div.innerHTML = `
        <div class="course-icon">${course.icon}</div>
        <h3>${course.title}</h3>
        <p class="course-subtitle-text">${course.subtitle}</p>
        <p class="course-description">${course.description}</p>
        <div class="course-meta">
            <span class="module-count">📚 ${course.modules_count} modules</span>
            <span class="cta-arrow">→</span>
        </div>
    `;

    return div;
}

// Go!
document.addEventListener('DOMContentLoaded', initializeIndex);
