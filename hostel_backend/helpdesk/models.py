# helpdesk/models.py

from django.contrib.auth import get_user_model
from django.db import models
from users.models import CustomUser  # your user model

class Complaint(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
    ]

    student = models.ForeignKey(
        CustomUser,
        null=True,  # allows anonymous submissions
        blank=True,
        on_delete=models.SET_NULL
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=50, blank=True)
    image = models.ImageField(upload_to='complaints/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    room_number = models.CharField(max_length=10, blank=True)
    admin_comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.status})"


class MessFeedback(models.Model):
    full_name = models.CharField(max_length=100)
    roll_number = models.CharField(max_length=20)
    rating = models.IntegerField()
    comments = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} ({self.roll_number}) - {self.rating}/5"
 # Ensure this import is correct

class OutPassRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=True, blank=True)
# or
    name = models.CharField(max_length=100, default='')
    roll_number = models.CharField(max_length=20, null=True, blank=True)
# or
    roll_number = models.CharField(max_length=20, default='')
    roll_number = models.CharField(max_length=20)
    reason = models.TextField()
    destination = models.CharField(max_length=255)
    from_date = models.DateField()
    to_date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.full_name} - {self.status}"



class Notice(models.Model):
    title = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


# helpdesk/models.py

from django.db import models
from users.models import CustomUser

class RoomChangeRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    current_room = models.CharField(max_length=10)
    requested_room = models.CharField(max_length=10)
    reason = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    admin_comment = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.student.username} -> {self.requested_room}"


from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class MedicalEmergency(models.Model):
    URGENCY_CHOICES = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
    ]
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Acknowledged', 'Acknowledged'),
        ('Sent to Hospital', 'Sent to Hospital'),
        ('Resolved', 'Resolved'),
    ]

    student = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    roll_number = models.CharField(max_length=20)
    issue = models.TextField()
    location = models.CharField(max_length=200)
    urgency = models.CharField(max_length=10, choices=URGENCY_CHOICES, default='Low')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.roll_number} - {self.issue[:20]}"


class MedicalEmergencyReport(models.Model):
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    issue = models.TextField()
    location = models.CharField(max_length=255)
    urgency = models.CharField(max_length=20, choices=[('Normal', 'Normal'), ('High', 'High')])
    status = models.CharField(max_length=50, choices=[
        ('Pending', 'Pending'),
        ('Acknowledged', 'Acknowledged'),
        ('Sent to Hospital', 'Sent to Hospital'),
        ('Resolved', 'Resolved'),
    ], default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.username} - {self.issue[:30]}"
    
 # adjust based on your user model import

class OutPass(models.Model):
    URGENCY_CHOICES = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
    ]

    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]

    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    reason = models.TextField()
    destination = models.CharField(max_length=255)
    from_date = models.DateField()
    to_date = models.DateField()
    urgency = models.CharField(max_length=10, choices=URGENCY_CHOICES, default='Low')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.username} - {self.status}"


# helpdesk/models.py

class LostFound(models.Model):
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    item_name = models.CharField(max_length=100)
    description = models.TextField()
    location_found = models.CharField(max_length=200)
    is_claimed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.item_name} by {self.student.username}"


class LostAndFound(models.Model):
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    item_name = models.CharField(max_length=100)
    description = models.TextField()
    location_found = models.CharField(max_length=100)
    is_claimed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.item_name} - {self.student.username}"


