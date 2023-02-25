from rest_framework import serializers
from .models import *

class Userdetailsserializer(serializers.ModelSerializer):
    class Meta:
        model = Userdetails
        fields = '__all__'

class contentratingsserializer(serializers.ModelSerializer):
    class Meta:
        model = contentrating
        fields = '__all__'
class contentdetailsserializer(serializers.ModelSerializer):
    class Meta:
        model = contentdetails
        fields = '__all__'


class Bidderdetailsserializer(serializers.ModelSerializer):
    class Meta:
        model = Bidderdetails
        fields = '__all__'


class bidstartserializer(serializers.ModelSerializer):
    class Meta:
        model = Biddstart
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    #owner = serializers.ReadOnlyField(source='owner.name')
    owner = Userdetailsserializer(read_only=True)
    like_on_post_count = serializers.SerializerMethodField('get_like_on_group_post_count')
    def get_like_on_group_post_count(self,obj):
        like =  Post_Like.objects.filter(group_post=obj)
        return like.count()

    comment_on_post_count = serializers.SerializerMethodField('get_comment_on_group_post_count')
    def get_comment_on_group_post_count(self,obj):
        comment =  Comment.objects.filter(group_post=obj)
        return comment.count()

    
    # votes_on_post = serializers.SerializerMethodField('get_votes')
    # def get_votes(self,obj):
    # 	votes = Votes_on_post.objects.filter(group_post=obj)
    # 	return votes.count()

    
    class Meta:
        model = Post
        fields = ['id', 'title', 'body', 'owner','images_post','youtube_link','like_on_post_count','comment_on_post_count']

class CommentSerializer(serializers.ModelSerializer):
    #owner = serializers.ReadOnlyField(source='owner.name')
    #owner = Userdetailsserializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'body', 'group_post','owner_key']


class PostLikeSerializer(serializers.ModelSerializer):
    #owner = serializers.ReadOnlyField(source='owner.name')
    #owner = Userdetailsserializer(read_only=True)


    class Meta:
        model = Post_Like
        fields = ['id','group_post','create_date','owner_key']