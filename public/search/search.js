myApp.controller('SearchCtrl', function($scope, $http, $location, searchSong, getLyrics, nowPlaying) {

	$scope.query = '';
	$scope.searchResults;

	// var location = $location;
	// debugger;

	$('.search').on('click', function() {	
		var value = $('.query').val().trim();

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
	
	});  // end search click handler

	$('.resultContainer').on('click', '.result', function() {
		var trId = $(this)[0].attributes.trackid.value;
		var artist = $(this)[0].attributes.artist.value;
		var song = $(this)[0].attributes.song.value;
		var album =  $(this)[0].attributes.album.value;
		var art =  $(this)[0].attributes.art.value;
		var spotifyId =  $(this)[0].attributes.spotifyid.value;


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

		
	
	}); // end result click handler

	$('.query').focus();
}); //end SearchCtrl