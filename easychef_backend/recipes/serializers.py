from rest_framework import serializers
from recipes.models import Recipe, Ingredient, Comment, Favorite, Rating, ShoppingList
from django.db import models


class RecipeSerializer(serializers.ModelSerializer):
    image=serializers.ImageField()
    class Meta:
        model = Recipe
        fields = ['id','name', 'image','description', 'cuisine', 'ingredients', 'cooking_time', 'serving', 'calorie', 'diets', 'direction', 'creator']


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id','name','unit']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['message','id','recipe','owner']

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ['id','recipe','owner']

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['id','rate', 'recipe','owner']


class ShoppinglistSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoppingList
        fields = ['id','ingredients','owner']
