from flask import Flask, render_template, jsonify, request, session
import os
import json
from datetime import datetime
from core.plugin_loader import PluginLoader

HERE = os.path.dirname(os.path.abspath(__file__))

# built-in pages live in core/, everything course-specific lives in plugins/<name>/
app = Flask(__name__,
            template_folder=os.path.join(HERE, 'core', 'templates'),
            static_folder=os.path.join(HERE, 'core', 'static'))
app.config['SECRET_KEY'] = 'ai-education-event-2027'
# Using flask's built-in session instead of flask-session to avoid dependency issues
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_TYPE'] = 'null'

# Load local configuration when present, otherwise use the tracked example.
config_path = os.path.join(HERE, 'plugins', 'config.json')
if not os.path.exists(config_path):
    config_path = os.path.join(HERE, 'plugins', 'config.example.json')

with open(config_path, 'r') as f:
    CONFIG = json.load(f)

# Load courses from plugins (also registers their game pages)
loader = PluginLoader(os.path.join(HERE, 'plugins'))
loader.load_plugins(app)
COURSES = loader.get_all_courses()
PLUGINS = loader.get_all_plugins()


@app.context_processor
def theme_stuff():
    t = CONFIG.get('theme', {})
    return {'theme': t.get('default', 'light'), 'show_toggle': t.get('show_toggle', True)}


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/course/<course_id>')
def course(course_id):
    if course_id not in COURSES:
        return "Course not found", 404
    
    return render_template('course.html', course=COURSES[course_id])


@app.route('/api/config')
def get_config():
    return jsonify(CONFIG)


@app.route('/api/courses')
def api_courses():
    result = []
    for cid, cdata in COURSES.items():
        result.append({
            'id': cdata['id'],
            'title': cdata['title'],
            'subtitle': cdata['subtitle'],
            'description': cdata['description'],
            'color': cdata['color'],
            'icon': cdata['icon'],
            'modules_count': len(cdata['modules'])
        })
    return jsonify(result)


@app.route('/api/course/<course_id>')
def api_course(course_id):
    if course_id not in COURSES:
        return jsonify({'error': 'nope'}), 404
    return jsonify(COURSES[course_id])


@app.route('/api/progress', methods=['POST'])
def save_progress():
    data = request.json
    
    # Init session if needed
    if 'progress' not in session:
        session['progress'] = {}
    if 'user_id' not in session:
        session['user_id'] = 'guest_' + str(datetime.now().timestamp())
    
    course = data.get('course_id')
    module = data.get('module_id')
    
    # Track completed modules per course
    if course not in session['progress']:
        session['progress'][course] = []
    
    if module not in session['progress'][course]:
        session['progress'][course].append(module)
    
    session.modified = True
    
    return jsonify({'saved': True})


@app.route('/api/progress/<course_id>')
def get_progress(course_id):
    if 'progress' not in session:
        return jsonify({})
    return jsonify({'completed': session['progress'].get(course_id, [])})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
