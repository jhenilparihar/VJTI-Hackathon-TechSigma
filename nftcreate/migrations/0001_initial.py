# Generated by Django 3.1 on 2023-02-24 12:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='contentdetails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tokenId', models.TextField(blank=True, null=True)),
                ('tokenName', models.TextField(blank=True, null=True)),
                ('tokenType', models.TextField(blank=True, null=True)),
                ('tokenDesc', models.TextField(blank=True, null=True)),
                ('tokenCategory', models.TextField(blank=True, null=True)),
                ('tokenThumbnailURI', models.TextField(blank=True, null=True)),
                ('price', models.TextField(blank=True, null=True)),
                ('currentOwner', models.TextField(blank=True, null=True)),
                ('previousOwner', models.TextField(blank=True, null=True)),
                ('adult_rate', models.TextField(blank=True, null=True)),
                ('tokenURI', models.TextField(blank=True, null=True)),
                ('tokenImage', models.TextField(blank=True, null=True)),
                ('numberofTransfers', models.TextField(blank=True, null=True)),
                ('mintedBy', models.TextField(blank=True, null=True)),
                ('mintTime', models.TextField(blank=True, null=True)),
                ('tokenOwner', models.TextField(blank=True, null=True)),
                ('forSale', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('title', models.CharField(blank=True, default='', max_length=100)),
                ('body', models.TextField(blank=True, default='')),
                ('youtube_link', models.CharField(blank=True, max_length=250, null=True)),
                ('images_post', models.ImageField(blank=True, null=True, upload_to='')),
                ('owner', models.CharField(blank=True, default='', max_length=100)),
            ],
            options={
                'ordering': ['created'],
            },
        ),
        migrations.CreateModel(
            name='Userdetails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bannerHash', models.TextField(blank=True, null=True)),
                ('imageHash', models.TextField(blank=True, null=True)),
                ('name', models.TextField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('user', models.TextField(blank=True, null=True)),
                ('email', models.TextField(blank=True, null=True)),
                ('timeOfRegistry', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Post_Like',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('owner_key', models.CharField(blank=True, max_length=250, null=True)),
                ('create_date', models.DateTimeField(auto_now_add=True)),
                ('group_post', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='like_post', to='nftcreate.post')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='like_user', to='nftcreate.userdetails')),
            ],
            options={
                'ordering': ['create_date'],
            },
        ),
        migrations.CreateModel(
            name='contentrating',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.TextField(blank=True, max_length=255)),
                ('content', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='contentdetails', to='nftcreate.contentdetails')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='userdetails', to='nftcreate.userdetails')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('body', models.TextField()),
                ('owner_key', models.CharField(blank=True, max_length=250, null=True)),
                ('group_post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments_post', to='nftcreate.post')),
                ('owner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='nftcreate.userdetails')),
            ],
            options={
                'ordering': ['created'],
            },
        ),
    ]
