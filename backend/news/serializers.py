from rest_framework import serializers

from .models import NewsItem, Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"

class NewsItemSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField(required=False)

    class Meta:
        model = NewsItem
        fields = "__all__"

    def get_comments(self, news_item):
        top_level_comments = Comment.objects.filter(news_item=news_item, parent_comment=None).order_by("-time")
        serialized_comments = self.serialize_comments(top_level_comments)
        return serialized_comments

    def serialize_comments(self, comments):
        serialized_comments = []
        for comment in comments:
            serialized_comment = CommentSerializer(comment).data
            child_comments = Comment.objects.filter(parent_comment=comment).order_by("-time")
            if child_comments:
                serialized_child_comments = self.serialize_comments(child_comments)
                serialized_comment["child_comments"] = serialized_child_comments
            serialized_comments.append(serialized_comment)
        return serialized_comments
    
