"""Base class for course plugins"""
from abc import ABC, abstractmethod


class CoursePlugin(ABC):
    """Base class all course plugins must inherit from"""
    
    @abstractmethod
    def get_course(self):
        """
        Return course data dictionary with structure:
        {
            'id': 'unique_id',
            'title': 'Course Title',
            'subtitle': 'Short subtitle',
            'description': 'Longer description',
            'color': '#HEXCOLOR',
            'icon': '🎓',
            'modules': [...]  # List of module dicts
        }
        """
        pass
    
    @abstractmethod
    def get_id(self):
        """Return unique course ID"""
        pass
    
    @abstractmethod
    def get_name(self):
        """Return human-readable plugin name"""
        pass
    
    def get_version(self):
        """Return plugin version - override if needed"""
        return "1.0.0"

    def get_games(self):
        """
        Map URLs to game pages inside this plugin's games/ folder, e.g.
        {'/game/mayor': 'mayor/mayor.html'}
        """
        return {}
    
    def on_module_complete(self, user_id, module_id, answers):
        """
        Hook called when a user completes a module
        Override to add custom logic (e.g., scoring, achievements)
        """
        pass
