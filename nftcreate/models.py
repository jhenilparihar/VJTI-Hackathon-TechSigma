from django.db import models
import os


# Create your models here.
def path_and_rename_for_resume(instance, filename):
    return os.path.join('cryptonaut_'+filename)


class contentdetails(models.Model):
    tokenId = models.TextField(null=True,blank=True)
    tokenName = models.TextField(null=True,blank=True)
    tokenType =  models.TextField(null=True,blank=True)
    tokenDesc = models.TextField(null=True,blank=True)
    tokenCategory =  models.TextField(null=True,blank=True)
    tokenThumbnailURI = models.TextField(null=True,blank=True)
    price = models.TextField(null=True,blank=True)
    currentOwner = models.TextField(null=True,blank=True)
    previousOwner = models.TextField(null=True,blank=True)
    adult_rate = models.TextField(null=True,blank=True)
    tokenURI = models.TextField(null=True,blank=True)
    tokenImage =  models.TextField(null=True,blank=True)
    numberofTransfers = models.TextField(null=True,blank=True)
    mintedBy = models.TextField(null=True,blank=True)
    mintTime = models.TextField(null=True,blank=True)
    tokenOwner = models.TextField(null=True,blank=True)
    forSale = models.TextField(null=True,blank=True)


class Userdetails(models.Model):
	bannerHash = models.TextField(null=True,blank=True)
	imageHash = models.TextField(null=True,blank=True)
	name = models.TextField(null=True,blank=True)
	description = models.TextField(null=True,blank=True)
	user = models.TextField(null=True,blank=True)
	email = models.TextField(null=True,blank=True)
	timeOfRegistry = models.TextField(null=True,blank=True)

class contentrating(models.Model):
	content =  models.ForeignKey(contentdetails, related_name = 'contentdetails', on_delete=models.CASCADE)
	user 	= models.ForeignKey(Userdetails, related_name = 'userdetails',on_delete=models.CASCADE)
	rating  = models.TextField(blank=True, max_length=255)



class Post(models.Model):
    created 			= models.DateTimeField(auto_now_add=True)
    title 				= models.CharField(max_length=100, blank=True, default='')
    body 				= models.TextField(blank=True, default='')
    youtube_link 		= models.CharField(max_length=250, null=True, blank=True)
    images_post 		= models.ImageField(null=True,blank=True)
    #owner_key				= models.ForeignKey(Userdetails, on_delete=models.CASCADE,related_name='posts_by',null=True, blank=True)
    owner			= models.CharField(max_length=100, blank=True, default='')

    class Meta:
        ordering = ['created']


class Comment(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    body = models.TextField(blank=False)
    owner_key = models.CharField(max_length=250, null=True, blank=True)
    #owner = models.ForeignKey(Userdetails, related_name='comments', on_delete=models.CASCADE,null=True, blank=True)
    group_post = models.ForeignKey(Post, related_name='comments_post', on_delete=models.CASCADE)

    class Meta:
        ordering = ['created']

class Post_Like(models.Model):
    #owner                           = models.ForeignKey(Userdetails, on_delete=models.CASCADE, related_name='like_user')
    owner_key           			= models.CharField(max_length=250, null=True, blank=True)
    group_post                      = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='like_post',null=True, blank=True)
    create_date                     = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ['create_date']


class Biddstart(models.Model):
	created = models.DateTimeField(auto_now_add=True)
	name 	= models.TextField(blank=True,null=True)
	age = models.TextField(blank=True,null=True)
	# = models.ForeignKey(contentdetails,related_name = 'nftdetails_owner', on_delete=models.CASCADE,blank=True,null=True)
	#nftdetails = models.TextField(null=True,blank=True)
	base_price = models.TextField(blank=True,null=True)
	end_date = models.TextField(blank=True,null=True)
	start_date = models.TextField(blank=True,null=True)

class Bidderdetails(models.Model):
	created = models.DateTimeField(auto_now_add=True)
	name 	= models.TextField(blank=True,null=True)
	age = models.TextField(blank=True,null=True)
	nftdetails = models.ForeignKey(contentdetails,related_name = 'nftdetails_buyer', on_delete=models.CASCADE,blank=True,null=True)
	bid_price = models.TextField(blank=True,null=True)
	#end_date = models.TextField(blank=True,null=True)

class traditionaldetails(models.Model):
	created = models.DateTimeField(auto_now_add=True)
	name 	= models.TextField(blank=True,null=True)
	TokenId = models.TextField(blank=True,null=True)
	accountAddress = models.TextField(blank=True,null=True)
	bid_price = models.TextField(blank=True,null=True)

class Bidderdetails(models.Model):
	created = models.DateTimeField(auto_now_add=True)
	name 	= models.TextField(blank=True,null=True)
	age = models.TextField(blank=True,null=True)
	nftdetails = models.ForeignKey(contentdetails,related_name = 'nftdetails', on_delete=models.CASCADE,blank=True,null=True)
	bid_price = models.TextField(blank=True,null=True)

class Buyingdetails(models.Model):
	created = models.DateTimeField(auto_now_add=True)
	TokenId 	= models.TextField(blank=True,null=True)
	accountAddress = models.TextField(blank=True,null=True)
	imageurl = models.TextField(blank=True,null=True)
	#nftdetails = models.ForeignKey(contentdetails,related_name = 'traditional_buyer', on_delete=models.CASCADE,blank=True,null=True)
	name = models.TextField(blank=True,null=True)
	nftname = models.TextField(blank=True,null=True)
	price = models.TextField(blank=True,null=True)