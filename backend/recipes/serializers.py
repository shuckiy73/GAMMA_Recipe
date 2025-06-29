from rest_framework import serializers
from .models import Category, Recipe, Favorite

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class RecipeSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Recipe
        fields = '__all__'


class FavoriteSerializer(serializers.ModelSerializer):
    recipe = RecipeSerializer(read_only=True)  # для отображения
    recipe_id = serializers.PrimaryKeyRelatedField(
        queryset=Recipe.objects.all(), source='recipe', write_only=True
    )

    class Meta:
        model = Favorite
        fields = ['id', 'recipe', 'recipe_id']


class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ['id', 'user', 'recipe', 'created_at']
        read_only_fields = ['user']

class FavoriteActionSerializer(serializers.Serializer):
    recipe_id = serializers.IntegerField()