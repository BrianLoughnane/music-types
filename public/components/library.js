
var myApp = angular.module('myApp', ['ngRoute', 'ngSanitize']);

myApp.factory('nowPlaying', function () {
	return {
		lyrics: [],
		artist: undefined,
		song: undefined,
		spotifyId: undefined,
		tracking: undefined
	}
});

myApp.factory('infoSetup', function () {
	return function(lyrics) {
		return {
			lyricIndex: 0,
			word: lyrics[0] || '',
			wordMinusOne: '',
			wordMinusTwo: '',
			wordPlusOne: lyrics[this.lyricIndex +1] || '',
			wordPlusTwo: lyrics[this.lyricIndex +2] || ''
		}
	}
});

myApp.factory('trustSrc', function ($sce) {
	return function(src) {
		return $sce.trustAsResourceUrl(src);
	}
})

myApp.factory('header', function ($interval) {
	var interval;
	return {
		progress: 0,
		score: 0,
		numberOfErrors: 0,
		timer: {
			minutes: 0,
			tensOfMinutes: 0,
			seconds: 0,
			tensOfSeconds: 0,
			totalSeconds: 0,
			startTimer: function() {
				var timer = this;
				interval = $interval(function() {
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
			},
			stopTimer: function() {
				$interval.cancel(interval);
			},
			resetTimer: function() {
				var timer = this;
				timer.minutes = 0;
				timer.tensOfMinutes = 0;
				timer.seconds = 0;
				timer.tensOfSeconds = 0;
				timer.totalSeconds = 0;
			}
		},
		resetHeader: function() {
			var header = this;
			header.progress = 0;
			header.score = 0;
			header.numberOfErrors = 0;
			header.timer.resetTimer();
		}
	}
});

myApp.factory('searchSong', function ($http, $q) {
	return function (val) {
		var defer = $q.defer();
		$http.get('musicmatch/' + val)
			.success(function(response) {
				defer.resolve(response);
			});
		return defer.promise;
	}
});

myApp.factory('querySong', function (searchSong) {
	return function (ctrl) {
		return function (q) {
			var value = q.trim();
			if(value.length) {
				searchSong(value)
				.then(function (response) {
					var tracks = response.message.body.track_list;
					var goodTracks = [];

					for (var i = 0; i < tracks.length; i++) {
						if(tracks[i].track.track_spotify_id && tracks[i].track.has_lyrics) {
							goodTracks.push(tracks[i]);
						}
					}
					ctrl.searchResults = goodTracks;
				});
			}	
		};
	};
});

myApp.factory('getSong', function (nowPlaying, getLyrics, $location) {
	return function (track) {
		nowPlaying.artist = track.artist_name;
		nowPlaying.song = track.track_name;
		nowPlaying.album = track.album_name;
		nowPlaying.art = track.album_coverart_500x500;
		nowPlaying.spotifyId = track.track_spotify_id;

		getLyrics(track.track_id)
			.then(function(response) {

				// oddly, this had to change from response.data.message..... to response.message....
				// var tracking = response.data.message.body.lyrics.pixel_tracking_url;
				// var lyrics = response.data.message.body.lyrics.lyrics_body;
				var tracking = response.message.body.lyrics.pixel_tracking_url;
				var lyrics = response.message.body.lyrics.lyrics_body.trim();

				console.log('lyrics_body', lyrics);

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
	}
})

myApp.factory('getLyrics', function ($http, $q) {
	return function (trackId) {
		var defer = $q.defer();
		$http.get('musicmatch/lyrics/' + trackId)
			.success(function(response) {
				defer.resolve(response);
			});
		return defer.promise;
	} // end return function
}); //end getLyrics

myApp.factory('getSpotify', function ($http, $q) {
	return function(spotifyId) {	
		var defer = $q.defer();
		$http.get('https://api.spotify.com/v1/tracks/' + spotifyId)
			.success(function(response) {
				defer.resolve(response);
			});
		return defer.promise;
	} // end return function
}); //end getSpotify

myApp.factory('updateProgress', function () {
	return function (control, lyrics) {
		var currentWord = control.current.lyricIndex;
		var totalWords = lyrics.length;
		var percentComplete = (currentWord/totalWords)*100;
		control.header.progress = percentComplete;
	}
});

myApp.factory('completedWord', function (nowPlaying, getSpotify, updateProgress) {
	return function (scope, control, lyrics) {
		var input = scope.userInput;

		if(input === control.current.word) {
			control.current.lyricIndex += 1;
			control.current.word = lyrics[control.current.lyricIndex];
			control.current.word = lyrics[control.current.lyricIndex] || '';
			control.current.wordMinusOne = lyrics[control.current.lyricIndex -1] || '';
			control.current.wordMinusTwo = lyrics[control.current.lyricIndex -2] || '';
			control.current.wordPlusOne = lyrics[control.current.lyricIndex +1] || '';
			control.current.wordPlusTwo = lyrics[control.current.lyricIndex +2] || '';
			
			scope.userInput = "";
			updateProgress(control, lyrics);
			control.lastLength = 0;

			if(control.current.lyricIndex == lyrics.length) {
				scope.currentLetter = '';
				var spotifyId = nowPlaying.spotifyId;
				getSpotify(spotifyId)
					.then(function(response) {
						control.header.timer.stopTimer();
						control.listenView = true;
						control.url = response.preview_url;						
						$timeout(function() {
							$location.path('/search');
						}, 32000);
					});
			}
		}
	}
});

myApp.factory('score', function() {
	return function (scope, control) {
		var input = scope.userInput;
		var lastLetterTyped = input[input.length-1];

		scope.lastLetterTyped = lastLetterTyped;

		if((lastLetterTyped === scope.currentLetter) && (input.length !== 0) && !scope.mistype) {
			control.header.score++;
		} else if ((lastLetterTyped !== scope.currentLetter) && (input.length !== 0)) {
			control.header.score--;
		}
	}
});

myApp.factory('nextLetter', function () {
	return function (scope, control) {
		if(typeof control.current.word !== 'undefined'  && !scope.mistype) {	
			scope.currentLetter = control.current.word[control.lastLength];
		}	
	} 
});

myApp.factory('isSpace', function () {
	return function (control) {
		if(control.current.word === ' ') {
			control.isSpace = true;
		} else {
			control.isSpace = false;
		}
	}
});

myApp.factory('checkMistypes', function () {
	return function (scope, control) {
		var input = scope.userInput;
		var word = control.current.word;
		var lastLetterTyped = input[input.length-1];
		var mistypes = [];

		for(var i = 0; i < input.length; i++) {
			if(input[i] != word[i]) {
				scope.mistype = true;
				mistypes.push(i);
			} 
		}

		if (!mistypes.length){
			scope.mistype = false;
		}

		scope.mistypedLetters = mistypes;
		// debugger
	}
});

myApp.factory('lengthCheck', function (score, completedWord, isSpace) {
	return function (scope, control, lyrics) {
		if(typeof scope.userInput != 'undefined' && scope.userInput != '') {	
			if(scope.userInput.length > control.lastLength) {
					control.lastLength++;
					if(scope.userInput[scope.userInput.length-1] != scope.currentLetter) {
						control.header.numberOfErrors++;
					}
					score(scope, control);
					completedWord(scope, control, lyrics);
			} else {
				control.lastLength--;
			}
		}
		if(scope.userInput == '' && (isSpace || control.lastLength == 1)) {
			if(scope.userInput.length < control.lastLength) {
				control.lastLength--;
			}
		} 
	}	
});






































