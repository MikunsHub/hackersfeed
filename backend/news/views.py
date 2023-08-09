from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import NewsItem
from .serializers import NewsItemSerializer
from news.tasks import fetch_and_store_hackernews_data
from rest_framework.pagination import PageNumberPagination


# TODO: move from view
class LatestNewsPagination(PageNumberPagination):
    page_size = 2
    page_size_query_param = "page_size"
    max_page_size = 100


# Create your views here.
class SanityCheck(APIView):
    def get(self, request, *args, **kwargs):
        fetch_and_store_hackernews_data()
        return Response({"message": "I am sane"})


class LatestNewsListView(generics.ListAPIView):
    queryset = NewsItem.objects.all().order_by("-time")
    serializer_class = NewsItemSerializer
    pagination_class = LatestNewsPagination

    def get_queryset(self):
        queryset = super().get_queryset()
        item_type = self.request.query_params.get("item_type")
        news_source = self.request.query_params.get("news_source")

        if item_type and news_source:
            queryset = queryset.filter(item_type=item_type, news_source=news_source)
        elif item_type:
            queryset = queryset.filter(item_type=item_type)
        elif news_source:
            queryset = queryset.filter(news_source=news_source)

        return queryset
    

class DetailNewsView(generics.RetrieveAPIView):
    queryset = NewsItem.objects.all()
    serializer_class = NewsItemSerializer
