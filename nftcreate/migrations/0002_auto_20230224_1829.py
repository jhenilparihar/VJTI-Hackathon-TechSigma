# Generated by Django 3.1 on 2023-02-24 12:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('nftcreate', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='owner',
        ),
        migrations.RemoveField(
            model_name='post_like',
            name='owner',
        ),
    ]
