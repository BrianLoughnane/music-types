myApp.controller('SearchCtrl', function($scope, $http, $location, searchSong, getLyrics, currentLyrics) {
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
		console.log('trId', trId);
	
		getLyrics(trId)
			.then(function(response) {
				var lyrics = response.data.message.body.lyrics.lyrics_body;
				lyrics = lyrics.replace(/\n/g, ' ').split(' ');
				lyrics.splice(lyrics.length-11, 11);
				
				for (var i = 1; i < lyrics.length; i += 2) {
					lyrics.splice(i, 0, ' ');
					console.log(lyrics);
				};
				

				currentLyrics.currentLyrics = lyrics;
				console.log('currentLyricsPostSet', currentLyrics.currentLyrics);
				$location.url('/#/');

				// console.log()
			});

	});

}); //end SearchCtrl