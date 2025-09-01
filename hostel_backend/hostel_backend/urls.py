from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse

# Temporary home view to test backend
def home(request):
    return JsonResponse({"message": "Hostel IQ Backend is Live 🔥"})

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),

    # API Endpoints
    path('api/auth/', include('users.urls')),          # User app
    path('api/helpdesk/', include('helpdesk.urls')),   # Helpdesk app
    path('api/users/', include('users.urls')),         # Optional users endpoint
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Optional backend test route
    path('home/', home),
]

# ✅ SPA fallback: serve React index.html for any non-API route
urlpatterns += [
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
