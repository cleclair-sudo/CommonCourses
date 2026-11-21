# Plugin System Architecture

## Overview

The education platform now uses a **plugin system** where each course is a self-contained plugin. This makes it easy for anyone to create and add new courses without modifying the core app.

## Directory Structure

```
.
├── app.py                      # Starts the site
├── PLUGINS.md                  # Guide for creating new plugins
│
├── core/                       # BUILT-IN platform
│   ├── plugin_base.py          # Base class all plugins inherit from
│   ├── plugin_loader.py        # Finds plugins/<name>/course.py and loads it
│   ├── templates/              # base, homepage, course page
│   └── static/                 # css/js for those pages
│
└── plugins/                    # One folder per course
    ├── _template/course.py     # Copy this folder to create a new course
    ├── disabling_ai/course.py
    └── using_ai_safely/
        ├── course.py
        └── games/mayor/        # mayor.html / mayor.js / mayor.css
```

## How It Works

### 1. Plugin Discovery
When the app starts, `PluginLoader` scans `plugins/` for folders with a `course.py` (folders starting with `_` are skipped):
```python
loader = PluginLoader(os.path.join(HERE, 'plugins'))
loader.load_plugins(app)
```

### 2. Plugin Loading
For each `plugins/<name>/course.py`:
- Imports the module
- Finds all classes that inherit from `CoursePlugin`
- Instantiates them and registers the courses
- Makes a Flask blueprint for the plugin: files in `games/` are served at `/plugins/<id>/...` and every URL from `get_games()` gets a route

### 3. Course Registration
Plugins register their courses with the app:
```python
# From app.py
COURSES = loader.get_all_courses()     # Dict of course data
PLUGINS = loader.get_all_plugins()     # Dict of plugin instances
```

## Plugin Interface

Every plugin must inherit from `CoursePlugin` and implement:

```python
class CoursePlugin(ABC):
    
    @abstractmethod
    def get_id(self):
        """Return unique course ID"""
        
    @abstractmethod
    def get_name(self):
        """Return human-readable name"""
        
    @abstractmethod
    def get_course(self):
        """Return full course data structure"""
        
    # Optional hooks:
    def get_version(self):
        """Return plugin version"""
        
    def on_module_complete(self, user_id, module_id, answers):
        """Called when user completes a module"""
```

## Data Flow

```
User visits app
    ↓
app.py loads from COURSES dict
    ↓
API endpoints serve course data
    ↓
Frontend renders course
    ↓
User completes module
    ↓
plugin.on_module_complete() hook called
```

## Key Benefits

✅ **Modular**: Courses are independent, contained files
✅ **Scalable**: Add unlimited courses without touching core code
✅ **Extensible**: Plugins can override hooks for custom behavior
✅ **Community-Friendly**: Others can create and share courses
✅ **Version-able**: Each plugin tracks its own version
✅ **Discoverable**: Auto-discovery means no registration needed

## Adding a Course

1. Copy `plugins/_template/`
2. Customize the class and data
3. Save it as `plugins/<name>/course.py`
4. Restart the app - it's automatically loaded!

No configuration files needed. No registration needed. No core code changes needed.

## Extending Plugins

Plugins can do more than just serve static content:

### Example: Scoring Plugin
```python
def on_module_complete(self, user_id, module_id, answers):
    score = calculate_score(answers)
    store_score(user_id, module_id, score)
    if score > 80:
        award_badge(user_id, 'expert')
```

### Example: Analytics Plugin
```python
def on_module_complete(self, user_id, module_id, answers):
    log_to_analytics({
        'user': user_id,
        'module': module_id,
        'timestamp': datetime.now(),
        'answers': answers
    })
```

## File Structure in `get_course()`

```python
{
    'id': 'unique_id',
    'title': 'Display Title',
    'subtitle': 'Short subtitle',
    'description': 'Longer description',
    'color': '#HEX_COLOR',
    'icon': '🎓',
    'modules': [
        {
            'id': 'module_1',
            'title': 'Module Title',
            'content': 'Learning content',
            'activity_type': 'scenario',
            'question': 'The question?',
            'options': [
                {
                    'text': 'Answer',
                    'correct': True/False,
                    'explanation': 'Why?'
                }
            ]
        }
    ]
}
```

## Migration from Old System

The old system had all courses hardcoded in `app.py`:
```python
COURSES = {
    'identifying_ai': {...},
    'disabling_ai': {...},
    ...
}
```

Now each course is a separate plugin file, making the codebase much cleaner.

The API endpoints remain **exactly the same** - this is a transparent upgrade!

## Testing

```python
# Quick test
from core.plugin_loader import PluginLoader
loader = PluginLoader('plugins')
loader.load_plugins()
print(loader.get_all_courses())
```

## Future Ideas

- **Plugin marketplace**: Host and discover community plugins
- **Plugin configuration**: Allow plugins to have `.json` config files
- **Plugin dependencies**: Let plugins depend on other plugins
- **Hot reloading**: Reload plugins without restarting the app
- **Plugin ratings**: Community ratings for courses
- **Plugin statistics**: Track usage per plugin
