# How to Start the Server

There are multiple ways to start the AI Adventure server. Choose the method that works best for you.

## 🪟 Windows (CMD or PowerShell)

### Option 1: Use the Batch Script (Easiest)

1. Double-click `start-server.bat` in the project folder
2. A command window will open and start the server
3. Visit http://localhost:5000 in your browser
4. To stop: Close the window or press Ctrl+C

### Option 2: Manual Commands in CMD

```bash
# Navigate to project folder
cd C:\path\to\Interactive-Education-on-CT

# Start the server
set PYTHONPATH=%cd%\python\Lib\site-packages;%PYTHONPATH%
python3 app.py
```

### Option 3: Manual Commands in PowerShell

```powershell
# Navigate to project folder
cd C:\path\to\Interactive-Education-on-CT

# Start the server
$env:PYTHONPATH = "$(pwd)\python\Lib\site-packages;$env:PYTHONPATH"
python3 app.py
```

## 🐧 Linux / macOS

### Option 1: Use the Shell Script (Easiest)

```bash
# Make script executable (first time only)
chmod +x start-server.sh

# Run the script
./start-server.sh
```

### Option 2: Manual Commands

```bash
# Navigate to project folder
cd /path/to/Interactive-Education-on-CT

# Start the server
export PYTHONPATH="$(pwd)/python/Lib/site-packages:$PYTHONPATH"
python3 app.py
```

## 🌐 Once Server is Running

After running any of the above commands, you should see:

```
[PluginLoader] Loaded: Open to AI: Risks, Benefits, Community Impact & Self Assessment (v1.0.0)
[PluginLoader] Loaded: Not Open To AI: Avoiding & Disabling (v1.0.0)
 * Running on http://127.0.0.1:5000
```

Then:
1. Open http://localhost:5000 in your browser
2. You should see the AI Adventure homepage

## ⏹️ Stopping the Server

- **Windows**: Close the command window or press `Ctrl+C`
- **Linux/Mac**: Press `Ctrl+C` in the terminal

## 🔄 Restarting the Server

After making changes to `config.json` or adding new course plugins:

1. Stop the server (`Ctrl+C`)
2. Start it again using one of the methods above
3. Refresh your browser (F5 or Ctrl+R)

## 🐛 Troubleshooting

**"python3: command not found"**
- You need Python 3 installed
- Or specify full path: `C:\Python311\python.exe app.py`

**"Module not found" errors**
- Make sure you're in the correct directory
- Check that `PYTHONPATH` is set correctly

**Port 5000 already in use**
- Change the port in `app.py` (last line)
- Or kill the process using port 5000

**Can't access http://localhost:5000**
- Wait 5 seconds for server to fully start
- Check that the server shows "Running on http://127.0.0.1:5000"
- Try http://127.0.0.1:5000 instead of localhost

## 💡 Tips

✅ Keep the server running while you develop
✅ You can edit config.json and HTML files, then refresh browser
✅ You MUST restart the server if you edit Python files or add new course plugins
✅ For production, use a real WSGI server like Gunicorn instead of Flask's debug server

## 📝 Development Workflow

1. Start server with `start-server.bat` (or `.sh`)
2. Open http://localhost:5000
3. Make changes to:
   - `config.json` - Restart server and refresh browser
   - `core/static/` or a plugin's `games/` css/js - Just refresh browser (no restart)
   - `core/templates/` or a plugin's game html - Just refresh browser (no restart)
   - `plugins/` - Restart server
   - Python files - Restart server
4. Restart server as needed
5. See your changes live!
