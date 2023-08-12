from django.urls import path
from . import views


urlpatterns = [
    path("sanity_check/", views.SanityCheck.as_view(),name="sanity_check"),
    path("latest-news/", views.LatestNewsListView.as_view() ,name="latest-news"),
    path("headline/", views.HackersNewsHeadlineNewsView.as_view(),name="headline"),
    path("headline/hf", views.HackersFeedHeadlineNewsView.as_view(),name="hackersfeed"),
    path("<int:pk>", views.DetailNewsView.as_view(),name="news-details"),
    path("create/", views.NewsItemCreateView.as_view(),name="post-news"),
    path("<int:news_item_id>/comments/", views.CommentCreateView.as_view(),name="comment"),
    path('search/', views.NewsItemSearchView.as_view(),name="search-news"),
]
