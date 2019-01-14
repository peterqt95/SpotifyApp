"""spotifyAppBackend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from django.conf.urls import url

from spotifyLogin import views as spotifyLoginView
from spotifyUserPlaylists import views as spotifyUserPlaylistsView

urlpatterns = [
    url(r'^api/login', spotifyLoginView.SpotifyLoginViewSet.as_view(), name="login"),
    url(r'^callback', spotifyLoginView.CallBackViewSet.as_view(), name="callback"),
    path('api/user-playlists/<user_id>', spotifyUserPlaylistsView.SpotifyUserPlaylistsViewSet.as_view(), name="user-playlists"),
    path('api/user-playlists/<user_id>/<playlist_id>', spotifyUserPlaylistsView.SpotifyUserPlaylistViewSet.as_view(), name="user-playlists"),
    path('api/user-playlist-artist-recommendation/<user_id>/<playlist_id>', spotifyUserPlaylistsView.SpotifyUserPlaylistArtistRecommendation.as_view(), name="user-artist-playlist-recommendation"),
    path('admin/', admin.site.urls),
]
