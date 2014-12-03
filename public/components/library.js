
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
			.then(function(response) {
				defer.resolve(response);
			});
		return defer.promise;
	} // end return function
}); //end getLyrics

myApp.factory('getSpotify', function($http, $q) {
	return function(spotifyId) {	
		var defer = $q.defer();
		$http.get('https://api.spotify.com/v1/tracks/' + spotifyId)
			.then(function(response) {
				defer.resolve(response);
			});
		return defer.promise;
	} // end return function
}); //end getLyrics

myApp.factory('timer', function($interval) {
	return {
		minutes: 0,
		tensOfMinutes: 0,
		seconds: 0,
		tensOfSeconds: 0,
		totalSeconds: 0,
		startTimer: function() {
			var timer = this;
			$interval(function() {
				timer.seconds++;
				timer.totalSeconds++;
				if(timer.seconds == 10) {
					timer.seconds = 0;
					timer.tensOfSeconds++;
				}
				if(timer.tensOfSeconds == 6) {
					timer.tensOfSeconds = 0;
					timer.minutes++;
				}
			}, 1000);	
		}
	}
});
