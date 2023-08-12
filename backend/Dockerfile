# Pulling the official Python image as the base image
FROM python:3.9-slim-buster

# Create and set the working directory
RUN mkdir /app
WORKDIR /app

# Set environment variables for the app
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE hackersfeed_api.settings


# Copy the requirements file into the container
COPY requirements.txt /app/backend/
# Install dependencies
RUN pip install -r /app/backend/requirements.txt


COPY . .






