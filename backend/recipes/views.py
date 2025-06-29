from rest_framework import generics
from .models import Category, Recipe
from .serializers import CategorySerializer, RecipeSerializer
from rest_framework.filters import SearchFilter
from .serializers import FavoriteSerializer
from rest_framework import viewsets, permissions
from .models import Favorite

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import FavoriteSerializer, FavoriteActionSerializer

class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class RecipeListAPIView(generics.ListAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    filter_backends = [SearchFilter]
    search_fields = ['title']

class RecipeDetailAPIView(generics.RetrieveAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer


class FavoriteViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class FavoriteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        favorites = Favorite.objects.filter(user=request.user)
        serializer = FavoriteSerializer(favorites, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = FavoriteActionSerializer(data=request.data)
        if serializer.is_valid():
            recipe_id = serializer.validated_data['recipe_id']
            favorite, created = Favorite.objects.get_or_create(
                user=request.user,
                recipe_id=recipe_id
            )
            if created:
                return Response({'status': 'added'}, status=status.HTTP_201_CREATED)
            return Response({'status': 'already exists'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        serializer = FavoriteActionSerializer(data=request.data)
        if serializer.is_valid():
            Favorite.objects.filter(
                user=request.user,
                recipe_id=serializer.validated_data['recipe_id']
            ).delete()
            return Response({'status': 'removed'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Favorite
from .serializers import FavoriteSerializer, FavoriteActionSerializer

class FavoriteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        favorites = Favorite.objects.filter(user=request.user)
        serializer = FavoriteSerializer(favorites, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = FavoriteActionSerializer(data=request.data)
        if serializer.is_valid():
            recipe_id = serializer.validated_data['recipe_id']
            favorite, created = Favorite.objects.get_or_create(
                user=request.user,
                recipe_id=recipe_id
            )
            if created:
                return Response({'status': 'added'}, status=status.HTTP_201_CREATED)
            return Response({'status': 'already exists'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        serializer = FavoriteActionSerializer(data=request.data)
        if serializer.is_valid():
            Favorite.objects.filter(
                user=request.user,
                recipe_id=serializer.validated_data['recipe_id']
            ).delete()
            return Response({'status': 'removed'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class IsFavoriteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, recipe_id):
        is_favorite = Favorite.objects.filter(
            user=request.user,
            recipe_id=recipe_id
        ).exists()
        return Response({'is_favorite': is_favorite})