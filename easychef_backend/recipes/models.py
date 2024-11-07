from django.db import models
from accounts.models import CustomUser
# Create your models here.


class Ingredient(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=250)
    unit = models.CharField(max_length=20)


class IngredientQuantity(models.Model):
    id = models.BigAutoField(primary_key=True)
    quantity = models.IntegerField()
    recipe = models.ForeignKey('Recipe', related_name='ingredient_quantity', null=True,on_delete=models.SET_NULL)
    ingredient = models.ForeignKey(to=Ingredient, related_name='ingredient_quantity', null=True,on_delete=models.SET_NULL)


class Recipe(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=250)
    image = models.ImageField(upload_to='', null=True)
    description = models.TextField(max_length=1000)
    cuisine = models.CharField(max_length=50)
    ingredients = models.ManyToManyField(IngredientQuantity, related_name='recipes', blank=True)
    cooking_time = models.IntegerField()
    serving = models.IntegerField()
    calorie = models.IntegerField()
    diets = models.CharField(max_length=100)
    direction = models.TextField(max_length=2000)
    creator = models.ForeignKey(to=CustomUser, related_name='recipes', null=True, on_delete=models.SET_NULL)


class Comment(models.Model):
    id = models.BigAutoField(primary_key=True)
    message = models.CharField(max_length=550)
    recipe = models.ForeignKey(to=Recipe, related_name='comments', null=True,on_delete=models.SET_NULL)
    owner = models.ForeignKey(to=CustomUser, related_name='comments', null=True,on_delete=models.SET_NULL)


class Favorite(models.Model):
    id = models.BigAutoField(primary_key=True)
    recipe = models.ForeignKey(to=Recipe, related_name='favorites', null=True,on_delete=models.SET_NULL)
    owner = models.ForeignKey(to=CustomUser, related_name='favorites', null=True,on_delete=models.SET_NULL)


class Rating(models.Model):
    id = models.BigAutoField(primary_key=True)
    rate = models.IntegerField()
    recipe = models.ForeignKey(to=Recipe, related_name='ratings', null=True,on_delete=models.SET_NULL)
    owner = models.ForeignKey(to=CustomUser, related_name='ratings', null=True,on_delete=models.SET_NULL)
    
    
class ShoppingList(models.Model):
    id = models.BigAutoField(primary_key=True)
    ingredients = models.ManyToManyField(IngredientQuantity, blank=True)
    owner = models.ForeignKey(to=CustomUser, related_name='shoppinglist', null=True,on_delete=models.SET_NULL)
