from django.urls import path
from . import views

urlpatterns = [
    # Homepage (consolidated)
    path('home/', views.HomepageView.as_view(), name='homepage'),

    # About
    path('about/', views.AboutView.as_view(), name='about'),

    # Statistics
    path('statistics/', views.StatisticListView.as_view(), name='statistics'),

    # Teachers
    path('teachers/', views.TeacherListView.as_view(), name='teacher-list'),
    path('teachers/<uuid:uuid>/', views.TeacherDetailView.as_view(), name='teacher-detail'),

    # Contact
    path('contact/', views.ContactCreateView.as_view(), name='contact'),
]
