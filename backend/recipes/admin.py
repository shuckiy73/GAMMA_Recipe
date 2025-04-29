from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Recipe

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'category', 'created_at', 'thumbnail')
    readonly_fields = ('preview',)
    search_fields = ('title',)
    list_filter = ('category',)

    def thumbnail(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="70" height="50" style="object-fit:cover;" />', obj.image.url)
        return '—'
    thumbnail.short_description = 'Превью'

    def preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="300" style="object-fit:contain;" />', obj.image.url)
        return 'Нет изображения'
    preview.short_description = 'Изображение'
