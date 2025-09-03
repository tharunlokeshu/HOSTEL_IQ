from django.shortcuts import render

# Create your views here.

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import CustomUser
from .serializers import RegisterSerializer, LoginSerializer
from .models import Student
from .serializers import StudentSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from users.authentication import AdminAuthentication  # Ensure this is correct


# Register View
class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer

# Login View
class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password']
        )
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'is_admin': user.is_admin,
                'username': user.username
            })
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)




class StudentCreateView(generics.CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentListCountView(generics.ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        response.data = {
            "total_students": self.get_queryset().count(),
            "students": response.data
        }
        return response



class AllStudentsView(APIView):
    authentication_classes = [AdminAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response({"students": serializer.data})  # ✅ Wrapped in a key


# users/views.py


class DeleteStudentView(APIView):
    authentication_classes = [AdminAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, student_id):
        try:
            student = Student.objects.get(id=student_id)
            student.delete()
            return Response({"message": "Student deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except Student.DoesNotExist:
            return Response({"error": "Student not found."}, status=status.HTTP_404_NOT_FOUND)



# views.py
from django.http import HttpResponse
from django.contrib.auth import get_user_model

def create_admin(request):
    User = get_user_model()
    if not User.objects.filter(username='TharunLokesh').exists():
        User.objects.create_superuser('TharunLokesh', 'tharun@example.com', '8520')
        return HttpResponse("Admin created!")
    else:
        admin_user = User.objects.get(username='TharunLokesh')
        admin_user.set_password('8520')
        admin_user.save()
        return HttpResponse("Admin password reset!")

