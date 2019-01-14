class TrackAttributes:
    def __init__(self):
        # Overall track attributes (total)
        self.acousticness = 0
        self.danceability = 0
        self.energy = 0
        self.instrumentalness = 0
        self.liveness = 0
        self.loudness = 0
        self.speechiness = 0
        self.tempo = 0
        self.valence = 0

        # Additional playlist information
        self.trackCount = 0

    def normalizeAttributes(self):
        return {
            'acousticness': self.acousticness/self.trackCount,
            'danceability': self.danceability/self.trackCount,
            'energy': self.energy/self.trackCount,
            'instrumentalness': self.instrumentalness/self.trackCount,
            'liveness': self.liveness/self.trackCount,
            'loudness': self.loudness/self.trackCount,
            'speechiness': self.speechiness/self.trackCount,
            'tempo': self.tempo/self.trackCount,
            'valence': self.valence/self.trackCount
        }

    def addAttributes(self, acousticness, danceability, energy, instrumentalness, liveness, loudness, speechiness, tempo, valence):
        self.acousticness += acousticness
        self.danceability += danceability
        self.energy += energy
        self.instrumentalness += instrumentalness
        self.liveness += liveness
        self.loudness += loudness
        self.speechiness += speechiness
        self.tempo += tempo
        self.valence += valence
        self.trackCount += 1

    def delAttributes(self, acousticness, danceability, energy, instrumentalness, liveness, loudness, speechiness, tempo, valence):
        self.acousticness -= acousticness
        self.danceability -= danceability
        self.energy -= energy
        self.instrumentalness -= instrumentalness
        self.liveness -= liveness
        self.loudness -= loudness
        self.speechiness -= speechiness
        self.tempo -= tempo
        self.valence -= valence
        self.trackCount -= 1