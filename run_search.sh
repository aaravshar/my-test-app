#!/bin/bash

# This assumes the environment has Python installed and does not need additional packages

echo "Checking for Python installation..."
# Check if Python is installed
if ! command -v python3 &> /dev/null
then
    echo "Python could not be found. Please install Python."
    exit 1
else
    echo "Python is installed."
fi

echo "Running linear_search.py script..."

# Run the Python script
python3 linear_search.py
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
    echo "Python script failed with exit code $EXIT_CODE."
    exit $EXIT_CODE
else
    echo "Python script executed successfully."
fi
