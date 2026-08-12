from django.urls import path
from .views import ProjectListCreateView, ProjectDetailView, ProjectAddMemberView

urlpatterns = [
    path('', ProjectListCreateView.as_view(), name='project_list_create'),
    path('<int:pk>/', ProjectDetailView.as_view(), name='project_detail'),
    path('<int:pk>/add-member/', ProjectAddMemberView.as_view(), name='project_add_member'),
]