
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

myApp.factory('searchSong', function($http, $q) {
	return function(val) {
		var defer = $q.defer();
		$http.get('musicmatch/' + val)
			.success(function(response) {
				defer.resolve(response);
			});
		return defer.promise;
	}
});

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


























