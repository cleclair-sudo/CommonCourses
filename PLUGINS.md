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
- `plugins/cyberbullying_accountability/` - TikTok-style practice phone with all controls inside the device. Learners can comment/reply, like comments, delete their comment, save evidence, screen-record within the simulation, repost, forward, report comments/posts, block, publish fictional posts, and message fictional contacts. The left column is informational only. Nothing is sent to real social accounts; entered text stays in page memory and resets on reload/restart.

The phone follows the supplied **Accountability vs Doxing** adventure diagram, rather than a linear feed:

| Scene | Phone action | Next scene / ending |
| --- | --- | --- |
| Original clip | Send to Field Hockey group / repost | Teammate's stitch |
| Original clip | Like the identifying school comment | Follow-up video the next day |
| Original clip | Post a comment | Notification replies |
| Original clip | Keep scrolling | Good: avoid amplifying an uncertain identity |
| Follow-up video | Stop and save a screen recording | Good: keep evidence private |
| Follow-up video | Post a comment / repost | Notification replies / teammate's stitch |
| Notification replies | Like identifying replies | Harmful: amplify doxing |
| Notification replies | Report exposing comments | Good: flag dangerous details |
| Notification replies | Delete your comment / reply to commenters | Not best alone: copies may remain / private details stay visible |
| Teammate's stitch | Repost / keep scrolling | Harmful: amplify attacks / leave the escalation unaddressed |
| Teammate's stitch | Privately message teammate / report post | Good: private conversation / flag harmful content |

This yields 22 complete routes to the diagram's 10 endings. Other phone tools let learners explore without inventing extra story branches. The scroll arrow/swipe resolves the document's "keep scrolling" action only in scenes that have that branch. Names, account links, addresses, and personal insults are withheld; the school name is scenario context from the document, not identification of the stock-photo subject.

Public comments and replies use casual, full-text prefab options only; there is no custom comment field. Select one and tap **Post comment**. Each option has an explicit rating and explanation, shown with the posted comment and in the final recap; typed text is not classified. Scene-specific options identify the field hockey team in the original/follow-up posts or warn about doxing in the notification replies. Public posting/reply controls appear only where the document has a corresponding path. The teammate stitch's comments are read-only; learners must repost, keep scrolling, privately message their teammate, or report the stitch. Private messages and fictional post captions retain their separate composers. **Keep scrolling** remains a labeled phone button and post-menu action in the original-clip and teammate-stitch scenes, preserving their different document endings.

The phone's **Story actions** menu lists the document's choices for the current scene and opens the corresponding phone controls. **Keep scrolling** immediately takes that branch. In the stitch scene, a learner must choose and send a relevant prefab private message to reach the good private-conversation ending. The comment-report ending identifies whether all or only some exposing replies were selected, without suggesting that unreported replies were flagged.

The entire read-only left column is a numbered timeline, starting with the opening situation and simulation notices. The opening uses the same compact text sizing as later situations. It preserves each reached situation's full context, the learner's choices, and the diagram's **Why good**, **Why bad**, or **Why not best** explanations, including partial-report details when applicable. The active situation asks **What do you do?**; unreached situations/endings are not revealed. Restarting returns to the opening entry. The phone stays alongside the growing timeline on desktop, and all controls remain inside it.

Yellow action pop-ups paraphrase the document's yellow statements for all 16 scene-specific choices. Hover and keyboard-focus hints work from the initial page load in **Story actions** and on matching phone controls. Their text describes the learner's intention without revealing the ending. Actions execute directly without a confirmation box. Simply opening a menu or selecting a prefab does not commit an action. Escape, clicking, scrolling, or leaving the control/pop-up dismisses the hints.

After commenting on the original or follow-up video, the phone automatically scrolls through three unrelated fictional posts, sampled without repeating topics and given randomized headlines/counts. Each topic has a different local stock photo instead of emoji artwork. The follow-up and teammate posts also have distinct images. The commented post then returns with its original image, the learner's comment, and new replies open. This is a visual transition to the existing notification branch, not a new adventure path. Controls pause during the short sequence; reduced-motion settings disable the sliding animation.

The phone plugin includes `games/phone/portrait.jpg`, a stock portrait by [Joseph Gonzalez on Unsplash](https://unsplash.com/photos/iFgRcqHznqg), downloaded under the [Unsplash License](https://unsplash.com/license). Original image: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d`. The portrait is unrelated to the fictional events, and the simulation labels it accordingly. Only course/module completion is sent to the platform's progress API; comments, messages, and simulated posts are not transmitted or persisted.

Additional stock photos are downloaded under the same license and served locally from `games/phone/`, with no runtime requests to Unsplash:

| Asset | Use | Original image |
| --- | --- | --- |
| `cafe.jpg` | Next-day follow-up | https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb |
| `phone.jpg` | Teammate's stitch | https://images.unsplash.com/photo-1511707171634-5f897ff02aa9 |
| `coffee.jpg` | Coffee feed post | https://images.unsplash.com/photo-1509042239860-f550ce710b93 |
| `cat.jpg` | Cat feed post | https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba |
| `forest.jpg` | Walking feed post | https://images.unsplash.com/photo-1441974231531-c6227db76b6e |
| `noodles.jpg` | Food feed post | https://images.unsplash.com/photo-1569718212165-3a8278d5f624 |
| `books.jpg` | Books feed post | https://images.unsplash.com/photo-1507842217343-583bb7270b66 |
| `art.jpg` | Art feed post | https://images.unsplash.com/photo-1513364776144-60967b0f800f |

All stock imagery is illustrative and unrelated to the fictional incident, people, or location.

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
