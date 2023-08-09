from rest_framework.views import APIView
from rest_framework.response import Response

from news.tasks import fetch_and_store_hackernews_data


# Create your views here.
class SanityCheck(APIView):
    def get(self, request, *args, **kwargs):
        fetch_and_store_hackernews_data()
        return Response({"message": "I am sane"})
