from django.db import models
from django.utils import timezone

from accounts.models import User

from .enums import ITEM_TYPES, NEWS_SOURCE


# Create your models here.
class NewsItem(models.Model):
    id = models.IntegerField(primary_key=True)
    item_type = models.CharField(max_length=100, choices=ITEM_TYPES.choices)
    news_source = models.CharField(max_length=100, choices=NEWS_SOURCE.choices,default=NEWS_SOURCE.HACKERS_FEED)
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)
    by = models.CharField(max_length=100)
    time = models.DateTimeField(default=timezone.now)
    text = models.TextField(null=True, blank=True)
    url = models.URLField(null=True,blank=True)
    score = models.IntegerField(null=True,default=0)
    title = models.CharField(max_length=255)
    descendants = models.IntegerField(null=True,default=0)

    def __str__(self):
        return f"{self.id}: {self.title}"


class Comment(models.Model):
    comment_id = models.IntegerField(null=True,blank=True)
    news_item = models.ForeignKey(NewsItem, on_delete=models.CASCADE)
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)
    by = models.CharField(max_length=100, default="Anonymous")
    parent_comment = models.ForeignKey("self", null=True, on_delete=models.CASCADE)
    time = models.DateTimeField(default=timezone.now)
    text = models.TextField(null=True, blank=False)

    def __str__(self):
        return f"{self.comment_id}: {self.by} {self.news_item.id}"
