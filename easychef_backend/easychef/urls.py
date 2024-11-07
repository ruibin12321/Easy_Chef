"""easychef URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from accounts import views as accounts_views
from recipes import views as recipes_views
from django.conf import settings
from django.conf.urls.static import static
from accounts.views import CustomTokenObtainPairView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    #path('api/token/',TokenObtainPairView.as_view(), name='token_access'),
    path('api/token/refresh/',TokenRefreshView.as_view(), name='token_refresh'),
    path('api/accounts/', accounts_views.AccountAPIView.as_view()),
    path('api/accounts/<int:user_id>/', accounts_views.AccountDetailAPIView.as_view()),
    path('api/accounts/<int:user_id>/update/', accounts_views.AccountUpdateAPIView.as_view()),
    path('api/accounts/<int:user_id>/myrecipes/', accounts_views.AccountDetailMyRecipesAPIView.as_view()),
    path('api/accounts/<int:user_id>/favoriterecipes/', accounts_views.AccountDetailFavoriteRecipesAPIView.as_view()),
    path('api/accounts/<int:user_id>/interactedrecipe/', accounts_views.InteractRecipeAPIView.as_view()),
    
    path('api/recipes/', recipes_views.RecipeAPIView.as_view()),
    path('api/recipes/<int:recipeid>/', recipes_views.RecipeUpdateAPIView.as_view()),
    path('api/recipes/<int:recipeid>/ingredients/', recipes_views.get_ingredient),


    path('api/ingredients/<int:ingredientid>/', recipes_views.IngredientsUpdateAPIView.as_view()),
    path('api/ingredients/', recipes_views.IngredientsAPIView.as_view()),

    path('api/comments/', recipes_views.CommentsAPIView.as_view()),
    path('api/comments/<int:comment_id>/', recipes_views.CommentsAPIView.as_view()),
    
    path('api/favorites/', recipes_views.FavoriteAPIView.as_view()),
    path('api/favorites/<int:favorite_id>/', recipes_views.FavoriteAPIView.as_view()),

    path('api/rating/', recipes_views.RatingAPIView.as_view()),
    path('api/rating/<int:ratingid>/', recipes_views.RatingAPIView.as_view()),

    path('api/shoppinglist/', recipes_views.ShoppinglistAPIView.as_view()),
    path('api/shoppinglist/<int:shoppinglistid>/', recipes_views.ShoppinglistAPIView.as_view()),
    
    path('api/search/', recipes_views.SearchAPIView.as_view()),
    
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
