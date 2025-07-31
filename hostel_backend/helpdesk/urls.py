from django.urls import path
from .views import MessFeedbackView, MessFeedbackListView
from .views import (
    SubmitComplaintView,
    MyComplaintsView,
    StudentComplaintHistoryView,
    AdminComplaintListView,
    AdminComplaintHistoryView,
    AdminUpdateComplaintView,
)
from .views import (
    OutPassRequestCreateView,
    OutPassRequestListView,
    OutPassRequestUpdateView,
    StudentOutPassListView, 
    DeleteAllOutPassRequestsView# <-- Add this import
)
from .views import CreateNoticeView, ListNoticesView
from .views import (
    CreateRoomChangeRequestView,
    AdminRoomChangeListView,
    UpdateRoomChangeStatusView
    
)
from .views import StudentRoomChangeHistoryView
from .views import (
    StudentMedicalEmergencyCreateView,
    StudentMedicalEmergencyListView,
    AdminMedicalEmergencyListUpdateView,
)
from .views import admin_dashboard_analytics

from .views import (
    LostFoundCreateView,
    LostFoundListView,
    AdminLostFoundListView,
    AdminUpdateLostFoundView,
)
from .views import (
    ExportComplaintsView,
    ExportOutPassView,
    ExportRoomChangeView,
    ExportMedicalReportsView,
    ExportLostFoundView,
    ExportMessFeedbackView,
)
urlpatterns = [
    # Student Endpoints
    path('submit/', SubmitComplaintView.as_view(), name='submit_complaint'),
    path('my-complaints/', MyComplaintsView.as_view(), name='my_complaints'),
    path('my-history/', StudentComplaintHistoryView.as_view(), name='student_history'),

    # Admin Endpoints
    path('admin/complaints/', AdminComplaintListView.as_view(), name='admin_complaints'),
    path('admin/complaints/<int:pk>/', AdminUpdateComplaintView.as_view(), name='admin_update_complaint'),
    path('admin/history/', AdminComplaintHistoryView.as_view(), name='admin_history'),
    path('mess-feedback/', MessFeedbackView.as_view(), name='mess-feedback'),
    path('mess-feedback/all/', MessFeedbackListView.as_view(), name='mess-feedback-list'),
    path('out-pass/', OutPassRequestCreateView.as_view(), name='out-pass-create'),
    path('out-pass/all/', OutPassRequestListView.as_view(), name='out-pass-list'),
    path('out-pass/<int:pk>/', OutPassRequestUpdateView.as_view(), name='out-pass-update'),
    path('out-pass/my/', StudentOutPassListView.as_view(), name='out-pass-my-list'),
    path('out-pass/all/delete/', DeleteAllOutPassRequestsView.as_view(), name='out-pass-delete-all'),
    path('notices/create/', CreateNoticeView.as_view(), name='create-notice'),
    path('notices/', ListNoticesView.as_view(), name='list-notices'),
    path('room-change/', CreateRoomChangeRequestView.as_view(), name='room-change-create'),
    path('admin/room-change/', AdminRoomChangeListView.as_view(), name='room-change-list'),
    path('admin/room-change/<int:pk>/', UpdateRoomChangeStatusView.as_view(), name='room-change-update'),
    # urls.py
    path('room-change/my-requests/', StudentRoomChangeHistoryView.as_view()),
    path('medical-emergency/create/', StudentMedicalEmergencyCreateView.as_view(), name='create-medical-emergency'),
    path('medical-emergency/my/', StudentMedicalEmergencyListView.as_view(), name='my-medical-emergency'),
    path('admin/medical-emergency/', AdminMedicalEmergencyListUpdateView.as_view(), name='admin-medical-emergency'),
    path('admin/dashboard-analytics/', admin_dashboard_analytics),
    
    path('student/lost-found/', LostFoundCreateView.as_view(), name='lost-found-create'),
    path('student/lost-found/list/', LostFoundListView.as_view(), name='lost-found-list'),

    # Admin
    path('admin/lost-found/', AdminLostFoundListView.as_view(), name='admin-lost-found-list'),
    path('admin/lost-found/<int:pk>/update/', AdminUpdateLostFoundView.as_view(), name='admin-lost-found-update'),
    path('admin/complaints/export/', ExportComplaintsView.as_view()),
    path('admin/outpass/export/', ExportOutPassView.as_view()),
    path('admin/room-change/export/', ExportRoomChangeView.as_view()),
    path('admin/medical/export/', ExportMedicalReportsView.as_view()),
    path('admin/lost-found/export/', ExportLostFoundView.as_view()),
    path('admin/mess-feedback/export/', ExportMessFeedbackView.as_view()),
]





