from rest_framework import serializers
from .models import Project
from accounts.serializers import UserSerializer

class ProjectSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    members = UserSerializer(many=True, read_only=True)
    task_count = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'status',
            'owner', 'members', 'due_date',
            'task_count', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'owner', 'created_at', 'updated_at']

    def get_task_count(self, obj):
        return obj.tasks.count()