from rest_framework import generics, permissions
from .models import Task
from .serializers import TaskSerializer
from projects.models import Project

class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        project_id = self.kwargs.get('project_id')
        if project_id:
            return Task.objects.filter(project__id=project_id)
        return Task.objects.filter(
            project__owner=user
        ) | Task.objects.filter(project__members=user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(
            project__owner=user
        ) | Task.objects.filter(project__members=user)