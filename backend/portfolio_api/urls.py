from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('projects', views.ProjectViewSet, basename='project')
router.register('testimonials', views.TestimonialViewSet, basename='testimonial')
router.register('leads', views.LeadViewSet, basename='lead')

urlpatterns = [
    path('', include(router.urls)),
    path('settings/', views.SiteSettingsView.as_view(), name='site-settings'),
    path('auth/login/', views.login_view, name='login'),
    path('auth/logout/', views.logout_view, name='logout'),
    path('auth/me/', views.me_view, name='me'),
]
