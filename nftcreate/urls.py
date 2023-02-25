
from django.shortcuts import render

# Create your views here.
from django.urls import path
from . import views
from .views import createcontentdetails,contentDetaildetails,createuserdetails,userdetaildetails,createratingdetails,ratingreommendation
urlpatterns = [
    path('createcontent/',createcontentdetails.as_view(),name='createcontent'),
    path('contentDetail/<int:pk>/',contentDetaildetails.as_view(),name='contentdetail'),
    path('createuser/',createuserdetails.as_view(),name='createcontent'),
    path('userDetail/<int:pk>/',userdetaildetails.as_view(),name='contentdetail'),
    path('contentrating/',createratingdetails.as_view(),name='contentrating'),
    path('ratingreommendation/',ratingreommendation.as_view(),name='rating'),
    #path('searchreommendation/',searchreommendation.as_view(),name='search'),
    #path('moodbasedreommendation/',moodbasedreommendation.as_view(),name='search'),

    path('posts/', views.PostList.as_view()),
    path('posts/<int:pk>/', views.PostDetail.as_view()),
    path('comments/', views.CommentList.as_view()),
    path('comments/<int:pk>/', views.CommentDetail.as_view()),
    path('post-like/', views.LikePost_view.as_view()),
    path('post-like/<int:pk>/', views.LikePost_destroy_view.as_view()),
    path('bid-start/', views.Bidstart_view.as_view()),
    path('bid-start/<int:pk>/', views.BIDstartDetail.as_view()),
    
    path('bid-details/', views.Biddetail_view.as_view()),
    path('bid-details/<int:pk>/', views.BIDderDetail.as_view()),
    

    ]