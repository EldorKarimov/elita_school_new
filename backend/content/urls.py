from django.urls import path
from . import views

urlpatterns = [
    # News
    path('news/', views.NewsListView.as_view(), name='news-list'),
    path('news/categories/', views.NewsCategoryListView.as_view(), name='news-categories'),
    path('news/<slug:slug>/', views.NewsDetailView.as_view(), name='news-detail'),

    # Blog
    path('blogs/', views.BlogListView.as_view(), name='blog-list'),
    path('blogs/categories/', views.BlogCategoryListView.as_view(), name='blog-categories'),
    path('blogs/tags/', views.TagListView.as_view(), name='blog-tags'),
    path('blogs/<slug:slug>/', views.BlogDetailView.as_view(), name='blog-detail'),

    # Gallery
    path('gallery/', views.GalleryListView.as_view(), name='gallery-list'),
    path('gallery/categories/', views.GalleryCategoryListView.as_view(), name='gallery-categories'),
    path('gallery/images/', views.GalleryImageListView.as_view(), name='gallery-images'),

    # FAQ
    path('faqs/', views.FAQListView.as_view(), name='faq-list'),

    # School Highlights
    path('highlights/', views.SchoolHighlightListView.as_view(), name='highlights-list'),
]
