from celery import shared_task
import logging
from news.utilities.utils import (
    create_news,
    fetch_item_data,
    fetch_top_news_ids,
    process_comments,
)

# Configure logging
logging.basicConfig(
    level=logging.ERROR, format="%(asctime)s - %(levelname)s - %(message)s"
)


@shared_task()
def fetch_and_store_hackernews_data():
    try:
        top_news_ids = fetch_top_news_ids()
        top_news_data = fetch_item_data(top_news_ids)
        count = 0
        for news_item_data in top_news_data:
            news_item = create_news(news_item_data)
            count += 1
            print(count)
            if news_item_data.get("kids"):
                process_comments(news_item_data["kids"], None, news_item)
    except Exception as e:
        logging.error("An error occurred: %s", str(e))


# fetch_and_store_hackernews_data.delay()
