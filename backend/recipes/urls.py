from django.urls import path
from .views import CategoryListAPIView, RecipeListAPIView, RecipeDetailAPIView
from .views import FavoriteViewSet
from rest_framework.routers import DefaultRouter

from .views import FavoriteAPIView, IsFavoriteAPIView  # Добавьте этот импорт

urlpatterns = [
    path('categories/', CategoryListAPIView.as_view(), name='category-list'),
    path('recipes/', RecipeListAPIView.as_view(), name='recipe-list'),
    path('recipes/<int:pk>/', RecipeDetailAPIView.as_view(), name='recipe-detail'),
    path('recipes/<int:recipe_id>/is_favorite/', IsFavoriteAPIView.as_view(), name='is_favorite'),
    path('api/favorites/', FavoriteAPIView.as_view(), name='favorites'),
]


router = DefaultRouter()
router.register(r'favorites', FavoriteViewSet, basename='favorite')

urlpatterns += router.urls
