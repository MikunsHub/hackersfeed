from django.db.models import TextChoices

class ITEM_TYPES(TextChoices):
    JOB = "job"
    STORY = "story"
    COMMENT = "comment"

class NEWS_SOURCE(TextChoices):
    HACKER_NEWS= "HN"
    HACKERS_FEED = "HF"