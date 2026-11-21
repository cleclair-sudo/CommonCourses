#!/bin/bash
# Start the AI Adventure Server
# This script starts the Flask development server

cd "$(dirname "$0")"

# Set up Python path to use the included dependencies
export PYTHONPATH="$(pwd)/python/Lib/site-packages:$PYTHONPATH"

# Start the Flask app
python3 app.py
