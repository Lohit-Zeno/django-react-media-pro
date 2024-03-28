from django.db import models
from customuser.models import CustomUser
import uuid

# Create your models here.

class RemovedBg(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    original = models.ImageField(upload_to='images/')
    result = models.ImageField(upload_to='removedbg/')

class Upscale(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    original = models.ImageField(upload_to='images/')
    result = models.ImageField(upload_to='upscale/')

class BlurBg(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    original = models.ImageField(upload_to='images/')
    result = models.ImageField(upload_to='blurbg/')

class FilteredImage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    original = models.ImageField(upload_to='images/')
    result = models.ImageField(upload_to='filtered/')
    
class Convert(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    result = models.ImageField(upload_to='converted/')
    
class DownScale(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    result = models.ImageField(upload_to='downscale/')