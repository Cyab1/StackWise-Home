from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'owner', 'status', 'due_date', 'created_at']
    list_filter = ['status']
    search_fields = ['title', 'owner__email']