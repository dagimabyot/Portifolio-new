from django.contrib import admin

from .models import Project, Testimonial, Lead, SiteSettings


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'status', 'featured', 'order', 'updated_at']
    list_filter = ['category', 'status', 'featured']
    search_fields = ['title', 'description']


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['name', 'company', 'role', 'order']
    search_fields = ['name', 'company']


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ['subject', 'name', 'email', 'read', 'created_at']
    list_filter = ['read']
    search_fields = ['name', 'email', 'subject', 'message']


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ['name', 'brand_name', 'email']

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()
