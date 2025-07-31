from django.urls import path
from .views import RegisterView, LoginView
from .views import StudentCreateView, StudentListCountView
from .views import AllStudentsView
from .views import DeleteStudentView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('admin/add-student/', StudentCreateView.as_view(), name='add-student'),
    path('admin/total-students/', StudentListCountView.as_view(), name='total-students'),
    path('admin/all-students/', AllStudentsView.as_view(), name='all-students'),
    path('admin/delete-student/<int:student_id>/', DeleteStudentView.as_view(), name='delete-student'),
    
]




