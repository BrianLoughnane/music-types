
var myApp = angular.module('myApp', ['ngRoute']);

myApp.factory('currentLyrics', function() {
	return {
		currentLyrics: []
	}
})

myApp.factory('getLyrics', function($http, $q, currentLyrics) {

	return function(trackId) {
		var defer = $q.defer();
		var lyricsObj;		
		var lyrics;
		var copyright;



		$http.get('musicmatch/lyrics/' + trackId)
			.then(function(response) {
				defer.resolve(response.data);
			});



		return defer.promise;
	} // end return function
}); //end getLyrics












// myApp.factory('getLyrics', function($http, $q) {

// 	return function(trackId) {
// 		var defer = $q.defer();

// 		var lyricsObj;		
// 		var lyrics;
// 		var copyright;



// 		$http.get('musicmatch/lyrics/' + trackId)
// 		.then(
// 			function(response) {

// 					lyricsObj = response.data.message.body.lyrics;
// 					lyrics = lyricsObj.lyrics_body;
// 					copyright = lyricsObj.lyrics_copyright;

// 					defer.resolve({
// 						lyricsObject: lyricsObj,
// 						lyrics: lyrics,
// 						copyright: copyright
// 					});

// 					console.log(defer.promise);

// 					// console.log('trackLyricsGet lyricsObj', lyricsObj);
// 					// console.log('trackLyricsGet lyrics', lyrics);
// 					// console.log('trackLyricsGet copyright', copyright);

// 			}, 
// 			function(error) {
// 				console.log(error);
// 			}
// 		);	

// 		console.log(defer.promise);		
// 		return defer.promise;
// 	}
	
// }); //end getLyrics

// myApp.factory('getTrackId', function() {
// 	return function() {
// 		return 37021245;		
// 	}

// });

// myApp.factory('getLyrics', 
// 	function($http, $q, getTrackId) {
// 		return function() {
// 			var defer = $q.defer();
// 			var trId = getTrackId();
// 		$http.get('musicmatch/lyrics/' + trId)
// 			.success(function(data) {
// 				defer.resolve(data);
// 			});
// 			return defer.promise;
// 		}
// }); //end getLyrics
