# Interactive Education on CT

An interactive educational platform for teaching about AI, with a modern plugin system for easy course creation.

## Overview

This platform uses a **plugin system** where each course is a self-contained Python module. Any developer can create and add new courses without modifying the core app.

## Quick Start

### Installation

```bash
# Clone the repo
git clone https://github.com/cleclair-sudo/Interactive-Education-on-CT.git
cd Interactive-Education-on-CT

# Install dependencies
pip install -r requirements.txt

# Run the app
python app.py
```

Visit `http://localhost:5000` to see the platform.

## Creating a New Course

It's incredibly simple:

1. **Copy the template**
   ```bash
   cp -r plugins/_template plugins/my_course
   ```

2. **Customize the course**
   Edit `plugins/my_course/course.py` and replace the TODO comments with your content.

3. **Restart the app**
   The course automatically appears on the homepage!

For detailed instructions, see [QUICKSTART.md](QUICKSTART.md).

## Platform Configuration

Platform branding and theme defaults are set in `plugins/config.json`. To create it, copy `plugins/config.example.json`; if the local file is absent, the app uses the example automatically.

```bash
cp plugins/config.example.json plugins/config.json
```

`plugins/config.json` is ignored by Git, keeping local settings separate from base-code updates. Restart the app after editing it. See [CONFIG.md](CONFIG.md) for all available settings.

## Courses

Currently included:

- **Not Open To AI: Avoiding & Disabling** - Understand AI limitations and when (and how) to turn it off
- **Open to AI: Risks, Benefits, Community Impact & Self Assessment** - Resource simulator, data center city sim, and a personal AI self-assessment
- **Platform Development Basics** - Learn how the platform works and how to build, run, and share course plugins

All courses are in the `plugins/` directory.

## Plugin System

### Architecture

The platform uses an auto-discovery plugin system:

- `core/` - Built-in platform stuff (base class, loader, homepage + course page). Don't need to touch this to add a course.
- `plugins/<name>/` - One folder per course. Everything that course owns lives in there (its `course.py` plus any games).
- `app.py` - Starts the site

### Key Features

✅ **Zero Configuration** - Just drop a folder with a `course.py` in `plugins/`
✅ **Community Friendly** - Anyone can create courses
✅ **Extensible** - Plugins can add custom scoring, analytics, achievements
✅ **Modular** - Each course is independent
✅ **Documented** - Comprehensive guides included

### Documentation

- [QUICKSTART.md](QUICKSTART.md) - 30-second guide to creating your first course
- [PLUGINS.md](PLUGINS.md) - Complete plugin development reference
- [CONFIG.md](CONFIG.md) - Platform branding and theme settings
- [STARTUP.md](STARTUP.md) - Starting and running the app
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical deep dive

## Project Structure

```
.
├── app.py                      # Starts the site
├── requirements.txt
│
├── core/                       # BUILT-IN - the platform itself
│   ├── plugin_base.py          # Base class for plugins
│   ├── plugin_loader.py        # Finds + loads plugins/<name>/course.py
│   ├── templates/              # base, homepage, course page
│   └── static/                 # css/js for those pages
│
└── plugins/                    # PLUGINS - one folder per course
    ├── config.example.json     # Default platform settings
    ├── config.json             # Optional local settings (Git-ignored; copy the example)
    ├── _template/course.py     # Copy this folder to make a new course
    ├── disabling_ai/course.py
    ├── platform_development/course.py
    └── using_ai_safely/
        ├── course.py
        └── games/mayor/        # Data center city sim (html, js, css)

```

## Example Plugin

Here's what a simple course plugin looks like:

```python
from core.plugin_base import CoursePlugin

class MyCoursePlugin(CoursePlugin):
    
    def get_id(self):
        return 'my_course'
    
    def get_name(self):
        return 'My Awesome Course'
    
    def get_course(self):
        return {
            'id': 'my_course',
            'title': 'My Awesome Course',
            'subtitle': 'Learn something cool',
            'description': 'What students will learn...',
            'color': '#FF6B6B',
            'icon': '🚀',
            'modules': [
                {
                    'id': 'module_1',
                    'title': 'First Module',
                    'content': 'The content...',
                    'activity_type': 'scenario',
                    'question': 'Which is correct?',
                    'options': [
                        {'text': 'Answer 1', 'correct': True, 'explanation': 'Why'},
                        {'text': 'Answer 2', 'correct': False, 'explanation': 'Why'}
                    ]
                }
            ]
        }
```

That's it! 🎉

## Contributing

We welcome course contributions! Here's how:

1. Create a new course plugin (see [QUICKSTART.md](QUICKSTART.md))
2. Test it locally by running the app
3. Add it to `plugins/`
4. Submit a pull request

Your course will be available to everyone who uses this platform!

## API Endpoints

The platform provides REST APIs for integration:

- `GET /` - Homepage
- `GET /course/<course_id>` - View a course
- `GET /api/courses` - List all courses
- `GET /api/course/<course_id>` - Get course data
- `POST /api/progress` - Save user progress
- `GET /api/progress/<course_id>` - Get user progress

## Technologies

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **Sessions**: Flask-Session (filesystem-based)
- **Plugin System**: Custom auto-discovery loader

## Requirements

- Python 3.7+
- Flask
- Flask-Session

Install with: `pip install -r requirements.txt`

## Development

### Running Tests

```bash
# Test plugin loading
python3 -c "import app; print(f'Loaded {len(app.COURSES)} courses')"
```

### Adding a New Course

1. Copy the template: `cp -r plugins/_template plugins/your_course`
2. Edit the class and data
3. Test locally
4. Commit and push

## Troubleshooting

**Course not appearing?**
- Check the console output when the app starts
- Verify the plugin class extends `CoursePlugin`
- Ensure `get_id()`, `get_name()`, and `get_course()` are implemented
- Check for Python syntax errors

**Can't create a course?**
- Read [QUICKSTART.md](QUICKSTART.md)
- Look at existing courses in `plugins/`
- Check [PLUGINS.md](PLUGINS.md) for the complete reference

## License

MIT - Feel free to use and modify!

## Support

- 📖 Read the documentation: [QUICKSTART.md](QUICKSTART.md), [PLUGINS.md](PLUGINS.md)
- 🏗️ Understand the architecture: [ARCHITECTURE.md](ARCHITECTURE.md)
- 💬 Look at examples: `plugins/disabling_ai/course.py`
- 🚀 Start creating: `cp -r plugins/_template plugins/my_course`

Happy teaching! 🎓
