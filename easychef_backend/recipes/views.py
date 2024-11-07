from django.shortcuts import render
from rest_framework import permissions 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from recipes.serializers import RecipeSerializer, IngredientSerializer, CommentSerializer, FavoriteSerializer, RatingSerializer, ShoppinglistSerializer
from .models import IngredientQuantity, Ingredient, Recipe, Favorite, ShoppingList, Rating, Comment
from django.http import Http404, HttpResponse, JsonResponse
import re
from rest_framework.parsers import MultiPartParser, FormParser
# Create your views here.


class RecipeAPIView(APIView):
    """Create recipe"""
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        ingredientQuantity = []
        ingredients = request.data.get('ingredients')
        for iq in ingredients.split(','):
            ing, quan = int(iq.split(':')[0]), int(iq.split(':')[1])
            try:
                ing_obj = Ingredient.objects.get(id=ing)
            except:
                return Response(
                {"res": "ingredient does not exists"},
                status=status.HTTP_400_BAD_REQUEST)
            iq_obj = IngredientQuantity.objects.create(ingredient=ing_obj, quantity=quan)
            ingredientQuantity.append(iq_obj.id)
        data = {
            'creator': request.user.id,
            'name': request.data.get('name'), 
            'description': request.data.get('description'), 
            'cuisine': request.data.get('cuisine'),
            'ingredients': ingredientQuantity,
            'cooking_time': request.data.get('cooking_time'),
            'serving': request.data.get('serving'),
            'calorie': request.data.get('calorie'),
            'diets': request.data.get('diets'),
            'direction': request.data.get('direction'),
            'image':request.data['image'],
        }
        serializer = RecipeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class RecipeUpdateAPIView(APIView):
    """
    get/update/delete the recipe
    """
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def get_object(self, recipeid):
        try:
            return Recipe.objects.get(id=recipeid)
        except Recipe.DoesNotExist:
            return None
    def put(self, request, recipeid, format=None):
        recipe = self.get_object(recipeid)
        if recipe is None:
            return Response(
                {"res": "recipe does not exists"},
                status=status.HTTP_400_BAD_REQUEST)
        ingredientQuantity = []
        ingredients = request.data.get('ingredients')
        for iq in ingredients.split(','):
            ing, quan = int(iq.split(':')[0]), int(iq.split(':')[1])
            try:
                ing_obj = Ingredient.objects.get(id=ing)
            except:
                return Response(
                {"res": "ingredient does not exists"},
                status=status.HTTP_400_BAD_REQUEST)
            iq_obj = IngredientQuantity.objects.create(ingredient=ing_obj, quantity=quan)
            ingredientQuantity.append(iq_obj.id)
        print(request.data['image'])
        # tempimage = ''
        # if 'image' in request.data:
        #     tempimage = request.data['image']
        data = {
            'name': request.data.get('name'), 
            'description': request.data.get('description'), 
            'cuisine': request.data.get('cuisine'),
            'ingredients': ingredientQuantity,
            'cooking_time': request.data.get('cooking_time'),
            'serving': request.data.get('serving'),
            'calorie': request.data.get('calorie'),
            'diets': request.data.get('diets'),
            'direction': request.data.get('direction')
        }
        if not type(request.data['image']) == str:
            data['image']=request.data['image']
        print(data)
        serializer = RecipeSerializer(recipe, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, recipeid, format=None):
        recipe = self.get_object(recipeid)
        if recipe is None:
            return Response(
                {"res": "recipe does not exists"},
                status=status.HTTP_400_BAD_REQUEST)
        recipe.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get(self, request, recipeid, format=None):
        recipe = self.get_object(recipeid)
        if recipe is None:
            return Response(
                {"res": "recipe does not exists"},
                status=status.HTTP_400_BAD_REQUEST)
                
        serializer = RecipeSerializer(recipe)
        return Response(serializer.data)
    
def get_ingredient(request, recipeid, format=None):
    ingredientLst = []
    try:
        recipe = Recipe.objects.get(id=recipeid)
        ingredients = IngredientQuantity.objects.filter(recipes=recipe)
        for iq in ingredients:
            ingredientLst.append((IngredientSerializer(iq.ingredient).data,iq.quantity))
        print(ingredientLst,recipeid)
        return JsonResponse({"data":ingredientLst},status=200)
    except Recipe.DoesNotExist:
        return JsonResponse(
            {"data": "recipe does not exists"},
            status=status.HTTP_400_BAD_REQUEST)
       


class IngredientsAPIView(APIView):
    """Create ingredients"""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        data = {
            'name': request.data.get('name'), 
            'unit': request.data.get('unit')
        }
        ingredients = Ingredient.objects.filter(name=request.data.get('name'))
        if len(ingredients) != 0 :
            return Response(
                {"res": "ingredient already exists"},
                status=status.HTTP_400_BAD_REQUEST)
        serializer = IngredientSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request):
        ingredients = Ingredient.objects.all()
        serializer = IngredientSerializer(ingredients, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class IngredientsUpdateAPIView(APIView):
    """update/delete/search ingredients"""
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, ingredientid):
        try:
            return Ingredient.objects.get(id=ingredientid)
        except Ingredient.DoesNotExist:
            return None

    def put(self, request, ingredientid, format=None):
        ingredient = self.get_object(ingredientid)
        if ingredient is None:
            return Response(
                {"res": "ingredient does not exists"},
                status=status.HTTP_400_BAD_REQUEST)
        serializer = IngredientSerializer(ingredient, partial=True, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, ingredientid, format=None):
        ingredient = self.get_object(ingredientid)
        if ingredient is None:
            return Response(
                {"res": "ingredient does not exists"},
                status=status.HTTP_400_BAD_REQUEST)
        ingredient.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get(self, request, ingredientid, format=None):
        ingredient = self.get_object(ingredientid)
        if ingredient is None:
            return Response(
                {"res": "ingredient does not exists"},
                status=status.HTTP_400_BAD_REQUEST)
        serializer = IngredientSerializer(ingredient)
        return Response(serializer.data)



class CommentsAPIView(APIView):
    """update/delete/search comments"""
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, comment_id):
        try:
            return Comment.objects.get(id=comment_id)
        except Comment.DoesNotExist:
            return None

    def post(self, request, *args, **kwargs):

        data = {
            'message': request.data.get('message'), 
            'recipe': request.data.get('recipeid'),
            'owner': request.user.id
        }
        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request,comment_id, *args, **kwargs):
        com = self.get_object(comment_id)
        if com is None:
            return Response(
                {"res": "comment does not exists"},
                status=status.HTTP_400_BAD_REQUEST)
        serializer = CommentSerializer(com)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, comment_id, format=None):
        com = self.get_object(comment_id)
        if com is None:
            return Response(
                {"res": "comment does not exists"},
                status=status.HTTP_400_BAD_REQUEST)
        serializer = CommentSerializer(com, partial=True, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, comment_id, format=None):
        com = self.get_object(comment_id)
        if com is None:
            return Response(
                {"res": "comment does not exists"},
                status=status.HTTP_400_BAD_REQUEST)
        com.delete()
        return Response(status=status.HTTP_200_OK)



class FavoriteAPIView(APIView):
    """update/delete/search favorite recipe"""
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self, favorite_id):
        try:
            return Favorite.objects.get(id=favorite_id)
        except Favorite.DoesNotExist:
            return None

    def post(self, request, *args, **kwargs):

        data = {
            'recipe': request.data.get('recipeid'),
            'owner': request.user.id
        }
        serializer = FavoriteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
       
    def delete(self, request, favorite_id, format=None):
        favo = self.get_object(favorite_id)
        if favo is None:
            return Response(
                {"res": "favorite does not exists"},
                status=status.HTTP_400_BAD_REQUEST)
        favo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class RatingAPIView(APIView):
    """create/update/delete/search rating"""
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, ratingid):
        try:
            return Rating.objects.get(id=ratingid)
        except Rating.DoesNotExist:
            return None

    def post(self, request, *args, **kwargs):

        data = {
            'rate': request.data.get('rate'),
            'recipe': request.data.get('recipeid'),
            'owner': request.user.id
        }
        serializer = RatingSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, ratingid, format=None):
        rate = self.get_object(ratingid)
        if rate is None:
            return Response(
                {"res": "rating does not exists"},
                status=status.HTTP_400_BAD_REQUEST)
        serializer = RatingSerializer(rate, partial=True, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, ratingid, format=None):
        rate = self.get_object(ratingid)
        if rate is None:
            return Response(
                {"res": "rating does not exists"},
                status=status.HTTP_400_BAD_REQUEST)
        rate.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get(self, request, ratingid, format=None):
        rate = self.get_object(ratingid)
        if rate is None:
            return Response(
                {"res": "rating does not exists"},
                status=status.HTTP_400_BAD_REQUEST)
        serializer = RatingSerializer(rate)
        return Response(serializer.data)

class ShoppinglistAPIView(APIView):
    """create/update/delete/search shopping list"""
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self, shoppinglistid):
        try:
            return ShoppingList.objects.get(id=shoppinglistid)
        except ShoppingList.DoesNotExist:
            return None

    def post(self, request, *args, **kwargs):
        ingredientQuantity = []
        ingredients = request.data.get('ingredients')
        for iq in ingredients.split(','):
            ing, quan = int(iq.split(':')[0]), int(iq.split(':')[1])
            try:
                ing_obj = Ingredient.objects.get(id=ing)
            except:
                return Response(
                {"res": "ingredient does not exists"},
                status=status.HTTP_400_BAD_REQUEST)
            iq_obj = IngredientQuantity.objects.create(ingredient=ing_obj, quantity=quan)
            ingredientQuantity.append(iq_obj.id)
        data = {
            'ingredients': ingredientQuantity,
            'owner': request.user.id
        }
        serializer = ShoppinglistSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


    def put(self, request, shoppinglistid, format=None):
        shop = self.get_object(shoppinglistid)
        if shop is None:
            return Response(
                {"res": "shoppinglist does not exists"},
                status=status.HTTP_400_BAD_REQUEST)
        ingredientQuantity = []
        ingredients = request.data.get('ingredients')
        for iq in ingredients.split(','):
            ing, quan = int(iq.split(':')[0]), int(iq.split(':')[1])
            try:
                ing_obj = Ingredient.objects.get(id=ing)
            except:
                return Response(
                {"res": "ingredient does not exists"},
                status=status.HTTP_400_BAD_REQUEST)
            iq_obj = IngredientQuantity.objects.create(ingredient=ing_obj, quantity=quan)
            ingredientQuantity.append(iq_obj.id)
        data = {
            'ingredients': ingredientQuantity
        }
        serializer = ShoppinglistSerializer(shop, partial=True, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, shoppinglistid, format=None):
        shop = self.get_object(shoppinglistid)
        if shop is None:
            return Response(
                {"res": "shoppinglist does not exists"},
                status=status.HTTP_400_BAD_REQUEST)
        shop.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get(self, request, shoppinglistid, format=None):
        shop = self.get_object(shoppinglistid)
        if shop is None:
            return Response(
                {"res": "shopping does not exists"},
                status=status.HTTP_400_BAD_REQUEST)
        serializer = ShoppinglistSerializer(shop)
        return Response(serializer.data)


class SearchAPIView(APIView):
    """search recipe"""
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        queryset = Recipe.objects.all()
        name = self.request.query_params.get('name', None)
        id = self.request.query_params.get('creatorid', None)
        if name is not None:
            updated_name = re.escape(name)
            queryset = queryset.filter(name__contains=updated_name)
        if id is not None:
            queryset = queryset.filter(creator=id)
        ingredientid = self.request.query_params.get('ingredientid', None)
        if ingredientid is not None:
            quantitys = IngredientQuantity.objects.filter(ingredient=ingredientid)
            ingredient_item = []
            for item in queryset:
                for stuff in quantitys:
                    if item.ingredients.contains(stuff):
                        ingredient_item.append(item)
            serializer_ingredient = RecipeSerializer(ingredient_item, many=True)
            return Response(serializer_ingredient.data, status=status.HTTP_200_OK)
        else:
            serializer = RecipeSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
    
    