# Plugin System Documentation

This education platform uses a plugin system to load courses. Any course can be added by creating a new plugin!

## Creating a New Course Plugin

### 1. Create a Plugin Folder

Copy `plugins/_template/` to a new folder like `plugins/my_course/`. The loader picks up any `plugins/<name>/course.py` (folders starting with `_` are ignored).

```
plugins/my_course/
├── course.py          # required - the course data
└── games/             # optional - html/js/css for any games
```

Everything in `core/` is the built-in platform - you shouldn't need to touch it.

### 2. Extend CoursePlugin

```python
from core.plugin_base import CoursePlugin


class MyCoursPlugin(CoursePlugin):
    
    def get_id(self):
        """Return a unique course ID (lowercase, with underscores)"""
        return 'my_course'
    
    def get_name(self):
        """Return a human-readable plugin name"""
        return 'My Awesome Course'
    
    def get_version(self):
        """Optional: Return plugin version"""
        return '1.0.0'
    
    def get_course(self):
        """Return the full course data structure"""
        return {
            'id': 'my_course',
            'title': 'My Awesome Course',
            'subtitle': 'Learn something cool',
            'description': 'A longer description of what students will learn',
            'color': '#FF6B6B',  # Hex color for the course card
            'icon': '🚀',        # Emoji icon
            'modules': [
                {
                    'id': 'module_1',
                    'title': 'Module Title',
                    'content': 'Content/description of the module',
                    'activity_type': 'scenario',  # or 'resource_simulator'
                    'question': 'The question to ask',
                    'options': [
                        {
                            'text': 'Option 1',
                            'correct': True,
                            'explanation': 'Why this is correct'
                        },
                        {
                            'text': 'Option 2',
                            'correct': False,
                            'explanation': 'Why this is incorrect'
                        }
                    ]
                }
                # Add more modules...
            ]
        }
    
    def on_module_complete(self, user_id, module_id, answers):
        """
        Optional hook - called when a user completes a module
        Use this for custom scoring, achievements, analytics, etc.
        """
        print(f"User {user_id} completed {module_id}")
```

### 3. Activity Types

#### Scenario (Multiple Choice)
```python
{
    'id': 'module_1',
    'title': 'Module Title',
    'content': 'Content text',
    'activity_type': 'scenario',
    'question': 'The question?',
    'options': [
        {'text': 'Answer 1', 'correct': True, 'explanation': 'Why'},
        {'text': 'Answer 2', 'correct': False, 'explanation': 'Why'},
    ]
}
```

#### Resource Simulator
See `plugins/using_ai_safely/course.py` for a full example. This is for interactive simulations with resources and feedback.

#### Game (own page)
Put the game's files in `plugins/my_course/games/<game>/` and tell the loader which URL to serve:

```python
def get_games(self):
    return {'/game/my_game': 'my_game/my_game.html'}
```

The module just links to it with `'activity_type': 'game'` and `'game_url': '/game/my_game'`. Inside the html, load your own js/css with `url_for('.static', filename='my_game/my_game.js')` - the `.` means "this plugin's folder". See `plugins/using_ai_safely/games/mayor/` for the city sim.

### 4. That's It!

Once your folder is in `plugins/`, it will automatically load when the app starts. The course will appear on the homepage and be available via the API.

## Plugin Hooks

### `on_module_complete(user_id, module_id, answers)`
Called when a user finishes a module. Override to:
- Calculate scores
- Award badges/achievements
- Log analytics
- Trigger notifications
- Update leaderboards

## Best Practices

1. **Use clear IDs**: Use lowercase with underscores (e.g., `critical_thinking`, `python_basics`)
2. **Choose colors wisely**: Make sure text will be readable on your chosen background
3. **Write explanations**: Every option should have a clear explanation of why it's right/wrong
4. **Test locally**: Run the app and verify your course appears and works
5. **Keep content concise**: Each module should focus on one concept
6. **Use emojis**: Visual icons help students quickly identify courses

## Examples

See the included courses for examples:
- `plugins/disabling_ai/course.py` - Basic scenario-based course
- `plugins/disabling_ai/course.py` - Multi-module scenario course
- `plugins/using_ai_safely/course.py` - Advanced, with the data center city sim game

## Troubleshooting

If your plugin doesn't load:
1. Check the console output for error messages
2. Verify the class extends `CoursePlugin`
3. Make sure `get_id()`, `get_name()`, and `get_course()` are defined
4. Check for Python syntax errors in your plugin file

## Sharing Plugins

To share your plugin with others:
1. Put your course folder in `plugins/`
2. Commit to git: `git add plugins/your_course/`
3. Share your repository!

Others can clone the repo and your plugin will automatically load. 🚀
