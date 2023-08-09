from django.db import models

from .enums import ITEM_TYPES, NEWS_SOURCE


# Create your models here.
class NewsItem(models.Model):
    id = models.IntegerField(primary_key=True)
    item_type = models.CharField(max_length=100, choices=ITEM_TYPES.choices)
    news_source = models.CharField(max_length=100, choices=NEWS_SOURCE.choices)
    by = models.CharField(max_length=100)
    time = models.DateTimeField()
    text = models.TextField(null=True, blank=True)
    url = models.URLField(null=True)
    score = models.IntegerField(null=True)
    title = models.CharField(max_length=255)
    descendants = models.IntegerField(null=True)

    def __str__(self):
        return f"{self.id}: {self.title}"


class Comment(models.Model):
    comment_id = models.IntegerField()
    news_item = models.ForeignKey(NewsItem, on_delete=models.CASCADE)
    by = models.CharField(max_length=100, default="Anonymous")
    parent_comment = models.ForeignKey("self", null=True, on_delete=models.CASCADE)
    time = models.DateTimeField()  # use datetime.now
    text = models.TextField(null=True, blank=False)

    def __str__(self):
        return f"{self.comment_id}: {self.by} {self.news_item.id}"
