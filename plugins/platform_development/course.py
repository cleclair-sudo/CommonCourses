from core.plugin_base import CoursePlugin


class PlatformDevelopmentPlugin(CoursePlugin):
    def get_id(self):
        return 'platform_development'

    def get_name(self):
        return 'Platform Development Basics'

    def get_version(self):
        return '1.0.0'

    def get_course(self):
        return {
            'id': 'platform_development',
            'title': 'Platform Development Basics',
            'subtitle': 'Build and share a course plugin',
            'description': 'Learn how the platform is organized, how to create a course plugin, and how to run and share your work.',
            'color': '#356859',
            'icon': '🛠️',
            'modules': [
                {
                    'id': 'platform_tour',
                    'title': 'Get to Know the Platform',
                    'content': 'The platform separates its built-in app from course plugins. Courses live in plugins/, while plugins/config.json controls site branding and theme defaults.',
                    'activity_type': 'scenario',
                    'question': 'You want to add a new course without changing the built-in app. Where should its code go?',
                    'options': [
                        {
                            'text': 'In a new folder under plugins/, with a course.py file',
                            'correct': True,
                            'explanation': 'The plugin loader discovers course.py files in plugins/ and adds their courses to the platform.'
                        },
                        {
                            'text': 'Directly in core/',
                            'correct': False,
                            'explanation': 'core/ contains the built-in platform. Course-specific work belongs in plugins/ so it stays separate.'
                        },
                        {
                            'text': 'In plugins/config.json',
                            'correct': False,
                            'explanation': 'plugins/config.json is for platform settings such as the homepage title, theme, and app name, not course content.'
                        }
                    ]
                },
                {
                    'id': 'build_a_plugin',
                    'title': 'Build a Course Plugin',
                    'content': 'Start from plugins/_template and copy it to a new folder that does not start with an underscore. In course.py, extend CoursePlugin and provide a unique ID, a name, and course data with modules.',
                    'activity_type': 'scenario',
                    'question': 'What does a basic multiple-choice module need so learners can answer and understand the result?',
                    'options': [
                        {
                            'text': 'A title, learning content, a question, and options with correctness and explanations',
                            'correct': True,
                            'explanation': 'The course page uses the module content and question, then shows feedback from each option’s correct flag and explanation.'
                        },
                        {
                            'text': 'Only a title and an external game URL',
                            'correct': False,
                            'explanation': 'A game URL is only needed for a module that launches a separate game page. A scenario needs a question and answer options.'
                        },
                        {
                            'text': 'A change to the course page template for every new module',
                            'correct': False,
                            'explanation': 'The built-in course page renders modules from the plugin data, so ordinary courses do not need template changes.'
                        }
                    ]
                },
                {
                    'id': 'run_and_share',
                    'title': 'Run, Check, and Share',
                    'content': 'Save your plugin under plugins/<your_course>/course.py and restart the app. Find the course on the homepage, complete its modules, and check the server output if it does not load. Share the plugin folder with your project.',
                    'activity_type': 'scenario',
                    'question': 'Your plugin is saved, but the course does not appear on the homepage. What is the best first check?',
                    'options': [
                        {
                            'text': 'Confirm the folder is under plugins/, is not named with a leading underscore, and contains course.py',
                            'correct': True,
                            'explanation': 'The loader only discovers course.py in plugin folders that do not start with an underscore. The app also needs to be restarted to load the plugin.'
                        },
                        {
                            'text': 'Rename plugins/config.json to match the course ID',
                            'correct': False,
                            'explanation': 'The plugin loader does not use plugins/config.json to find courses. Check the plugin folder and file instead.'
                        },
                        {
                            'text': 'Edit core/templates/index.html to add the course by hand',
                            'correct': False,
                            'explanation': 'Loaded courses are listed automatically. Manually editing the homepage bypasses the plugin system and is not needed.'
                        }
                    ]
                }
            ]
        }
