---

# HackersFeed Backend Setup

This guide will walk you through the process of setting up and running the backend of the HackersFeed project.


## Prerequisites
Before you start, make sure you have the following software installed:

- [Python 3.9.6](https://www.python.org/downloads/release/python-396/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Redis](https://redis.io/download)


1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/MikunsHub/hackersfeed.git
   cd hackersfeed
   ```

2. Make sure you have Python 3.9.6 installed on your machine.

3. Install PostgreSQL and Redis: Install these prerequisites using the provided `setup_dependencies.sh` script if you are on a Mac.



4. Run backend.sh :

```bash
cd scripts
chmod +x backend.sh
./backend.sh
```
5. Run Celery workers and beat:

   ```bash
   python -m celery -A hackersfeed_api worker & python -m celery -A hackersfeed_api beat
   ```

   This will start Celery workers and beat for background tasks.

6. To start the redis server manually:

   ```bash
   redis-server
   ```

To run the tests:
   ```bash
      python manage.py tests
   ```

Happy hacking!
