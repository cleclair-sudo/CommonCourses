# Quick Start: Creating Your First Course Plugin

## 30-Second Overview

Each course is a Python plugin. To create one:

1. **Copy the template**
   ```bash
   cp -r plugins/_template plugins/my_course
   ```

2. **Edit the class** (replace TODO comments with your content)

3. **Restart the app** - your course appears automatically!

## Complete Example

Here's a minimal plugin for "Introduction to Coding":

```python
from core.plugin_base import CoursePlugin


class IntroToCodingPlugin(CoursePlugin):
    
    def get_id(self):
        return 'intro_to_coding'
    
    def get_name(self):
        return 'Intro to Coding'
    
    def get_course(self):
        return {
            'id': 'intro_to_coding',
            'title': 'Introduction to Coding',
            'subtitle': 'Your first steps in programming',
            'description': 'Learn the basics of programming with Python.',
            'color': '#FFD93D',
            'icon': '💻',
            'modules': [
                {
                    'id': 'variables',
                    'title': 'Variables',
                    'content': 'Variables store data. Think of them as labeled boxes.',
                    'activity_type': 'scenario',
                    'question': 'What is a variable?',
                    'options': [
                        {
                            'text': 'A container that stores data',
                            'correct': True,
                            'explanation': 'Exactly! Variables hold values we can use later.'
                        },
                        {
                            'text': 'A mathematical constant',
                            'correct': False,
                            'explanation': 'That\'s a constant, not a variable.'
                        }
                    ]
                },
                {
                    'id': 'loops',
                    'title': 'Loops',
                    'content': 'Loops repeat code multiple times.',
                    'activity_type': 'scenario',
                    'question': 'Why use a loop?',
                    'options': [
                        {
                            'text': 'To repeat code without rewriting it',
                            'correct': True,
                            'explanation': 'Loops save time and keep code clean.'
                        },
                        {
                            'text': 'To make code run faster',
                            'correct': False,
                            'explanation': 'Loops don\'t necessarily make code faster.'
                        }
                    ]
                }
            ]
        }
```

That's it! Save as `plugins/intro_to_coding/course.py` and you're done.

## Tips

✅ **Pick a good ID**: Use lowercase, underscores (`intro_to_coding`, not `Intro To Coding`)

✅ **Use clear colors**: Visit https://colorhexa.com to pick accessible colors

✅ **Write good explanations**: Students learn from why they were right/wrong

✅ **Test locally**: Run the app and visit http://localhost:5000

✅ **Keep it focused**: Each module should teach one concept

## Need Help?

- **Full guide**: Read `PLUGINS.md`
- **Architecture**: Read `ARCHITECTURE.md`  
- **Example code**: Look at `plugins/disabling_ai/course.py`
- **Error messages**: Check the console when the app starts

## Share Your Course

1. Add your plugin to `plugins/`
2. `git add plugins/your_course/`
3. Push to GitHub
4. Tell friends to clone the repo!

## What's Next?

Once you've got the basics down, you can:

- Use different activity types (resource simulator, interactive quizzes)
- Add custom scoring logic with `on_module_complete()`
- Connect to a database to track progress
- Create interactive visualizations
- Build community courses for your school/organization

Happy teaching! 🚀
