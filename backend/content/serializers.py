from rest_framework import serializers
from .models import GalleryCategory, Gallery, NewsCategory, News, NewsImage, Tag, Blog

# --- GALLERY SERIALIZERS ---
class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = ('uuid', 'title', 'image', 'created_at')

class GalleryCategorySerializer(serializers.ModelSerializer):
    # Kategoriya ichida uning rasmlarini ham qaytarish (nested)
    images = GallerySerializer(many=True, read_only=True)

    class Meta:
        model = GalleryCategory
        fields = ('uuid', 'name', 'images')


# --- NEWS SERIALIZERS ---
class NewsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsCategory
        fields = ('uuid', 'name', 'slug')

class NewsImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsImage
        fields = ('uuid', 'image')

class NewsListSerializer(serializers.ModelSerializer):
    """Yangiliklar ro'yxati uchun (Content chiqarilmaydi, trafikni tejash uchun)"""
    category = NewsCategorySerializer(read_only=True)

    class Meta:
        model = News
        fields = ('uuid', 'category', 'title', 'slug', 'main_image', 'views_count', 'created_at')

class NewsDetailSerializer(serializers.ModelSerializer):
    """Yangilikning to'liq ma'lumotlari uchun"""
    category = NewsCategorySerializer(read_only=True)
    additional_images = NewsImageSerializer(many=True, read_only=True)

    class Meta:
        model = News
        fields = (
            'uuid', 'category', 'title', 'slug', 'content', 
            'main_image', 'additional_images', 'views_count', 'created_at'
        )


# --- BLOG SERIALIZERS ---
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('uuid', 'name', 'slug')

class BlogListSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Blog
        fields = ('uuid', 'title', 'slug', 'image', 'author', 'tags', 'created_at')

class BlogDetailSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Blog
        fields = ('uuid', 'title', 'slug', 'content', 'image', 'author', 'tags', 'created_at')