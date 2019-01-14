"""
WSGI config for spotifyAppBackend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'spotifyAppBackend.settings')

# Environment variables for spotify
os.environ['SPOTIPY_CLIENT_ID'] = '3035f03a789149968ccf80e5f0a824f4'
os.environ['SPOTIPY_CLIENT_SECRET'] = '3f200238bff34b9db8baa3b69bbb2f09'
os.environ['SPOTIPY_REDIRECT_URI'] = 'http://localhost:8000/api/login'

application = get_wsgi_application()
