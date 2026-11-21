# Configuration Guide

This guide covers `plugins/config.json`, which lets developers customize platform branding and text without changing code. The file is local and ignored by Git, so base-code updates won't overwrite it.

## Quick Start

Copy `plugins/config.example.json` to `plugins/config.json`, then edit the copy:

```json
{
  "project": {
    "title": "AI Adventure",
    "subtitle": "Three paths to explore artificial intelligence",
    "description": "Choose what interests you and dive in. You can explore all of them!",
    "hero_tip": "💡 Pro tip: Start with what interests YOU most!"
  },
  "theme": {
    "default": "light",
    "show_toggle": true
  },
  "app": {
    "name": "Interactive Education Platform",
    "version": "2.0.0",
    "author": "Education Team"
  }
}
```

Changes take effect immediately after restarting the server.

## Configuration Options

### Project Settings (`config.project`)

These settings control what users see on the homepage:

#### `title` (string)
The main title/name of your platform.
- **Default:** `"AI Adventure"`
- **Example:** `"Code Learning Hub"`, `"Python Academy"`

#### `subtitle` (string)
A short tagline describing what your platform offers.
- **Default:** `"Three paths to explore artificial intelligence"`
- **Example:** `"Master programming from beginner to advanced"`

#### `description` (string)
A longer description shown below the subtitle, explaining what users can do.
- **Default:** `"Choose what interests you and dive in. You can explore all of them!"`
- **Example:** `"Learn at your own pace with interactive lessons and real-world projects"`

#### `hero_tip` (string)
A helpful tip shown at the bottom of the homepage.
- **Default:** `"💡 Pro tip: Start with what interests YOU most!"`
- **Example:** `"💡 Tip: Complete courses in any order to earn achievements!"`

### Theme Settings (`config.theme`)

#### `default` (string)
Color scheme everyone starts with: `"light"` or `"dark"`. Applies to the whole site, games included.
- **Default:** `"light"`

#### `show_toggle` (boolean)
Shows a "Switch to dark/light mode" button on the homepage, course pages and in the game's top bar. A visitor's pick is saved in their browser and overrides `default` for them.
- **Default:** `true`

### App Settings (`config.app`)

These are informational settings for your team:

#### `name` (string)
Full name of your application.
- **Default:** `"Interactive Education Platform"`

#### `version` (string)
Current version of your platform.
- **Default:** `"2.0.0"`

#### `author` (string)
Who maintains this platform.
- **Default:** `"Education Team"`

## Examples

### Customizing for a School

```json
{
  "project": {
    "title": "Lincoln High Computer Science",
    "subtitle": "Learn AI & Programming",
    "description": "Complete our interactive courses to master modern computer science concepts.",
    "hero_tip": "🎓 Pro tip: Teachers can track your progress on the dashboard!"
  },
  "app": {
    "name": "Lincoln High Learning Platform",
    "version": "1.0.0",
    "author": "Lincoln High CS Department"
  }
}
```

### Customizing for a Company

```json
{
  "project": {
    "title": "TechCorp Academy",
    "subtitle": "Internal Training Platform",
    "description": "Required courses for all employees. Complete training to earn certifications.",
    "hero_tip": "⚡ Remember: Completion is required for annual reviews!"
  },
  "app": {
    "name": "TechCorp Employee Academy",
    "version": "2.1.0",
    "author": "TechCorp Learning & Development"
  }
}
```

### Customizing for a Community Project

```json
{
  "project": {
    "title": "Code for Good",
    "subtitle": "Free Tech Education for Everyone",
    "description": "Learn programming, AI, and digital skills completely free. Join our community!",
    "hero_tip": "🚀 All courses are free and open to everyone!"
  },
  "app": {
    "name": "Code for Good Platform",
    "version": "1.5.0",
    "author": "Open Source Community"
  }
}
```

## How Configuration Works

1. **Server reads local config** - When Flask starts, it loads `plugins/config.json` if present; otherwise it uses `plugins/config.example.json`
2. **API endpoint serves config** - The `/api/config` endpoint makes this data available to the frontend
3. **JavaScript applies settings** - When you visit the homepage, JavaScript fetches the config and updates the page elements

## API Access

If you need to access the configuration programmatically:

```bash
# Get current configuration
curl http://localhost:5000/api/config
```

Returns:
```json
{
  "project": {
    "title": "AI Adventure",
    "subtitle": "Three paths to explore artificial intelligence",
    "description": "Choose what interests you and dive in. You can explore all of them!",
    "hero_tip": "💡 Pro tip: Start with what interests YOU most!"
  },
  "app": {
    "name": "Interactive Education Platform",
    "version": "2.0.0",
    "author": "Education Team"
  }
}
```

## Tips

✅ **Keep titles short** - Long titles will wrap awkwardly on mobile
✅ **Use emojis** - Add personality with an emoji at the start of your tip
✅ **Be clear** - The description should immediately explain what users will learn
✅ **Test after changes** - Restart the server and refresh your browser to see changes
✅ **Keep JSON valid** - If you get errors, check your JSON syntax at https://jsonlint.com

## Troubleshooting

**Changes not appearing?**
- Restart the Flask server
- Clear your browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Check the browser console for errors

**JSON errors?**
- Make sure all strings are in double quotes `""`
- Check that all braces `{}` and brackets `[]` are balanced
- Use a JSON validator: https://jsonlint.com

**Can't edit the file?**
- Make sure you have write permissions to `plugins/config.json`
- Try opening it in a plain text editor (not Word)

## Extending Configuration

Want to add more options? You can:

1. Add new fields to `plugins/config.json` and `plugins/config.example.json`
2. Update `core/static/js/index.js` to use the new fields
3. Update the HTML templates to display the new content

Example: Adding social media links
```json
{
  "project": {
    "title": "...",
    ...
  },
  "social": {
    "twitter": "https://twitter.com/yourhandle",
    "github": "https://github.com/yourrepo",
    "discord": "https://discord.gg/yourserver"
  }
}
```

Then update `index.js` to use these links in a footer.
