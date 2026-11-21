@echo off
REM Start the AI Adventure Server
REM This script starts the Flask development server

cd /d "%~dp0"

REM Set up Python path to use the included dependencies
set PYTHONPATH=%cd%\python\Lib\site-packages;%PYTHONPATH%

REM Start the Flask app
python3 app.py

REM Keep the window open if there's an error
pause
