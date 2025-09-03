import os
from pathlib import Path
from datetime import timedelta

# -------------------------
# BASE DIRECTORY
# -------------------------
BASE_DIR = Path(__file__).resolve().parent.parent

# -------------------------
# SECURITY
# -------------------------
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "django-insecure-default-secret")
DEBUG = os.environ.get("DEBUG", "False") == "True"

# -------------------------
# ALLOWED HOSTS
# -------------------------
ALLOWED_HOSTS = [
    "pragati-hostel.onrender.com",
    "localhost",
    "127.0.0.1",
    "hostel-iq.onrender.com",
]

# -------------------------
# CSRF TRUSTED ORIGINS
# -------------------------
CSRF_TRUSTED_ORIGINS = [
    "https://pragati-hostel.onrender.com",
    "https://pragati-hostel-x6p0.onrender.com",
    "https://hostel-iq.onrender.com",
]

# -------------------------
# INSTALLED APPS
# -------------------------
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework_simplejwt",
    "corsheaders",
    "django_filters",
    "users",
    "helpdesk",
]

# -------------------------
# MIDDLEWARE
# -------------------------
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",  # Serve static files in production
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# -------------------------
# CORS SETTINGS
# -------------------------
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = [
    "https://pragati-hostel.onrender.com",
    "https://pragati-hostel-x6p0.onrender.com",
    "http://localhost:3000",
    "https://hostel-iq.onrender.com",
]

# -------------------------
# URL CONFIGURATION
# -------------------------
ROOT_URLCONF = "hostel_backend.urls"

# -------------------------
# TEMPLATES (React Build)
# -------------------------
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "frontend" / "build"],  # React build folder
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# -------------------------
# WSGI APPLICATION
# -------------------------
WSGI_APPLICATION = "hostel_backend.wsgi.application"

# -------------------------
# DATABASE (POSTGRESQL - RENDER)
# -------------------------
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "hostel_f1we",
        "USER": "hostel_f1we_user",
        "PASSWORD": "JaVRhtRySwzQq6dGdQOnuB0nhWUXBsGB",
        "HOST": "dpg-d2s8ftqdbo4c73et5mvg-a.oregon-postgres.render.com",
        "PORT": "5432",
        "OPTIONS": {
            "sslmode": "require",  # ✅ SSL required
        },
    }
}

# -------------------------
# PASSWORD VALIDATION
# -------------------------
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# -------------------------
# INTERNATIONALIZATION
# -------------------------
LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Kolkata"
USE_I18N = True
USE_TZ = True

# -------------------------
# STATIC FILES (REACT + DJANGO)
# -------------------------
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_DIRS = [
    BASE_DIR / "frontend" / "build" / "static",
]
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# -------------------------
# MEDIA FILES
# -------------------------
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# -------------------------
# DEFAULT AUTO FIELD
# -------------------------
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# -------------------------
# CUSTOM USER MODEL
# -------------------------
AUTH_USER_MODEL = "users.CustomUser"

# -------------------------
# DJANGO REST FRAMEWORK
# -------------------------
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.AllowAny",
    ),
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.SearchFilter",
    ],
}

# -------------------------
# SIMPLE JWT SETTINGS
# -------------------------
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "AUTH_HEADER_TYPES": ("Bearer",),
}
