#!/bin/bash

echo "Welcome this Setup Script helps install major Project Dependencies"
echo "This script uses Homebrew to manage dependencies."

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "Homebrew is not installed. Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    echo "Homebrew installation completed!"
fi

# Check if PostgreSQL is installed
if ! command -v postgres &> /dev/null; then
    echo "PostgreSQL is not installed. Installing PostgreSQL..."
    brew install postgresql
    brew services start postgresql
    echo "PostgreSQL installation completed!"
else
    echo "PostgreSQL is already installed."
    echo "Version: $(postgres --version)"
fi

# Check if Redis is installed
if ! command -v redis-server &> /dev/null; then
    echo "Redis is not installed. Installing Redis..."
    brew install redis
    brew services start redis
    echo "Redis installation completed!"
else
    echo "Redis is already installed."
    echo "Version: $(redis-server --version)"
fi

echo "All dependencies are now installed and running."
echo "Please make sure to review and run backend.sh to fire up the project"


