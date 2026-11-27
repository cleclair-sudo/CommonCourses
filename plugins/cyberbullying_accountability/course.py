from core.plugin_base import CoursePlugin


class CyberbullyingAccountabilityPlugin(CoursePlugin):
    def get_id(self):
        return 'cyberbullying_accountability'

    def get_name(self):
        return 'Cyberbullying: Accountability Without Doxing'

    def get_version(self):
        return '1.0.0'

    def get_games(self):
        return {'/game/cyberbullying-phone': 'phone/phone.html'}

    def get_course(self):
        return {
            'id': 'cyberbullying_accountability',
            'title': 'Cyberbullying: Accountability Without Doxing',
            'subtitle': 'What would you do in this TikTok-style feed?',
            'description': 'Learn how to respond when a post turns into harassment, show support for the person involved, and hold people accountable without sharing private information.',
            'color': '#7B5C9E',
            'icon': '📱',
            'modules': [
                {
                    'id': 'phone_simulation',
                    'title': 'When Your Feed Crosses a Line',
                    'content': 'Go through a TikTok-style feed and choose what to do. Your comments, likes, shares, reports, and messages change what happens next.',
                    'activity_type': 'game',
                    'game_url': '/game/cyberbullying-phone',
                    'button_text': 'Open the Phone'
                }
            ]
        }
