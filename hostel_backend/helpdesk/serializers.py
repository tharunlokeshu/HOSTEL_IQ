# helpdesk/serializers.py

from rest_framework import serializers
from .models import Complaint
from .models import MessFeedback
from .models import OutPassRequest
from .models import Notice
from .models import RoomChangeRequest
from .models import MedicalEmergency
from .models import LostFound



class ComplaintSerializer(serializers.ModelSerializer):
    student_username = serializers.CharField(source='student.username', read_only=True)

    class Meta:
        model = Complaint
        fields = [
            'id', 'student_username', 'title', 'description', 'category',
            'image', 'status', 'room_number', 'admin_comment', 'created_at', 'updated_at'
        ]
        read_only_fields = ['status', 'admin_comment', 'created_at', 'updated_at']

class MessFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = MessFeedback
        fields = '__all__'


class OutPassRequestSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.full_name', read_only=True)
    roll_number = serializers.CharField(source='student.roll_number', read_only=True)

    class Meta:
        model = OutPassRequest
        fields = '__all__'
        read_only_fields = ['student', 'created_at']  # Removed 'status'




class NoticeSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.username')
    
    class Meta:
        model = Notice
        fields = ['id', 'title', 'message', 'created_at', 'created_by']

# helpdesk/serializers.py

# helpdesk/serializers.py

class RoomChangeRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomChangeRequest
        fields = '__all__'
        read_only_fields = ['student', 'status', 'created_at', 'admin_comment']




class MedicalEmergencySerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalEmergency
        fields = '__all__'
        read_only_fields = ['student', 'status', 'created_at']


# helpdesk/serializers.py


class LostFoundSerializer(serializers.ModelSerializer):
    student = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = LostFound
        fields = '__all__'
        read_only_fields = ['student', 'created_at']



