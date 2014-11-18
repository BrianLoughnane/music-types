
var myApp = angular.module('myApp', ['ngRoute']);

myApp.factory('currentLyrics', function() {
	return {
		currentLyrics: []
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

myApp.factory('getLyrics', function($http, $q, currentLyrics) {

	return function(trackId) {
		var defer = $q.defer();

		$http.get('musicmatch/lyrics/' + trackId)
			.then(function(response) {
				defer.resolve(response);
			});

		return defer.promise;
	} // end return function
}); //end getLyrics

