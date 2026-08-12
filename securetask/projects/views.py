from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Project
from .serializers import ProjectSerializer

class ProjectListCreateView(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Project.objects.filter(
            owner=user
        ) | Project.objects.filter(members=user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Project.objects.filter(
            owner=user
        ) | Project.objects.filter(members=user)

class ProjectAddMemberView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            project = Project.objects.get(pk=pk, owner=request.user)
        except Project.DoesNotExist:
            return Response({'error': 'Project not found or not authorized'}, status=404)

        user_id = request.data.get('user_id')
        try:
            from accounts.models import User
            member = User.objects.get(pk=user_id)
            project.members.add(member)
            return Response({'message': f'{member.email} added to project'})
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)