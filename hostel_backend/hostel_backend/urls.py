from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
# 👇 Temporary home view to test Render deployment
def home(request):
    return JsonResponse({"message": "Hostel IQ Backend is Live 🔥"})
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),          # your user app
    path('api/helpdesk/', include('helpdesk.urls')),   # your helpdesk app
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/users/', include('users.urls')),
    path('', home),
]





