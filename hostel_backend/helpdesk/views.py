from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import MessFeedback
from .serializers import MessFeedbackSerializer
from helpdesk.models import Complaint
from helpdesk.serializers import ComplaintSerializer
from .models import OutPassRequest
from .serializers import OutPassRequestSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework import status
from .models import OutPassRequest
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Notice
from .serializers import NoticeSerializer
from rest_framework import generics, permissions
from .models import RoomChangeRequest
from .serializers import RoomChangeRequestSerializer
from .models import MedicalEmergency
from .serializers import MedicalEmergencySerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from users.models import CustomUser
from helpdesk.models import Complaint, OutPassRequest, RoomChangeRequest, MedicalEmergencyReport
from rest_framework.decorators import api_view, permission_classes
from .models import LostFound
from .serializers import LostFoundSerializer
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.http import HttpResponse
import pandas as pd
from .models import Complaint, OutPassRequest, RoomChangeRequest, MedicalEmergencyReport, LostAndFound, MessFeedback

from rest_framework.permissions import AllowAny
from rest_framework import generics
from .serializers import ComplaintSerializer

# helpdesk/views.py
# helpdesk/views.py
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import ComplaintSerializer

# helpdesk/views.py
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from .models import Complaint

# helpdesk/views.py
from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import Complaint
from .serializers import ComplaintSerializer

# Authenticated complaint submission
class SubmitComplaintView(generics.CreateAPIView):
    serializer_class = ComplaintSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Attach the logged-in student automatically
        serializer.save(student=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=201)


@csrf_exempt
def submit_complaint_anonymous(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            complaint = Complaint.objects.create(
                title=data.get("title", ""),
                description=data.get("description", ""),
                category=data.get("category", ""),
                room_number=data.get("room_number", ""),
                student=None,  # anonymous
            )
            return JsonResponse({
                "id": complaint.id,
                "student_username": None,
                "title": complaint.title,
                "description": complaint.description,
                "category": complaint.category,
                "room_number": complaint.room_number,
                "status": complaint.status,
                "admin_comment": complaint.admin_comment,
                "created_at": complaint.created_at,
                "updated_at": complaint.updated_at
            }, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid method"}, status=405)




# ✅ 👨‍🎓 Student: View My Complaints
class MyComplaintsView(generics.ListAPIView):
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Complaint.objects.filter(student=self.request.user).order_by('-created_at')


# ✅ 👨‍🎓 Student: Complaint History (Resolved Only)
class StudentComplaintHistoryView(generics.ListAPIView):
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Complaint.objects.filter(
            student=self.request.user, status='resolved'
        ).order_by('-updated_at')


# ✅ 👩‍💼 Admin: View All Complaints
class AdminComplaintListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_admin:
            return Response({"detail": "Not authorized"}, status=status.HTTP_403_FORBIDDEN)

        complaints = Complaint.objects.all().order_by('-created_at')
        serializer = ComplaintSerializer(complaints, many=True)
        return Response(serializer.data)


# ✅ 👩‍💼 Admin: View Resolved Complaints Only (History)
class AdminComplaintHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_admin:
            return Response({"detail": "Not authorized"}, status=status.HTTP_403_FORBIDDEN)

        resolved_complaints = Complaint.objects.filter(status='resolved').order_by('-updated_at')
        serializer = ComplaintSerializer(resolved_complaints, many=True)
        return Response(serializer.data)


class AdminUpdateComplaintView(generics.UpdateAPIView):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        complaint = self.get_object()
        if not request.user.is_admin:
            return Response({"detail": "Not authorized"}, status=status.HTTP_403_FORBIDDEN)

        status_value = request.data.get("status")
        if status_value:
            complaint.status = status_value
            complaint.admin_comment = request.data.get("admin_comment", complaint.admin_comment)
            complaint.save()
            return Response({"detail": "Complaint updated successfully."})
        return Response({"detail": "Status not provided."}, status=status.HTTP_400_BAD_REQUEST)


class StudentComplaintHistoryView(generics.ListAPIView):
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Complaint.objects.filter(student=self.request.user).order_by('-created_at')
    

class MessFeedbackView(APIView):
    def post(self, request):
        serializer = MessFeedbackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Feedback submitted successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MessFeedbackListView(APIView):  # Optional for admin viewing
    def get(self, request):
        feedbacks = MessFeedback.objects.all().order_by('-created_at')
        serializer = MessFeedbackSerializer(feedbacks, many=True)
        return Response(serializer.data)


class OutPassRequestCreateView(generics.CreateAPIView):
    queryset = OutPassRequest.objects.all()
    serializer_class = OutPassRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        from django.db import transaction

        # Debug: Print all request data
        print(f"DEBUG: All request data: {self.request.data}")
        print(f"DEBUG: Request data type: {type(self.request.data)}")

        # Get the roll_number from the request data
        roll_number = self.request.data.get('roll_number')
        print(f"DEBUG: Roll number from request: '{roll_number}'")
        print(f"DEBUG: Roll number type: {type(roll_number)}")

        try:
            with transaction.atomic():
                # Save the roll_number to the user's profile if provided
                if roll_number and roll_number.strip():
                    print(f"DEBUG: Saving roll_number '{roll_number.strip()}' to user {self.request.user.username}")
                    print(f"DEBUG: User roll_number before save: {self.request.user.roll_number}")
                    self.request.user.roll_number = roll_number.strip()
                    self.request.user.save(update_fields=['roll_number'])
                    print(f"DEBUG: User roll_number after save: {self.request.user.roll_number}")

                    # Verify the save worked
                    self.request.user.refresh_from_db()
                    print(f"DEBUG: User roll_number after refresh: {self.request.user.roll_number}")
                else:
                    print(f"DEBUG: Roll number is empty or None")

                # Save the outpass request
                outpass_request = serializer.save(student=self.request.user)
                print(f"DEBUG: Outpass request saved with ID: {outpass_request.id}")
                print(f"DEBUG: Outpass request student roll_number: {outpass_request.student.roll_number}")

                # Also check the serializer data
                serializer_data = serializer.data
                print(f"DEBUG: Serializer data roll_number: {serializer_data.get('roll_number')}")
        except Exception as e:
            # Log the error for debugging
            print(f"Error saving outpass request: {str(e)}")
            print(f"Roll number: {roll_number}")
            print(f"User: {self.request.user.username}")
            raise

class OutPassRequestListView(generics.ListAPIView):
    queryset = OutPassRequest.objects.all().order_by('-created_at')
    serializer_class = OutPassRequestSerializer
    permission_classes = [permissions.IsAdminUser]

class OutPassRequestUpdateView(generics.UpdateAPIView):
    queryset = OutPassRequest.objects.all()
    serializer_class = OutPassRequestSerializer
    permission_classes = [permissions.IsAdminUser]
    http_method_names = ['patch', 'put', 'get']  # Allow PATCH and PUT



class StudentOutPassListView(generics.ListAPIView):
    serializer_class = OutPassRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return OutPassRequest.objects.filter(student=self.request.user).order_by('-created_at')


class DeleteAllOutPassRequestsView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def delete(self, request):
        count, _ = OutPassRequest.objects.all().delete()
        return Response(
            {"message": f"Deleted {count} out pass requests."},
            status=status.HTTP_204_NO_CONTENT
        )
        
        


class CreateNoticeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not request.user.is_admin:
            return Response({'error': 'Only admin can add notices.'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = NoticeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(created_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListNoticesView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        notices = Notice.objects.all().order_by('-created_at')
        serializer = NoticeSerializer(notices, many=True)
        return Response(serializer.data)


# helpdesk/views.py


# Student submits request
class CreateRoomChangeRequestView(generics.CreateAPIView):
    queryset = RoomChangeRequest.objects.all()
    serializer_class = RoomChangeRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)


# Admin views all room change requests
class AdminRoomChangeListView(generics.ListAPIView):
    queryset = RoomChangeRequest.objects.all().order_by('-created_at')
    serializer_class = RoomChangeRequestSerializer
    permission_classes = [permissions.IsAdminUser]


# Admin updates status
from rest_framework.views import APIView

class UpdateRoomChangeStatusView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def patch(self, request, pk):
        try:
            request_obj = RoomChangeRequest.objects.get(pk=pk)
            status_val = request.data.get("status")
            comment = request.data.get("admin_comment", "")

            if status_val not in ['approved', 'rejected']:
                return Response({"error": "Invalid status"}, status=400)

            request_obj.status = status_val
            request_obj.admin_comment = comment
            request_obj.save()
            return Response({"message": "Status updated successfully"})
        except RoomChangeRequest.DoesNotExist:
            return Response({"error": "Request not found"}, status=404)



class StudentRoomChangeHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        student = request.user
        requests = RoomChangeRequest.objects.filter(student=student)
        serializer = RoomChangeRequestSerializer(requests, many=True)
        return Response(serializer.data)


class StudentMedicalEmergencyCreateView(generics.CreateAPIView):
    queryset = MedicalEmergency.objects.all()
    serializer_class = MedicalEmergencySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)

class StudentMedicalEmergencyListView(generics.ListAPIView):
    serializer_class = MedicalEmergencySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return MedicalEmergency.objects.filter(student=self.request.user)

class AdminMedicalEmergencyListUpdateView(generics.ListCreateAPIView):
    queryset = MedicalEmergency.objects.all()
    serializer_class = MedicalEmergencySerializer
    permission_classes = [permissions.IsAdminUser]

    def patch(self, request, *args, **kwargs):
        try:
            emergency = MedicalEmergency.objects.get(id=request.data.get("id"))
            emergency.status = request.data.get("status", emergency.status)
            emergency.save()
            return Response({"message": "Status updated"}, status=status.HTTP_200_OK)
        except MedicalEmergency.DoesNotExist:
            return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_dashboard_analytics(request):
    data = {
        "total_students": CustomUser.objects.filter(is_admin=False).count(),

        "complaints": {
            "total": Complaint.objects.count(),
            "pending": Complaint.objects.filter(status="pending").count(),
            "in_progress": Complaint.objects.filter(status="in_progress").count(),
            "resolved": Complaint.objects.filter(status="resolved").count(),
        },

        "outpass_requests": {
            "total": OutPassRequest.objects.count(),
            "pending": OutPassRequest.objects.filter(status="Pending").count(),
            "approved": OutPassRequest.objects.filter(status="Approved").count(),
            "rejected": OutPassRequest.objects.filter(status="Rejected").count(),
        },

        "room_change_requests": {
            "total": RoomChangeRequest.objects.count(),
            "pending": RoomChangeRequest.objects.filter(status="Pending").count(),
            "approved": RoomChangeRequest.objects.filter(status="Approved").count(),
            "rejected": RoomChangeRequest.objects.filter(status="Rejected").count(),
        },

        "medical_emergencies": {
            "total": MedicalEmergencyReport.objects.count(),
            "pending": MedicalEmergencyReport.objects.filter(status="Pending").count(),
            "acknowledged": MedicalEmergencyReport.objects.filter(status="Acknowledged").count(),
            "hospital": MedicalEmergencyReport.objects.filter(status="Sent to Hospital").count(),
            "resolved": MedicalEmergencyReport.objects.filter(status="Resolved").count(),
        },
    }

    return Response(data)



def export_to_csv(queryset, fields, filename):
    df = pd.DataFrame(list(queryset.values(*fields)))
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = f'attachment; filename="{filename}"'
    df.to_csv(path_or_buf=response, index=False)
    return response

class ExportComplaintsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]

    def get(self, request):
        fields = ['student__username', 'title', 'description', 'status', 'room_number', 'admin_comment', 'created_at']
        return export_to_csv(Complaint.objects.all(), fields, "complaints.csv")


class ExportOutPassView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]

    def get(self, request):
        fields = ['student__username', 'roll_number', 'reason', 'destination', 'from_date', 'to_date', 'status', 'created_at']
        return export_to_csv(OutPassRequest.objects.all(), fields, "outpass_requests.csv")


class ExportRoomChangeView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]

    def get(self, request):
        fields = ['student__username', 'current_room', 'requested_room', 'reason', 'status', 'created_at']
        return export_to_csv(RoomChangeRequest.objects.all(), fields, "room_change_requests.csv")

class ExportMedicalReportsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        queryset = MedicalEmergency.objects.select_related('student')
        data = [
            {
                "full_name": report.student.username,
                "roll_number": report.student.email,  # Or any roll_number field if you have one
                "issue": report.issue,
                "location": report.location,
                "urgency": report.urgency,
                "status": report.status,
                "created_at": report.created_at,
            }
            for report in queryset
        ]
        df = pd.DataFrame(data)
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="medical_reports.csv"'
        df.to_csv(path_or_buf=response, index=False)
        return response


class ExportLostFoundView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]

    def get(self, request):
        fields = ['student__username', 'item_name', 'description', 'location_found', 'is_claimed', 'created_at']
        return export_to_csv(LostAndFound.objects.all(), fields, "lost_found.csv")

class ExportMessFeedbackView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        fields = ['full_name', 'roll_number', 'rating', 'comments', 'created_at']
        return export_to_csv(MessFeedback.objects.all(), fields, "mess_feedback.csv")



# helpdesk/views.py


# STUDENT: Submit found item
class LostFoundCreateView(generics.CreateAPIView):
    queryset = LostFound.objects.all()
    serializer_class = LostFoundSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)

# STUDENT: View their reported items
class LostFoundListView(generics.ListAPIView):
    serializer_class = LostFoundSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return LostFound.objects.filter(student=self.request.user).order_by('-created_at')


# ADMIN: View all found items
class AdminLostFoundListView(generics.ListAPIView):
    queryset = LostFound.objects.all().order_by('-created_at')
    serializer_class = LostFoundSerializer
    permission_classes = [permissions.IsAdminUser]

# ADMIN: Mark as claimed
class AdminUpdateLostFoundView(generics.UpdateAPIView):
    queryset = LostFound.objects.all()
    serializer_class = LostFoundSerializer
    permission_classes = [permissions.IsAdminUser]
    lookup_field = 'pk'

class AdminLostFoundUpdateView(generics.RetrieveUpdateAPIView):
    queryset = LostFound.objects.all()
    serializer_class = LostFoundSerializer
    permission_classes = [permissions.IsAuthenticated]