import requests
from concurrent.futures import ThreadPoolExecutor
import datetime
from django.utils import timezone
from decouple import config
from news.enums import NEWS_SOURCE
from news.models import Comment, NewsItem

BASE_URL = config("BASE_URL")

def unix_timestamp_to_datetime(unixtime):
    dt = datetime.datetime.fromtimestamp(int(unixtime))
    tz_dt = timezone.make_aware(dt, timezone.get_default_timezone())
    return tz_dt

def fetch_top_news_ids():
    query_url = f"{BASE_URL}topstories.json?print=pretty"
    response = requests.get(query_url)
    top_news_ids = response.json()
    return sorted(top_news_ids, reverse=True)[:10]

def fetch_item_data(item_ids):
    item_urls = [f"{BASE_URL}item/{item}.json?print=pretty" for item in item_ids]
    with ThreadPoolExecutor(max_workers=5) as executor:
        responses = list(executor.map(requests.get, item_urls))
    return [response.json() for response in responses]

def process_comments(comment_ids, parent_comment, news_item):
    """
        comment_ids represents the top level comments,
        i.e the kids from the Original News Item.
    """
    for comment_id in comment_ids:
        comment_data = fetch_comment_data(comment_id)
        create_comment(comment_data, parent_comment, news_item)

def fetch_comment_data(comment_id):
    """
        This function calls the hacker news api for comment
        data.
    """
    query_url = f"{BASE_URL}item/{comment_id}.json?print=pretty"
    try:
        response = requests.get(query_url)
        return response.json()
    except requests.exceptions.RequestException as e:
        print("Error fetching comment:", e)
        return {}

def create_comment(comment_data, parent_comment, news_item):
    comment = Comment(
        comment_id=comment_data["id"],
        news_item=news_item,
        by=comment_data.get("by") or "Anonymous",
        parent_comment=parent_comment or None,
        time=unix_timestamp_to_datetime(comment_data.get("time")),
        text=comment_data.get("text"),
    )
    comment.save()

    # going down the comment thread
    if comment_data.get("kids"):
        process_comments(comment_data.get("kids"), comment, news_item)

def create_news(news_item_data):
    """
        This function is responsible for saving news.
    """
    news_item = NewsItem(
        id=news_item_data["id"],
        item_type=news_item_data["type"],
        news_source=NEWS_SOURCE.HACKER_NEWS,
        by=news_item_data["by"],
        time=unix_timestamp_to_datetime(news_item_data["time"]),
        text=news_item_data.get("text"),
        url=news_item_data.get("url"),
        score=news_item_data.get("score"),
        title=news_item_data["title"],
        descendants=news_item_data.get("descendants"),
    )
    news_item.save()
    return news_item

