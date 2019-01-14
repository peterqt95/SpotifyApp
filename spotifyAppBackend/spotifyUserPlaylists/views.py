from django.shortcuts import render, redirect
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import os
import sys
import json
import spotipy
import spotipy.util as util
from spotipy import oauth2
from spotifyUserPlaylists.classes.TrackAttributes import TrackAttributes
from spotifyUserPlaylists.classes.PlaylistArtistRecommendations import PlaylistArtistRecommendations

from spotifyLogin import views as spotifyLoginView

class SpotifyUserPlaylistsViewSet(APIView):
    def get(self, request, user_id, format=None):
        access_token = None

        # Get the token from the session or cache
        if 'access_token' in request.session:
            access_token = request.session['access_token']
        else:
            token_info = spotifyLoginView.sp_oauth.get_cached_token()
            if token_info is None:
                return redirect("login")
            access_token = token_info['access_token']
        
        if access_token:
            sp = spotipy.Spotify(auth=access_token)
            playlists = sp.user_playlists(user_id)
            request.session['access_token'] = access_token

            # Grab user playlists
            return Response(playlists)
        else:
            return Response("Gg no re")

class SpotifyUserPlaylistViewSet(APIView):
    def get(self, request, user_id, playlist_id, format=None):
        access_token = None

        # Get the token from the session or cache
        if 'access_token' in request.session:
            access_token = request.session['access_token']
        else:
            token_info = spotifyLoginView.sp_oauth.get_cached_token()
            if token_info is None:
                return redirect("login")
            access_token = token_info['access_token']
        
        if access_token:
            # Grab user playlist
            sp = spotipy.Spotify(auth=access_token)
            playlist = sp.user_playlist(user_id, playlist_id)

            # Grab audio information for each of the tracks
            # Also, recalculate the duration to minute : second format
            trackIds = []
            trackIdToInfo = {}
            for item in playlist['tracks']['items']:
                trackId = item['track']['id']
                trackIds.append(trackId)
                trackIdToInfo[trackId] = item

                # Recalculate the duration to minute/seconds
                item['track']['duration_ms'] = convertMsToMinSec(item['track']['duration_ms'])
            audio_analysis = sp.audio_features(trackIds)

            # Calculate the audio information for this playlist
            playlistAudioInfo = TrackAttributes()
            for info in audio_analysis:
                playlistAudioInfo.addAttributes(
                    info['acousticness'],
                    info['danceability'],
                    info['energy'],
                    info['instrumentalness'],
                    info['liveness'],
                    info['loudness'],
                    info['speechiness'],
                    info['tempo'],
                    info['valence']
                )

            # Return the normalized attributes
            playlist['audio-features'] = playlistAudioInfo.normalizeAttributes()

            request.session['access_token'] = access_token
            return Response(playlist)
        else:
            return Response("Gg no re")

class SpotifyUserPlaylistArtistRecommendation(APIView):
    def get(self, request, user_id, playlist_id, format=None):
        access_token = None

        # Get the token from the session or cache
        token_info = spotifyLoginView.sp_oauth.get_cached_token()
        if token_info is None:
            return redirect("login")
        access_token = token_info['access_token']
        
        if access_token:
            # Grab the user playlist
            sp = spotipy.Spotify(auth=access_token)
            playlist = sp.user_playlist(user_id, playlist_id)

            # Create object to return
            playlistArtRecs = PlaylistArtistRecommendations()

            # Iterate through the playlist and hash all the artists
            artistsName = {}
            for item in playlist['tracks']['items']:
                artists = item['track']['artists']
                for artistItem in artists:
                    artistName = artistItem['id']
                    if artistName in artistsName:
                        artistsName[artistName] += 1
                    else:
                        artistsName[artistName] = 1
            
            # Sort the artists name by popularity and save the top 3 artists
            artistsNameSorted = sorted(artistsName.items(), key=lambda x: x[1], reverse=True)[:3]

            # For the top 3 artists, return the artist names and some default image for them
            idsToSearch = [artistName[0] for artistName in artistsNameSorted]
            playlistArtRecs.topArtists = sp.artists(idsToSearch)

            # Pull some additional suggestions for the artists
            artistRecommendations = []
            for artistId in idsToSearch:
                recommendations = sp.artist_related_artists(artistId)
                for recommend in recommendations['artists']:
                    artistRecommendations.append(recommend)

            # Return the 5 most frequently occuring artists in recommendations
            artistSuggFreq = {}
            for artistRec in artistRecommendations:
                artistName = artistRec['name']
                if artistName in artistSuggFreq:
                    artistSuggFreq[artistName][0] += 1
                else:
                    # Store frequency/artist info
                    artistSuggFreq[artistName] = [1, artistRec]

            # Find the highest frequencies and for the recommendation, and organize
            # each of the frequencies by the highest popular artist until we match enough
            # artists to return
            freqToArtists = {}
            for key in artistSuggFreq:
                freq = artistSuggFreq[key][0]
                detail = artistSuggFreq[key][1]
                if freq in freqToArtists:
                    freqToArtists[freq].append(detail)
                else:
                    freqToArtists[freq] = [detail]
            for freq in freqToArtists:
                # Grab the list of artists for this frequency and sort by popularity
                artistsNameSorted = sorted(freqToArtists[freq], key=lambda x: x['popularity'], reverse=True)
                for artist in artistsNameSorted:
                    # Exist after we've retrieved enough suggestions
                    if len(playlistArtRecs.topSuggestedArtists) > 5:
                        break
                    else:
                        playlistArtRecs.topSuggestedArtists.append(artist)

            return Response(json.dumps(playlistArtRecs.__dict__))
        else:
            return Response("GG no re")

# Converts ms to min:second format
def convertMsToMinSec(ms):
    minutes = str(int(ms / (1000 * 60) % 60))
    seconds = str(int((ms / 1000) % 60))
    
    # Prepend zero if seconds is length 1
    if len(seconds) == 1:
        seconds = '0' + seconds
    return (minutes + ":" + seconds)
