from rest_framework import serializers
from accounts.models import CustomUser
from django.db import models


class CustomUserSerializer(serializers.ModelSerializer):
    id = models.BigAutoField(primary_key=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', "email", "first_name",
                  "last_name", "password", "phone_number", "skill_level"]

    def validate_phone_number(self, value):
        return value

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password'],
            phone_number=validated_data['phone_number'],
            skill_level=validated_data['skill_level']
        )
        return user


class CustomUserDeSerializer(serializers.ModelSerializer):
    avatar = models.FilePathField()
    phone_number = models.CharField(max_length=20)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', "email", "first_name", "last_name", "phone_number", "skill_level"]

