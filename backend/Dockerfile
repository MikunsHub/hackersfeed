# Pulling the official Python image as the base image
FROM python:3.9.6-slim-buster

# Set environment variables for the app
ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE hackersfeed_api.settings

# Create and set the working directory
RUN mkdir /app
WORKDIR /app/backend

# Copy the requirements file into the container
COPY requirements.txt /app/backend/

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy code
COPY backend /app/backend/
COPY settings.ini /app/backend/
COPY manage.py /app/backend/


# Start Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]


