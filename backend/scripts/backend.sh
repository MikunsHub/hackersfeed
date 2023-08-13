#!/bin/bash

# ONLY RUN THIS SCRIPT FOR INITIAL SETUP ON BARE METAL

echo "This script assumes you have python 3.9.6 installed"
echo "This script also gives an alternative to run the project bare metal instead of using docker"

pip install virtualenv
clear

echo "-> creating a virtual environment"
python -m virtualenv venv

echo "-> activating virtual environment"

source venv/scripts/activate
clear

# Install requirements
echo "Would you like to install project requirements? y/n"
read install_var

if [ $install_var == y ]
then
    pip install -r requirements.txt
elif [ $install_var == n ]
then
    echo "Requirements skipped"
else
    echo "Invalid input"
fi

echo "This project utilizes postgres,"
echo "Initiating database setup"
echo "Please enter the following credentials"


echo "DB_NAME:"
read DB_NAME

echo "DB_USER:"
read DB_USER

echo "DB_PASSWORD:"
read DB_PASSWORD

echo "DB_HOST:"
read DB_HOST

echo "DB_PORT:"
read DB_PORT


# Attempt to generate a random secret key using OpenSSL
SECRET_KEY=$(openssl rand -hex 32 2>/dev/null)

# If OpenSSL failed to generate a key, ask the user for input
if [ -z "$SECRET_KEY" ]; then
    echo "OpenSSL failed to generate a key."
    echo -n "Please enter a SECRET_KEY: "
    read SECRET_KEY
fi

echo "[settings]" > settings.ini
echo "SECRET_KEY = \"$SECRET_KEY\"" >> settings.ini
echo "DB_NAME = \"$DB_NAME\"" >> settings.ini
echo "DB_USER = \"$DB_USER\"" >> settings.ini
echo "DB_PASSWORD = \"$DB_PASSWORD\"" >> settings.ini
echo "DB_HOST = \"$DB_HOST\"" >> settings.ini
echo "DB_PORT = \"$DB_PORT\"" >> settings.ini
echo "ENVIRONMENT = LOCAL" >> settings.ini
echo "BASE_URL = https://hacker-news.firebaseio.com/v0/" >> settings.ini



echo "Migrations will begin in a moment" 
python manage.py makemigrations
python manage.py migrate


echo "Would you like to run this project? y/n"
read run_var

if [ $run_var == y ]
then
    python manage.py runserver
fi