import random


from django.db.models import Q
from rest_framework import generics,status
from rest_framework.views import APIView
from rest_framework.response import Response
from news.utilities.utils import calculate_similarity

from news.enums import NEWS_SOURCE

from .models import Comment, NewsItem
from .serializers import CommentSerializer, HeadlineNewsSerializer, NewsItemSerializer, SearchNewsSerializer
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


class HackersNewsHeadlineNewsView(APIView):
    def get(self, request):
        # Get the top 10 highest scored NewsItems
        top_10_highest_score_news = (
            NewsItem.objects.all().order_by("-score")[:10]
        )

        if top_10_highest_score_news:
            # Randomly select one news item from the top 10 list
            selected_news_item = random.choice(top_10_highest_score_news)
            serializer = HeadlineNewsSerializer(selected_news_item)
            return Response(serializer.data)
        else:
            return Response({"message": "No news items found."}, status=404)


class HackersFeedHeadlineNewsView(APIView):
    def get(self, request):
        # Get the most recent NewsItem
        most_recent_news = (
            NewsItem.objects.filter(news_source=NEWS_SOURCE.HACKERS_FEED)
            .order_by("-time")[:4]
        )

        if most_recent_news:
            serializer = HeadlineNewsSerializer(most_recent_news, many=True)
            return Response(serializer.data)
        else:
            return Response({"message": "No news items found."}, status=404)



class NewsItemCreateView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        data["id"] = random.randint(1, 999999)  # Generate a random integer ID
        serializer = NewsItemSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class CommentCreateView(APIView):
    def post(self, request, *args, **kwargs):
        news_id = kwargs["news_item_id"]
        news_item = NewsItem.objects.get(id=news_id)
        data = request.data
        parent_comment_id = data.pop("parent_comment", None)  # Remove parent_comment from data
        data["news_item"] = news_item.id
        
        if parent_comment_id:
            try:
                parent_comment = Comment.objects.get(id=parent_comment_id, news_item=news_item)
                data["parent_comment"] = parent_comment.id
            except Comment.DoesNotExist:
                return Response({"error": "Parent comment not found"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class NewsItemSearchView(APIView):
    def get(self, request):
        query = request.query_params.get("query", "")

        if query:
            matching_news_items = NewsItem.objects.filter(
                Q(title__icontains=query) | Q(text__icontains=query) | Q(by__icontains=query)
            )

            matching_news_items = sorted(matching_news_items, key=lambda item: calculate_similarity(item.title, query), reverse=True)

            # Initialize the pagination class
            paginator = LatestNewsPagination()
            paginated_news_items = paginator.paginate_queryset(matching_news_items, request)


            serializer = SearchNewsSerializer(paginated_news_items, many=True)
            return paginator.get_paginated_response(serializer.data)
        else:
            return Response({"message": "No query provided."}, status=status.HTTP_400_BAD_REQUEST)