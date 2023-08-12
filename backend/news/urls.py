from django.urls import path
from . import views


urlpatterns = [
    path("sanity_check/", views.SanityCheck.as_view()),
    path("latest-news/", views.LatestNewsListView.as_view()),
    path("headline/", views.HackersNewsHeadlineNewsView.as_view()),
    path("headline/hf", views.HackersFeedHeadlineNewsView.as_view()),
    path("<int:pk>", views.DetailNewsView.as_view()),
    path("create/", views.NewsItemCreateView.as_view()),
    path("<int:news_item_id>/comments/", views.CommentCreateView.as_view()),
    path('search/', views.NewsItemSearchView.as_view())
]
