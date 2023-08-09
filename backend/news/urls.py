from django.urls import path
from . import views


urlpatterns = [
    path("sanity_check/", views.SanityCheck.as_view()),
    path("latest-news/", views.LatestNewsListView.as_view()),
    path("<int:pk>", views.DetailNewsView.as_view()),
]
