from django.shortcuts import render, redirect
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import os
import sys
import spotipy
import spotipy.util as util
from spotipy import oauth2

SCOPE = 'user-library-read user-follow-read'
CACHE = '.spotipyoauthcache'

SPOTIPY_CLIENT_ID = '3035f03a789149968ccf80e5f0a824f4'
SPOTIPY_CLIENT_SECRET= '3f200238bff34b9db8baa3b69bbb2f09'
SPOTIPY_REDIRECT_URI = 'http://localhost:4200/playlists'

sp_oauth = oauth2.SpotifyOAuth( 
    SPOTIPY_CLIENT_ID, SPOTIPY_CLIENT_SECRET, 
    SPOTIPY_REDIRECT_URI, scope=SCOPE, cache_path=CACHE
)

# Create your views here.
class SpotifyLoginViewSet(APIView):
    def get(self, request, format=None):
        access_token = None

        if 'access_token' in request.session:
            access_token = request.session['access_token']
        
        if 'code' in request.GET:
            if request.GET['code'] and access_token is None:
                token_info = sp_oauth.get_cached_token()
                if token_info is None:
                    token_info = sp_oauth.get_access_token(request.GET['code'])
                access_token = token_info['access_token']
        
        try:
            sp = spotipy.Spotify(auth=access_token)
            user = sp.current_user()
        except Exception:
            if 'access_token' in request.session:
                del request.session['access_token']
            
            return redirect('callback')

        request.session['access_token'] = access_token
        return Response(user)

class CallBackViewSet(APIView):
    def get(self, request, format=None):
        auth_url = self.getSpotifyOauthUri()
        return Response({"auth_url": auth_url})

    def getSpotifyOauthUri(self):
        auth_url = sp_oauth.get_authorize_url()
        return auth_url