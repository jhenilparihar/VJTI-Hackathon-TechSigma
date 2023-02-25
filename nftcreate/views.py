from django.shortcuts import render
from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework import status,permissions,viewsets
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from .models import *
from .serializers import *
from django.db.models import Q
import os
from rest_framework.decorators import api_view
#import stripe
# Create your views here.
#stripe.api_key = 'sk_test_51Mf3UKSEPRrBuZmpovzB48Blo0SyKOvPh3CZQ5XpkYwJ2finksUYnu5dvuUkHli6gnceHIGRISYjeAhiNiucOi9V00b6SfhLdi'


class createcontentdetails(generics.ListCreateAPIView):
    queryset = contentdetails.objects.all()
    serializer_class = contentdetailsserializer
    #permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()

class contentDetaildetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = contentdetails.objects.all()
    serializer_class = contentdetailsserializer
    #permission_classes = [permissions.IsAuthenticated]

    def retrieve(self,request,pk=None):
        like = contentdetails.objects.filter(tokenName=pk)
        data = contentdetailsserializer(like,many=True)
        return Response(data.data)

class createratingdetails(generics.ListCreateAPIView):
    queryset = contentrating.objects.all()
    serializer_class = contentratingsserializer
    #permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()

class contentratingdetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = contentrating.objects.all()
    serializer_class = contentratingsserializer
    #permission_classes = [permissions.IsAuthenticated]


class createuserdetails(generics.ListCreateAPIView):
    queryset = Userdetails.objects.all()
    serializer_class = Userdetailsserializer
    #permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()

class userdetaildetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Userdetails.objects.all()
    serializer_class = Userdetailsserializer
    #permission_classes = [permissions.IsAuthenticated]



class ratingreommendation(generics.ListCreateAPIView):
    queryset = contentrating.objects.all()
    serializer_class = contentdetailsserializer
    #permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        contentno = contentrating.objects.all().values_list('content')
        print(contentno)
        dictnor = contentdetails.objects.filter(id__in=contentno)
        return dictnor


class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    #permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    #permission_classes = [permissions.IsAuthenticated]



########################Comment part begins####################################

class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    #permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    #permission_classes = [permissions.IsAuthenticated]

    def retrieve(self,request,pk=None):
        like = Comment.objects.filter(group_post=pk)
        data = CommentSerializer(like,many=True)
        return Response(data.data)


########################Like part begins####################################

class LikePost_view(generics.ListCreateAPIView):
    queryset = Post_Like.objects.all()
    serializer_class = PostLikeSerializer
    #permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()

class LikePost_destroy_view(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post_Like.objects.all()
    serializer_class = PostLikeSerializer
    #permission_classes = [permissions.IsAuthenticated]

    def retrieve(self,request,pk=None):
        like = Post_Like.objects.filter(group_post=pk)
        data = PostLikeSerializer(like,many=True)
        return Response(data.data)

class Bidstart_view(generics.ListCreateAPIView):
    queryset = Biddstart.objects.all()
    serializer_class = bidstartserializer
    #permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()

class BIDstartDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Biddstart.objects.all()
    serializer_class = bidstartserializer


    # def retrieve(self,request,pk=None):
    #     like = Biddstart.objects.filter(nftdetails=pk)
    #     data = bidstartserializer(like,many=True)
    #     return Response(data.data)

class livebid_view(generics.ListCreateAPIView):
    queryset = Biddstart.objects.all()
    serializer_class = contentdetailsserializer
    #permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        contentno = Biddstart.objects.all().values_list('age')
        print(contentno)
        dictnor = contentdetails.objects.filter(tokenName__in=contentno)
        return dictnor

class Biddetail_view(generics.ListCreateAPIView):
    queryset = Bidderdetails.objects.all()
    serializer_class = Bidderdetailsserializer
    #permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()

class BIDderDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bidderdetails.objects.all()
    serializer_class = Bidderdetailsserializer

    def retrieve(self,request,pk=None):
        like = Bidderdetails.objects.filter(nftdetails=pk)
        data = Bidderdetailsserializer(like,many=True)
        return Response(data.data)

class Buycreate_view(generics.ListCreateAPIView):
    queryset = Buyingdetails.objects.all()
    serializer_class = buyingserializer
    #permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()

class BuyingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Buyingdetails.objects.all()
    serializer_class = buyingserializer

    def retrieve(self,request,pk=None):
        like = Buyingdetails.objects.filter(age=pk)
        data = buyingserializer(like,many=True)
        return Response(data.data)

class traditionalcreate_view(generics.ListCreateAPIView):
    queryset = traditionaldetails.objects.all()
    serializer_class = traditionalsserializer
    #permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()

# @api_view(['POST'])
# def test_payment(request):
#     test_payment_intent = stripe.PaymentIntent.create(
#         amount=1000,
#         currency='pln',
#         payment_method_types=['card'],
#         receipt_email='test@example.com',
#     )

#     return Response(status=status.HTTP_200_OK, data=test_payment_intent)