#!/bin/bash

# This assumes the environment has Python installed and does not need additional packages

# Check if Python is installed
if ! command -v python3 &> /dev/null
then
    echo "Python could not be found. Please install Python."
    exit
fi

# Run the Python script
python3 linear_search.py
