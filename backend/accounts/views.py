from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.contrib.auth import get_user_model

from accounts.serializers import UserSerializer


class SignupView(generics.CreateAPIView):
    serializer_class = UserSerializer
    queryset = get_user_model().objects.all()

    def perform_create(self, serializer):
        user = serializer.save()
