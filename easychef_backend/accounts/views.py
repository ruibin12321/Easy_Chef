from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse, HttpResponseForbidden, Http404
from rest_framework import permissions 
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, ListAPIView, CreateAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status
from accounts.serializers import CustomUserSerializer, CustomUserDeSerializer
from django.contrib.auth.hashers import make_password
from .models import CustomUser
from recipes.models import Recipe, Favorite, Comment, Rating
from recipes.serializers import RecipeSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.views import TokenObtainPairView


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        # Verify user credentials and obtain token
        response = super().post(request, *args, **kwargs)
        access = response.data['access']
        refresh = response.data['refresh']

        # Set user attribute with authenticated user ID
        username = request.data['username']
        user_id = CustomUser.objects.get(username=username).id

        # Return token and user ID in response
        return Response({'access': access, 'refresh': refresh, 'user_id': user_id})

class AccountAPIView(APIView):
    # permission_classes = [permissions.IsAuthenticated]
    """Create Account"""
    def post(self, request, *args, **kwargs):
        data = {
            'email': request.data.get('email'), 
            'username': request.data.get('username'),
            'first_name': request.data.get('firstName'),
            'last_name': request.data.get('lastName'),
            'password': request.data.get('password'),
            'phone_number': request.data.get('phone'),
            'skill_level': request.data.get('skillLevel')
        }

        email = CustomUser.objects.filter(email=request.data.get('email'))
        username = CustomUser.objects.filter(username=request.data.get('username'))
        if email.exists() or username.exists():
            return Response(
                {"res": "user already exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = CustomUserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class AccountDetailAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    """Get/Delete account by id"""
    def get_object(self, user_id):
        try:
            return CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Http404

    def get(self, request, user_id, *args, **kwargs):
        user = self.get_object(user_id)
        if not user:
            return Response(
                {"res": "user does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = CustomUserDeSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, user_id, format=None):
        user = self.get_object(user_id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AccountUpdateAPIView(UpdateAPIView):
    """update account by id"""
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def put(self, request, *args, **kwargs):
        user_id = kwargs.get('pk')
        try:
            user = CustomUser.objects.get(pk=user_id)
        except CustomUser.DoesNotExist:
            raise NotFound()

        serializer = self.get_serializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


class CustomPagination(PageNumberPagination):
    """pagination"""
    page_size = 10 
    page_size_query_param = 'page_size'  
    max_page_size = 100  
    page_query_param = 'page'


class AccountDetailMyRecipesAPIView(ListAPIView):
    """Get recipe by user's id"""
    pagination_class = CustomPagination
    serializer_class = RecipeSerializer

    def get(self, request, user_id, *args, **kwargs):
        recipes = Recipe.objects.filter(creator=user_id)
        serializer = RecipeSerializer(recipes, many=True)

        return Response(serializer.data,status=status.HTTP_200_OK)


class AccountDetailFavoriteRecipesAPIView(ListAPIView): 
    """Get favorite recipe by user's id"""  
    pagination_class = CustomPagination
    serializer_class = RecipeSerializer
    
    def get(self, request, user_id, *args, **kwargs):
        favorites = Favorite.objects.filter(owner=user_id)
        recipes = []
        for each in favorites:
            if each.recipe is not None:
                recipes.append(each.recipe)
        
        #recipes = Recipe.objects.filter(creator = user_id)
        serializer = RecipeSerializer(recipes, many=True)

        return Response(serializer.data,status=status.HTTP_200_OK)



class LogoutAPIView(ListAPIView):
    """log user out"""
    def logout_view(request):
        logout(request)
        return HttpResponse('logout success')

class InteractRecipeAPIView(ListAPIView):   
    """search user's 
       - favorites recipes 
       - comments
       - rating
        by user's id"""
    pagination_class = CustomPagination
    serializer_class = RecipeSerializer
    
    def get(self, request, user_id, *args, **kwargs):
        comments = Comment.objects.filter(owner=user_id)
        rating = Rating.objects.filter(owner=user_id)
        favorites = Favorite.objects.filter(owner=user_id)
        recipes = []
        for each in favorites:
            if each.recipe is not None:
                recipes.append(each.recipe)
        for item in comments:
            if item.recipe is not None and item.recipe not in recipes:
                recipes.append(item.recipe)
        for stuff in rating:
            if stuff.recipe is not None and stuff.recipe not in recipes:
                recipes.append(stuff.recipe)
        
        #recipes = Recipe.objects.filter(creator = user_id)
        serializer = RecipeSerializer(recipes, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)




