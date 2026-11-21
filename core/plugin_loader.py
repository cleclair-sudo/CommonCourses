"""Finds every plugins/<name>/course.py and hooks it into the app"""
import importlib.util
from pathlib import Path

from flask import Blueprint, render_template

from core.plugin_base import CoursePlugin


class PluginLoader:

    def __init__(self, plugins_dir):
        self.dir = Path(plugins_dir)
        self.plugins = {}
        self.courses = {}

    def load_plugins(self, app):
        if not self.dir.exists():
            print(f"[plugins] {self.dir} not found")
            return

        # folders starting with _ are skipped (like _template)
        for folder in sorted(self.dir.iterdir()):
            if folder.is_dir() and not folder.name.startswith('_') and (folder / 'course.py').exists():
                self._load(folder, app)

    def _load(self, folder, app):
        try:
            # unique module name, otherwise every plugin is just "course"
            spec = importlib.util.spec_from_file_location(f"plugin_{folder.name}", folder / 'course.py')
            mod = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(mod)

            for thing in vars(mod).values():
                if isinstance(thing, type) and issubclass(thing, CoursePlugin) and thing is not CoursePlugin:
                    p = thing()
                    cid = p.get_id()
                    self.plugins[cid] = p
                    self.courses[cid] = p.get_course()
                    self._hook_games(p, cid, folder, app)
                    print(f"[plugins] loaded {p.get_name()} (v{p.get_version()})")

        except Exception as e:
            print(f"[plugins] failed to load {folder.name}: {e}")

    def _hook_games(self, p, cid, folder, app):
        # games/ holds the plugin's html/js/css. js+css get served at /plugins/<id>/...
        games = folder / 'games'
        bp = Blueprint(cid, __name__,
                       template_folder=str(games),
                       static_folder=str(games),
                       static_url_path=f'/plugins/{cid}')

        # game pages get their course passed in, in case they need the module data
        course = self.courses[cid]
        for url, tmpl in p.get_games().items():
            bp.add_url_rule(url, url.strip('/').replace('/', '_').replace('-', '_'),
                            lambda t=tmpl: render_template(t, course=course))

        app.register_blueprint(bp)

    def get_course(self, cid):
        return self.courses.get(cid)

    def get_plugin(self, cid):
        return self.plugins.get(cid)

    def get_all_courses(self):
        return self.courses

    def get_all_plugins(self):
        return self.plugins
