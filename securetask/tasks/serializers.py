from rest_framework import serializers
from .models import Task
from accounts.serializers import UserSerializer
from accounts.models import User

class TaskSerializer(serializers.ModelSerializer):
    assigned_to = UserSerializer(read_only=True)
    assigned_to_id = serializers.PrimaryKeyRelatedField(
        source='assigned_to',
        queryset=User.objects.all(),
        write_only=True,
        required=False,
        allow_null=True
    )
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'project',
            'assigned_to', 'assigned_to_id', 'created_by',
            'priority', 'status', 'due_date',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_by', 'created_at', 'updated_at']