from django.contrib import admin
from recipes.models import Ingredient, IngredientQuantity, Rating, Recipe, Comment, Favorite,ShoppingList

admin.site.register(IngredientQuantity)
admin.site.register(Ingredient)
admin.site.register(Rating)
admin.site.register(Recipe)
admin.site.register(Comment)
admin.site.register(Favorite)
admin.site.register(ShoppingList)