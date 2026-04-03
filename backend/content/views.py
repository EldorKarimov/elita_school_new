from django.shortcuts import get_object_or_404
from django.core.cache import cache
from rest_framework.views import APIView

from core.utils import api_response, paginated_response

VIEW_COOLDOWN = 60 * 60 * 24  # 24 soat (sekund)


def _get_client_ip(request) -> str:
    """Proxy orqali ham to'g'ri IP oladi."""
    x_forwarded = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded:
        return x_forwarded.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR', 'unknown')


def record_view(request, model_class, pk) -> bool:
    """
    IP + Redis orqali ko'rishni hisoblaydi.
    Bitta IP dan 24 soat ichida bir marta hisoblanadi.
    True qaytarsa — yangi ko'rish, False — allaqachon ko'rilgan.
    """
    ip = _get_client_ip(request)
    cache_key = f'view:{model_class.__name__}:{pk}:{ip}'

    if cache.get(cache_key):
        return False

    cache.set(cache_key, 1, VIEW_COOLDOWN)
    return True
from core.pagination import CustomPageNumberPagination
from .models import GalleryCategory, Gallery, NewsCategory, News, Tag, BlogCategory, Blog, FAQ, SchoolHighlight
from .serializers import (
    GalleryCategorySerializer, GalleryCategoryListSerializer, GalleryImageSerializer,
    NewsCategorySerializer, NewsListSerializer, NewsDetailSerializer,
    TagSerializer, BlogCategorySerializer, BlogListSerializer, BlogDetailSerializer,
    FAQSerializer, SchoolHighlightSerializer,
)


class NewsCategoryListView(APIView):
    """GET /api/v1/news/categories/"""

    def get(self, request):
        qs = NewsCategory.objects.filter(is_active=True)
        serializer = NewsCategorySerializer(qs, many=True, context={'request': request})
        return api_response(data=serializer.data)


class NewsListView(APIView):
    """
    GET /api/v1/news/
    Query params:
      - category (slug)  : filter by category
    """

    def get(self, request):
        qs = News.objects.filter(is_active=True).select_related('category').order_by('-created_at')
        category_slug = request.query_params.get('category')
        if category_slug:
            qs = qs.filter(category__slug=category_slug)

        paginator = CustomPageNumberPagination()
        page = paginator.paginate_queryset(qs, request)
        serializer = NewsListSerializer(page, many=True, context={'request': request})
        return paginated_response(paginator, serializer)


class NewsDetailView(APIView):
    """
    GET /api/v1/news/<slug>/
    Returns: full news + latest 3 news (excluding current)
    """

    def get(self, request, slug):
        news = get_object_or_404(News, slug=slug, is_active=True)

        # Ko'rishlar soni — sessiya + Redis orqali (24 soatda 1 marta)
        if record_view(request, News, news.pk):
            News.objects.filter(pk=news.pk).update(views_count=news.views_count + 1)
            news.refresh_from_db()

        serializer = NewsDetailSerializer(news, context={'request': request})

        latest_news = News.objects.filter(is_active=True).exclude(pk=news.pk).order_by('-created_at')[:3]
        latest_news_serializer = NewsListSerializer(latest_news, many=True, context={'request': request})

        return api_response(data={
            'news': serializer.data,
            'latest_news': latest_news_serializer.data,
        })


class TagListView(APIView):
    """GET /api/v1/blogs/tags/"""

    def get(self, request):
        qs = Tag.objects.filter(is_active=True)
        serializer = TagSerializer(qs, many=True, context={'request': request})
        return api_response(data=serializer.data)


class BlogCategoryListView(APIView):
    """GET /api/v1/blogs/categories/"""

    def get(self, request):
        qs = BlogCategory.objects.filter(is_active=True)
        serializer = BlogCategorySerializer(qs, many=True, context={'request': request})
        return api_response(data=serializer.data)


class BlogListView(APIView):
    """
    GET /api/v1/blogs/
    Query params:
      - tag      (slug) : filter by tag
      - category (slug) : filter by category
    """

    def get(self, request):
        qs = Blog.objects.filter(is_active=True).select_related('category', 'author').prefetch_related('tags').order_by('-created_at')
        tag_slug = request.query_params.get('tag')
        if tag_slug:
            qs = qs.filter(tags__slug=tag_slug).distinct()
        category_slug = request.query_params.get('category')
        if category_slug:
            qs = qs.filter(category__slug=category_slug)

        paginator = CustomPageNumberPagination()
        page = paginator.paginate_queryset(qs, request)
        serializer = BlogListSerializer(page, many=True, context={'request': request})
        return paginated_response(paginator, serializer)


class BlogDetailView(APIView):
    """
    GET /api/v1/blogs/<slug>/
    Returns: full blog + latest 3 blogs + all tags
    """

    def get(self, request, slug):
        blog = get_object_or_404(Blog, slug=slug, is_active=True)
        serializer = BlogDetailSerializer(blog, context={'request': request})

        latest_blogs = Blog.objects.filter(is_active=True).select_related('category', 'author').exclude(pk=blog.pk).order_by('-created_at')[:3]
        latest_blogs_serializer = BlogListSerializer(latest_blogs, many=True, context={'request': request})

        all_tags = Tag.objects.filter(is_active=True)
        tags_serializer = TagSerializer(all_tags, many=True, context={'request': request})

        return api_response(data={
            'blog': serializer.data,
            'latest_blogs': latest_blogs_serializer.data,
            'all_tags': tags_serializer.data,
        })


class GalleryListView(APIView):
    """
    GET /api/v1/gallery/
    Returns: all active categories with their images (nested)
    """

    def get(self, request):
        qs = GalleryCategory.objects.filter(is_active=True).prefetch_related('images')
        serializer = GalleryCategorySerializer(qs, many=True, context={'request': request})
        return api_response(data=serializer.data)


class GalleryCategoryListView(APIView):
    """
    GET /api/v1/gallery/categories/
    Returns: categories with image count (no nested images)
    """

    def get(self, request):
        qs = GalleryCategory.objects.filter(is_active=True).prefetch_related('images')
        serializer = GalleryCategoryListSerializer(qs, many=True, context={'request': request})
        return api_response(data=serializer.data)


class GalleryImageListView(APIView):
    """
    GET /api/v1/gallery/images/
    Query params:
      - category (uuid) : filter by category
    """

    def get(self, request):
        qs = Gallery.objects.filter(is_active=True).select_related('category').order_by('-created_at')
        category_uuid = request.query_params.get('category')
        if category_uuid:
            qs = qs.filter(category__uuid=category_uuid)

        paginator = CustomPageNumberPagination()
        page = paginator.paginate_queryset(qs, request)
        serializer = GalleryImageSerializer(page, many=True, context={'request': request})
        return paginated_response(paginator, serializer)


class FAQListView(APIView):
    """GET /api/v1/faqs/"""

    def get(self, request):
        qs = FAQ.objects.filter(is_active=True)
        serializer = FAQSerializer(qs, many=True, context={'request': request})
        return api_response(data=serializer.data)


class SchoolHighlightListView(APIView):
    """GET /api/v1/highlights/"""

    def get(self, request):
        qs = SchoolHighlight.objects.filter(is_active=True)
        serializer = SchoolHighlightSerializer(qs, many=True, context={'request': request})
        return api_response(data=serializer.data)
