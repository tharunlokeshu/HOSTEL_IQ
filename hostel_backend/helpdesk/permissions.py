from rest_framework import permissions

class IsAdminOrOwner(permissions.BasePermission):
    """
    Allow:
    - Students to read & create their own complaints.
    - Admins to view and update anything.
    """

    def has_object_permission(self, request, view, obj):
        if request.user.is_admin:
            return True
        return obj.student == request.user
    
    
