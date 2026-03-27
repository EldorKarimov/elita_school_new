from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import status

from core.utils import api_response, error_response
from .models import Teacher, About, Statistic, Contact
from .serializers import (
    TeacherListSerializer, TeacherDetailSerializer,
    AboutSerializer, StatisticSerializer, ContactCreateSerializer,
)
from content.models import News, Blog, GalleryCategory
from content.serializers import (
    NewsListSerializer, BlogListSerializer, GalleryCategorySerializer,
)


class HomepageView(APIView):
    """
    GET /api/v1/home/
    Returns a single consolidated response for the homepage:
      - statistics
      - latest_news (4 ta)
      - latest_blogs (4 ta)
      - teachers (6 ta, order bo'yicha)
      - gallery (4 ta kategoriya, rasmlar bilan)
    """

    def get(self, request):
        statistics = Statistic.objects.filter(is_active=True)
        statistics_data = StatisticSerializer(statistics, many=True, context={'request': request}).data

        latest_news = News.objects.filter(is_active=True).select_related('category').order_by('-created_at')[:4]
        latest_news_data = NewsListSerializer(latest_news, many=True, context={'request': request}).data

        latest_blogs = Blog.objects.filter(is_active=True).prefetch_related('tags').order_by('-created_at')[:4]
        latest_blogs_data = BlogListSerializer(latest_blogs, many=True, context={'request': request}).data

        teachers = Teacher.objects.filter(is_active=True).prefetch_related('sciences').order_by('order')[:6]
        teachers_data = TeacherListSerializer(teachers, many=True, context={'request': request}).data

        gallery = GalleryCategory.objects.filter(is_active=True).prefetch_related('images')[:4]
        gallery_data = GalleryCategorySerializer(gallery, many=True, context={'request': request}).data

        return api_response(data={
            'statistics': statistics_data,
            'latest_news': latest_news_data,
            'latest_blogs': latest_blogs_data,
            'teachers': teachers_data,
            'gallery': gallery_data,
        })


class AboutView(APIView):
    """GET /api/v1/about/"""

    def get(self, request):
        about = About.objects.filter(is_active=True).first()
        if not about:
            return api_response(data=None)
        serializer = AboutSerializer(about, context={'request': request})
        return api_response(data=serializer.data)


class StatisticListView(APIView):
    """GET /api/v1/statistics/"""

    def get(self, request):
        qs = Statistic.objects.filter(is_active=True)
        serializer = StatisticSerializer(qs, many=True, context={'request': request})
        return api_response(data=serializer.data)


class TeacherListView(APIView):
    """
    GET /api/v1/teachers/
    Query params:
      - type : 'management' | 'teacher'  (filter by teacher type)
    """

    def get(self, request):
        qs = Teacher.objects.filter(is_active=True).prefetch_related('sciences').order_by('order')
        teacher_type = request.query_params.get('type')
        if teacher_type:
            qs = qs.filter(type=teacher_type)
        serializer = TeacherListSerializer(qs, many=True, context={'request': request})
        return api_response(data=serializer.data)


class TeacherDetailView(APIView):
    """
    GET /api/v1/teachers/<uuid>/
    Returns: teacher full info + lessons + schedule
    """

    def get(self, request, uuid):
        teacher = get_object_or_404(Teacher, uuid=uuid, is_active=True)
        serializer = TeacherDetailSerializer(teacher, context={'request': request})
        return api_response(data=serializer.data)


class ContactCreateView(APIView):
    """
    POST /api/v1/contact/
    Body: { full_name, phone, subject (optional), message }
    """

    def post(self, request):
        serializer = ContactCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return api_response(
                data={'message': "Xabaringiz muvaffaqiyatli yuborildi!"},
                status_code=status.HTTP_201_CREATED,
            )
        return error_response(errors=serializer.errors, status_code=400)
