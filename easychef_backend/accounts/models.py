from django.db import models

from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    id = models.BigAutoField(primary_key=True)
    avatar = models.CharField(max_length=999,
                              default='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.alamy.com%2Fchef-in-a-cooking-hat-vector-outline-logo-kitchen-simple-black-icon-image416887185.html&psig=AOvVaw315WQg6WqKdghGsNG66ZpV&ust=1680882514639000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPCzpLvNlf4CFQAAAAAdAAAAABAv')
    phone_number = models.CharField(max_length=20)
    skill_level = models.CharField(max_length=99, default='----')

    REQUIRED_FIELDS = []

    class DoesNotExist(Exception):
        pass
