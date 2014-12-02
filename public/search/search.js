myApp.controller('SearchCtrl', function($scope, $http, $location, searchSong, getLyrics, nowPlaying) {

	$scope.query = '';
	$scope.searchResults;

	$scope.searchSong = function(q) {
		var value = q.trim();
		if(value.length) {
			searchSong(value)
				.then(function(response) {
					console.log('ssResponse', response);
					var tracks = response.message.body.track_list;
					var goodTracks = [];

					for (var i = 0; i < tracks.length; i++) {
						if(tracks[i].track.track_spotify_id && tracks[i].track.has_lyrics) {
							goodTracks.push(tracks[i]);
						}
					}
					$scope.searchResults = goodTracks;;
					// $scope.searchResults = tracks;;
				});
		}	
	} // end searchSong()

	$scope.getSong = function(trId, artist, song, album, art, spotifyId) {
		nowPlaying.artist = artist;
		nowPlaying.song = song;
		nowPlaying.album = album;
		nowPlaying.art = art;
		nowPlaying.spotifyId = spotifyId;

		getLyrics(trId)
			.then(function(response) {
				console.log('getL', response);
				var tracking = response.data.message.body.lyrics.pixel_tracking_url;
				var lyrics = response.data.message.body.lyrics.lyrics_body;

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
	} // end getSong()

	$('.query').focus();
}); //end SearchCtrl