from django.db import models

from backend.news.enums import ITEM_TYPES, NEWS_SOURCE

# Create your models here.
class NewsItem(models.Model):
    id = models.IntegerField(primary_key=True)
    item_type = models.CharField(max_length=10, choices=ITEM_TYPES)
    news_source = models.CharField(max_length=10, choices=NEWS_SOURCE)
    by = models.CharField(max_length=100)
    time = models.DateTimeField()
    text = models.TextField(null=True,blank=True)
    url = models.URLField(null=True)
    score = models.IntegerField(null=True)
    title = models.CharField(max_length=255)
    descendants = models.IntegerField(null=True)

    def __str__(self):
        return f"{self.id}: {self.title}"
    

class Comment(models.Model):
    comment_id = models.IntegerField()
    news_item = models.ForeignKey(NewsItem, on_delete=models.CASCADE)
    by = models.CharField(max_length=100)
    parent_comment = models.ForeignKey("self", null=True, on_delete=models.CASCADE)
    time = models.DateTimeField()
    text = models.TextField()