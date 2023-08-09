from django.contrib import admin

# Register your models here.
from news.models import NewsItem,Comment

admin.site.register([NewsItem,Comment])