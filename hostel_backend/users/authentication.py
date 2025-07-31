from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed

class AdminAuthentication(JWTAuthentication):
    def authenticate(self, request):
        result = super().authenticate(request)
        if result is None:
            return None  # No credentials

        user, token = result
        if not user.is_authenticated or not user.is_admin:
            raise AuthenticationFailed("Admin not logged in. Please login again.")

        return (user, token)
