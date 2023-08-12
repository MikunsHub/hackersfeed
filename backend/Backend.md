---

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/MikunsHub/hackersfeed.git
   cd hackersfeed
   ```

2. Make sure you have Python 3.9.6 installed on your machine.

3. Install PostgreSQL and Redis:

   - **PostgreSQL**: Install PostgreSQL on your machine and configure it with the necessary credentials. You can download it from the [official PostgreSQL website](https://www.postgresql.org/download/).

   - **Redis**: Install and start the Redis server on your machine. You can download it from the [official Redis website](https://redis.io/download).

4. Set up environment variables:

   - Copy the `.env.dev.sample` file to `.env.dev`:

     ```bash
     cp backend/.env.dev.sample backend/.env.dev
     ```

   - Open the `.env.dev` file and set the appropriate values for database and other configurations.

5. Open the terminal and navigate to the `backend/scripts` directory:

   ```bash
   cd backend/scripts
   ```

6. Run the `backend.sh` script to set up the project:

   ```bash
   ./backend.sh
   ```

   This script does the initial project setup, including database migration and virtual environment creation.

7. Start the Redis server:

   ```bash
   redis-server
   ```

8. In a new terminal window, activate the virtual environment:

   ```bash
   source venv/bin/activate
   ```

9. Run Celery workers and beat:

   ```bash
   python manage.py celery worker --detach
   python manage.py celery beat --detach
   ```

   This will start Celery workers and beat for background tasks.

10. Access the application by opening your web browser and navigating to `http://localhost:8000`.

## Project Structure

...

## Contributing

...

## Contact

...

Happy hacking!

