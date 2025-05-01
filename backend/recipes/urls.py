from django.urls import path
from .views import CategoryListAPIView, RecipeListAPIView, RecipeDetailAPIView
from .views import FavoriteViewSet
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('categories/', CategoryListAPIView.as_view(), name='category-list'),
    path('recipes/', RecipeListAPIView.as_view(), name='recipe-list'),
    path('recipes/<int:pk>/', RecipeDetailAPIView.as_view(), name='recipe-detail'),
]


router = DefaultRouter()
router.register(r'favorites', FavoriteViewSet, basename='favorite')

urlpatterns += router.urls
