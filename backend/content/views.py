from django.shortcuts import get_object_or_404
from rest_framework.views import APIView

from core.utils import api_response, paginated_response
from core.pagination import CustomPageNumberPagination
from .models import GalleryCategory, NewsCategory, News, Tag, Blog
from .serializers import (
    GalleryCategorySerializer,
    NewsCategorySerializer, NewsListSerializer, NewsDetailSerializer,
    TagSerializer, BlogListSerializer, BlogDetailSerializer,
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

        # Ko'rishlar sonini oshirish (atomic update)
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


class BlogListView(APIView):
    """
    GET /api/v1/blogs/
    Query params:
      - tag (slug) : filter by tag
    """

    def get(self, request):
        qs = Blog.objects.filter(is_active=True).prefetch_related('tags').order_by('-created_at')
        tag_slug = request.query_params.get('tag')
        if tag_slug:
            qs = qs.filter(tags__slug=tag_slug).distinct()

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

        latest_blogs = Blog.objects.filter(is_active=True).exclude(pk=blog.pk).order_by('-created_at')[:3]
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
