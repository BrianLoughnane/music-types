var HelperFunctions = {
	mainAndKeyboard: {
		updateProgress: function (control) {
			var currentWord = control.lyricIndex;
			var totalWords = control.lyrics.length;
			var percentComplete = (currentWord/totalWords)*100;
			control.progress = percentComplete;
		},
		completedWord: function (scope, control, nowPlaying, getSpotify, $interval, interval, $timeout, $location) {

			var input = scope.userInput;

			if(input === control.word) {
				control.lyricIndex += 1;
				control.word = control.lyrics[control.lyricIndex];
				control.word = control.lyrics[control.lyricIndex] || '';
				control.wordMinusOne = control.lyrics[control.lyricIndex -1] || '';
				control.wordMinusTwo = control.lyrics[control.lyricIndex -2] || '';
				control.wordPlusOne = control.lyrics[control.lyricIndex +1] || '';
				control.wordPlusTwo = control.lyrics[control.lyricIndex +2] || '';
				
				scope.userInput = "";
				HelperFunctions.mainAndKeyboard.updateProgress(control);
				control.lastLength = 0;

				if(control.lyricIndex == control.lyrics.length) {
					scope.currentLetter = '';
					var spotifyId = nowPlaying.spotifyId;
					getSpotify(spotifyId)
						.then(function(r) {
							// console.log('spotifyCall', r);
							// debugger
							$interval.cancel(interval);
							control.listenView = true;
							
							// data structure changed to remove 'data' property:
							// control.url = r.data.preview_url;
							control.url = r.preview_url;						
							$timeout(function() {
								$location.path('/search');
							}, 32000);
						});
				}
			}
		},
		score: function (scope, control) {
			var input = scope.userInput;
			var lastLetterTyped = input[input.length-1];

			scope.lastLetterTyped = lastLetterTyped;

			if((lastLetterTyped === scope.currentLetter) && (input.length !== 0) && !scope.mistype) {
				control.score++;
			} else if ((lastLetterTyped !== scope.currentLetter) && (input.length !== 0)) {
				control.score--;
			}
		},
		nextLetter: function (scope, control) {
			if(typeof control.word !== 'undefined'  && !scope.mistype) {	
				scope.currentLetter = control.word[control.lastLength];
			}	
		},
		isSpace: function (control) {
			if(control.word === ' ') {
				control.isSpace = true;
			} else {
				control.isSpace = false;
			}
		},
		checkMistypes: function (scope, control) {
			var input = scope.userInput;
			var word = control.word;
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
		},
		lengthCheck: function (scope, control, nowPlaying, getSpotify, $interval, interval, $timeout, $location) {
			if(typeof scope.userInput != 'undefined' && scope.userInput != '') {	
				if(scope.userInput.length > control.lastLength) {
						control.lastLength++;
						if(scope.userInput[scope.userInput.length-1] != scope.currentLetter) {
							control.numberOfErrors++;
						}
						HelperFunctions.mainAndKeyboard.score(scope, control);
						HelperFunctions.mainAndKeyboard.completedWord(scope, control, nowPlaying, getSpotify, $interval, interval, $timeout, $location);
				} else {
					control.lastLength--;
				}
			}
			if(scope.userInput == '' && (control.isSpace || control.lastLength == 1)) {
				if(scope.userInput.length < control.lastLength) {
					control.lastLength--;
				}
			} 
		}
	},
	letterDirective: {
		dictionary: {
			lpLetter: 'qazQAZ`~1!',
			lrLetter: 'wsxWSX2@',
			lmLetter: 'eEdDcC3#',
			liLetter: 'rRtTfFgGvVbB45$%',
			riLetter: 'yYuUhHjJnNmM67^&',
			rmLetter: 'iIkK8*,<',
			rrLetter: 'olOL9(.>',
			rpLetter: '"\'pP0)-_=+[{]}|;:/?'
		},
		removeAllClasses: function (element) {
			var dictionary = this.dictionary;			
			for (var key in dictionary) {
				element.removeClass(key);
			}
		},
		getFingerClass: function (letter) {
			var dictionary = this.dictionary;
			for (var key in dictionary) {
				if(dictionary[key].indexOf(letter) != -1) {
					return key;
				}
			}
		},
		addLetterClasses: function(element) {
			return function (newGroupArray) {
				var letter = newGroupArray[0];
				var index = newGroupArray[1];
				var userInput = newGroupArray[2];
				var mistype = newGroupArray[3];
				var mistypedLetters = newGroupArray[4];		
				var fingerClass = HelperFunctions.letterDirective.getFingerClass(letter);

				if(index === userInput.length && !mistype) {
					element.addClass('current');
				} else {
					element.removeClass('current');
				}

				if(mistype && (mistypedLetters.indexOf(index) > -1)) {
					element.addClass('incorrect');
				} else {
					element.removeClass('incorrect');
				}

				if(index === 0) {
					HelperFunctions.letterDirective.removeAllClasses(element);
					element.addClass(fingerClass);
				} else if(index <= userInput.length && !mistype || index < userInput.length && mistype)  {
					element.addClass(fingerClass);
				} else {
					element.removeClass(fingerClass);
				}
			}
		}	
	}
}