"""
TEMPLATE: copy this whole _template/ folder to make a new course, e.g. plugins/my_course/
(drop the underscore - folders starting with _ don't get loaded).
Then follow the TODOs.

Got a game? Put its html/js/css in plugins/my_course/games/<game>/ and list it in get_games().
"""
from core.plugin_base import CoursePlugin


class MyCoursePlugin(CoursePlugin):
    # TODO: Rename this class to something like "PythonBasicsPlugin"
    
    def get_id(self):
        # TODO: Return a unique ID (lowercase, underscores only)
        return 'my_course'
    
    def get_name(self):
        # TODO: Return the human-readable name
        return 'My Course'
    
    def get_version(self):
        # Optional: return plugin version
        return '1.0.0'

    def get_games(self):
        # Optional: {'/game/my_game': 'my_game/my_game.html'}
        # in that html, link assets with url_for('.static', filename='my_game/my_game.js')
        return {}
    
    def get_course(self):
        # TODO: Customize all the fields below
        return {
            'id': 'my_course',
            'title': 'My Course Title',
            'subtitle': 'Short subtitle here',
            'description': 'Longer description of what students will learn in this course.',
            'color': '#FF6B6B',  # TODO: Pick a hex color
            'icon': '🎓',        # TODO: Pick an emoji icon
            'modules': [
                {
                    'id': 'module_1',
                    'title': 'First Module',
                    'content': 'The content/learning material for this module.',
                    'activity_type': 'scenario',
                    'question': 'What is the question for this scenario?',
                    'options': [
                        {
                            'text': 'First option',
                            'correct': True,
                            'explanation': 'Why this option is correct.'
                        },
                        {
                            'text': 'Second option',
                            'correct': False,
                            'explanation': 'Why this option is incorrect.'
                        },
                        {
                            'text': 'Third option',
                            'correct': False,
                            'explanation': 'Another incorrect option.'
                        }
                    ]
                },
                # TODO: Add more modules here
            ]
        }
    
    def on_module_complete(self, user_id, module_id, answers):
        # Optional: Add custom logic when a user completes a module
        # Examples: scoring, achievements, logging, notifications
        pass
