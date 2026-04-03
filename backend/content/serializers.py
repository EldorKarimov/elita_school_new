import re
from rest_framework import serializers
from .models import GalleryCategory, Gallery, NewsCategory, News, NewsImage, Tag, BlogCategory, Blog, FAQ, SchoolHighlight

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

class GalleryCategoryListSerializer(serializers.ModelSerializer):
    """Faqat filter uchun — rasmlarsiz"""
    images_count = serializers.IntegerField(source='images.count', read_only=True)

    class Meta:
        model = GalleryCategory
        fields = ('uuid', 'name', 'images_count')

class GalleryImageSerializer(serializers.ModelSerializer):
    """Paginated rasmlar uchun — category ma'lumoti bilan"""
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_uuid = serializers.UUIDField(source='category.uuid', read_only=True)

    class Meta:
        model = Gallery
        fields = ('uuid', 'title', 'image', 'category_uuid', 'category_name', 'created_at')


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
        fields = ('uuid', 'category', 'title', 'slug', 'main_image', 'views_count', 'publish_date', 'created_at')

class NewsDetailSerializer(serializers.ModelSerializer):
    """Yangilikning to'liq ma'lumotlari uchun"""
    category = NewsCategorySerializer(read_only=True)
    additional_images = NewsImageSerializer(many=True, read_only=True)

    class Meta:
        model = News
        fields = (
            'uuid', 'category', 'title', 'slug', 'content', 
            'main_image', 'additional_images', 'views_count', 'publish_date', 'created_at'
        )


# --- BLOG SERIALIZERS ---
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('uuid', 'name', 'slug')


class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = ('uuid', 'name', 'slug')


class BlogAuthorSerializer(serializers.Serializer):
    uuid = serializers.UUIDField()
    full_name = serializers.CharField()
    image = serializers.ImageField()
    position = serializers.CharField()


class BlogListSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    category = BlogCategorySerializer(read_only=True)
    author = BlogAuthorSerializer(read_only=True)
    excerpt = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = ('uuid', 'title', 'slug', 'image', 'category', 'author', 'tags', 'excerpt', 'created_at')

    def get_excerpt(self, obj):
        import re
        text = re.sub(r'<[^>]+>', ' ', obj.content or '')
        text = re.sub(r'\s+', ' ', text).strip()
        return text[:250] + '…' if len(text) > 250 else text


class BlogDetailSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    category = BlogCategorySerializer(read_only=True)
    author = BlogAuthorSerializer(read_only=True)

    class Meta:
        model = Blog
        fields = ('uuid', 'title', 'slug', 'content', 'image', 'category', 'author', 'tags', 'created_at')

# --- SCHOOL HIGHLIGHT SERIALIZERS ---
class SchoolHighlightSerializer(serializers.ModelSerializer):
    youtube_id = serializers.SerializerMethodField()

    class Meta:
        model = SchoolHighlight
        fields = ('uuid', 'title', 'youtube_link', 'youtube_id', 'order')

    def get_youtube_id(self, obj):
        patterns = [
            r'(?:youtube\.com/watch\?v=|youtu\.be/|youtube\.com/embed/|youtube\.com/shorts/)([a-zA-Z0-9_-]{11})',
        ]
        for p in patterns:
            m = re.search(p, obj.youtube_link)
            if m:
                return m.group(1)
        return None


# --- FAQ SERIALIZERS ---
class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ('uuid', 'question', 'answer', 'order')
