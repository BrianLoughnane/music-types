myApp.controller('SearchCtrl', function($scope, $http, getLyrics, currentLyrics) {
	$scope.query = '';

	$scope.searchResults;

	$('.search').on('click', function() {	
		console.log('search');

		var value = $('.query').val().trim();

		if(value.length) {
			$http.get('musicmatch/' + value)
			.then(
				function(response) {
					var tracks = response.data.message.body.track_list;
					
					$scope.searchResults = tracks;

				}, 
				function(error) {
					console.log(error);
				}
			);
		}
	
	});  // end search click handler

	$('.resultContainer').on('click', '.result', function() {
		console.log('result click');

		var trId = $(this)[0].attributes.trackid.value;

		console.log('trId', trId);

		// Failing track.get call -- returning an empty array in place of a data.message.body etc.

		$http.get('musicmatch/' + trId)
			.then(
				function(response) {
					console.log('trackGet response', response);
				}, 
				function(error) {
					console.log(error);
				}
			); // end track.get call


		// Trying to work through a service../?
		
	
			getLyrics(trId).then(function(data) {
				var lyrics = data.message.body.lyrics.lyrics_body;
				// var removeEscapes = lyrics.replace('//n/gi','');
				// var lyricsParse = removeEscapes.split(' ');
				var lyricsParse = lyrics.split(' ');

				currentLyrics.currentLyrics = lyricsParse;

				console.log('data', data);
				console.log('lyrics', lyrics);
				// console.log('removeEscapes', removeEscapes);
				console.log('lyricsParse', lyricsParse);
			});
			

			// debugger;

			// $scope.testData = getLyrics();
			// var lyricsO = getLyrics(trId).lyricsObject;
			// console.log('lyricsObj', lyricsO);

		
		// $http.get('musicmatch/lyrics/' + trackId)
		// .then(
		// 	function(response) {
		// 		var lyricsObj = response.data.message.body.lyrics;
		// 		var lyrics = lyricsObj.lyrics_body;
		// 		var copyright = lyricsObj.lyrics_copyright;

		// 		console.log('trackLyricsGet lyricsObj', lyricsObj);
		// 		console.log('trackLyricsGet lyrics', lyrics);
		// 		console.log('trackLyricsGet copyright', copyright);
		// 	}, 
		// 	function(error) {
		// 		console.log(error);
		// 	}
		// ); // end track.lyrics.get call

	});
	// $scope.$watch('query', function() {
	// 	console.log('query$watch');

	// 	var value = $scope.query;

	// 	console.log(value);
	// 	if(value.length) {
	// 		$http.get('musicmatch/' + value)
	// 		.then(
	// 			function(response) {
	// 				var tracks = response.data.message.body.track_list;
					
	// 				$scope.searchResults = tracks;

	// 			}, 
	// 			function(error) {
	// 				console.log(error);
	// 			}
	// 		);
	// 	}
	// }); // end watchQuery

}); //end SearchCtrl