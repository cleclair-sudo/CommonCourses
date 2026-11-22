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
            'subtitle': 'Practice safer choices in a TikTok-style feed',
            'description': 'Learn how to respond to online harm, support the person targeted, and seek accountability without exposing private information or encouraging a pile-on.',
            'color': '#7B5C9E',
            'icon': '📱',
            'modules': [
                {
                    'id': 'phone_simulation',
                    'title': 'When Your Feed Crosses a Line',
                    'content': 'Follow the Accountability vs Doxing branching adventure on a fictional TikTok-style phone. Your comments, likes, shares, reports, and private messages determine which scene and ending you reach.',
                    'activity_type': 'game',
                    'game_url': '/game/cyberbullying-phone',
                    'button_text': 'Open the Phone'
                }
            ]
        }
