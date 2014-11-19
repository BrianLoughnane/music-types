
var myApp = angular.module('myApp', ['ngRoute']);

myApp.factory('nowPlaying', function() {
	return {
		lyrics: [],
		artist: undefined,
		song: undefined,
		spotifyId: undefined
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
			.then(function(response) {
				defer.resolve(response);
			});

		return defer.promise;
	} // end return function
}); //end getLyrics

myApp.factory('play', function($http, $q) {

	// return function(spotifyId) {
	return function() {	
		var defer = $q.defer();

		// $http.get('https://api.spotify.com/v1/tracks/' + spotifyId)
		$http.get('https://api.spotify.com/v1/tracks/72GEN9Pc72Uf2i7qK2aRp7')
			.then(function(response) {
				console.log('play', response);
				defer.resolve(response);
			});

		return defer.promise;
	} // end return function
}); //end getLyrics
