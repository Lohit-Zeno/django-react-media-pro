# Generated by Django 5.0.3 on 2024-03-26 15:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('image', '0006_rename_image_uploadimage'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Upscale',
        ),
    ]
