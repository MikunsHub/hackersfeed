from django.test import TestCase
from django.urls import reverse
from news.models import NewsItem
from rest_framework import status


class NewsView(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        number_of_news = 25  # To test pagination

        for news_id in range(number_of_news):
            NewsItem.objects.create(
                id=news_id,
                by=f"Mirror{news_id}",
                title=f"foobar {news_id}",
                text=f"foobar {news_id}",
                item_type="story",
            )

    def test_sanity_check(self):
        response = self.client.get(reverse("sanity_check"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {"message": "I am sane"})

    def test_news_list_pagination(self):
        response = self.client.get(reverse("latest-news"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["results"]), 2)

    def test_get_latest_news_list(self):
        response = self.client.get(reverse("latest-news"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Create some news items
        NewsItem.objects.create(
            by="TestUser", title="News 1", text="Text 1", item_type="story"
        )
        NewsItem.objects.create(
            by="TestUser", title="News 2", text="Text 2", item_type="story"
        )

        response = self.client.get(reverse("latest-news"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 2)



