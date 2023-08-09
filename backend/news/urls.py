from django.urls import path
from . import views


urlpatterns = [
    path('sanity_check/', views.SanityCheck.as_view()),
]