myApp.controller('SearchCtrl', function($scope, $http, $location, searchSong, getLyrics, nowPlaying) {
	$scope.query = '';
	$scope.searchResults;

	$('.search').on('click', function() {	
		var value = $('.query').val().trim();

		if(value.length) {
			searchSong(value)
				.then(function(response) {
					console.log('ssResponse', response);
					var tracks = response.message.body.track_list;
					$scope.searchResults = tracks;
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



		console.log('trId', trId);
	
		getLyrics(trId)
			.then(function(response) {
				console.log('getL', response);
				var lyrics = response.data.message.body.lyrics.lyrics_body;
				lyrics = lyrics.replace(/\n/g, ' ').split(' ');
				lyrics.splice(lyrics.length-11, 11);
				
				for (var i = 1; i < lyrics.length; i += 2) {
					lyrics.splice(i, 0, ' ');
				};
				
				nowPlaying.lyrics = lyrics;
				nowPlaying.artist = artist;
				nowPlaying.song = song;
				nowPlaying.album = album;
				nowPlaying.art = art;
				nowPlaying.spotifyId = spotifyId;
				
				debugger;
				$location.url('/#/');

				// console.log()
			});

	});

}); //end SearchCtrl