
var myApp = angular.module('myApp', ['ngRoute', 'ngSanitize']);

myApp.factory('nowPlaying', function() {
	return {
		lyrics: [],
		artist: undefined,
		song: undefined,
		spotifyId: undefined,
		tracking: undefined
	}
});

myApp.factory('searchSong', function ($http, $q) {
	return function (val) {
		var defer = $q.defer();
		$http.get('musicmatch/' + val)
			.success(function(response) {
				defer.resolve(response);
			});
		return defer.promise;
	}
});

myApp.factory('querySong', function (searchSong) {
	return function (ctrl) {
		return function (q) {
			var value = q.trim();
			if(value.length) {
				searchSong(value)
				.then(function (response) {
					var tracks = response.message.body.track_list;
					var goodTracks = [];

					for (var i = 0; i < tracks.length; i++) {
						if(tracks[i].track.track_spotify_id && tracks[i].track.has_lyrics) {
							goodTracks.push(tracks[i]);
						}
					}
					ctrl.searchResults = goodTracks;
				});
			}	
		};
	};
});

myApp.factory('getSong', function (nowPlaying, getLyrics, $location) {
	return function (track) {
		nowPlaying.artist = track.artist_name;
		nowPlaying.song = track.track_name;
		nowPlaying.album = track.album_name;
		nowPlaying.art = track.album_coverart_500x500;
		nowPlaying.spotifyId = track.track_spotify_id;

		getLyrics(track.track_id)
			.then(function(response) {

				// oddly, this had to change from response.data.message..... to response.message....
				// var tracking = response.data.message.body.lyrics.pixel_tracking_url;
				// var lyrics = response.data.message.body.lyrics.lyrics_body;
				var tracking = response.message.body.lyrics.pixel_tracking_url;
				var lyrics = response.message.body.lyrics.lyrics_body;

				console.log('lyrics_body', lyrics);

				lyrics = lyrics.replace(/’/g, "'");
				lyrics = lyrics.replace(/‘/g, "'");
				lyrics = lyrics.replace(/'/g, "\'");
				lyrics = lyrics.replace(/ \n\n\n/g, ' ');
				lyrics = lyrics.replace(/\n\n\n/g, ' ');
				lyrics = lyrics.replace(/ \n\n/g, ' ');
				lyrics = lyrics.replace(/\n\n/g, ' ');
				lyrics = lyrics.replace(/ \n/g, ' ');
				lyrics = lyrics.replace(/\n/g, ' ').split(' ');
				lyrics.splice(lyrics.length-11, 11);
				
				for (var i = 1; i < lyrics.length; i += 2) {
					lyrics.splice(i, 0, ' ');
				};

				nowPlaying.lyrics = lyrics;				
				nowPlaying.tracking = tracking;
				$location.path('/play');
			}); //end then()
	}
})

myApp.factory('getLyrics', function($http, $q) {
	return function(trackId) {
		var defer = $q.defer();
		$http.get('musicmatch/lyrics/' + trackId)
			.success(function(response) {
				defer.resolve(response);
			});
		return defer.promise;
	} // end return function
}); //end getLyrics

myApp.factory('getSpotify', function($http, $q) {
	return function(spotifyId) {	
		var defer = $q.defer();
		$http.get('https://api.spotify.com/v1/tracks/' + spotifyId)
			.success(function(response) {
				defer.resolve(response);
			});
		return defer.promise;
	} // end return function
}); //end getLyrics


























