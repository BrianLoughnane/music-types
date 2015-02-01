var HelperFunctions = {
	mainAndKeyboard: {
		updateProgress: function (control, lyrics) {
			var currentWord = control.current.lyricIndex;
			var totalWords = lyrics.length;
			var percentComplete = (currentWord/totalWords)*100;
			control.header.progress = percentComplete;
		},
		completedWord: function (scope, control, nowPlaying, getSpotify, $timeout, $location, lyrics) {

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
				HelperFunctions.mainAndKeyboard.updateProgress(control, lyrics);
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
		},
		score: function (scope, control) {
			var input = scope.userInput;
			var lastLetterTyped = input[input.length-1];

			scope.lastLetterTyped = lastLetterTyped;

			if((lastLetterTyped === scope.currentLetter) && (input.length !== 0) && !scope.mistype) {
				control.header.score++;
			} else if ((lastLetterTyped !== scope.currentLetter) && (input.length !== 0)) {
				control.header.score--;
			}
		},
		nextLetter: function (scope, control) {
			if(typeof control.current.word !== 'undefined'  && !scope.mistype) {	
				scope.currentLetter = control.current.word[control.lastLength];
			}	
		},
		isSpace: function (control) {
			if(control.current.word === ' ') {
				control.isSpace = true;
			} else {
				control.isSpace = false;
			}
		},
		checkMistypes: function (scope, control) {
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
		},
		lengthCheck: function (scope, control, nowPlaying, getSpotify, $interval, header, $timeout, $location, lyrics) {
			if(typeof scope.userInput != 'undefined' && scope.userInput != '') {	
				if(scope.userInput.length > control.lastLength) {
						control.lastLength++;
						if(scope.userInput[scope.userInput.length-1] != scope.currentLetter) {
							control.header.numberOfErrors++;
						}
						HelperFunctions.mainAndKeyboard.score(scope, control);
						HelperFunctions.mainAndKeyboard.completedWord(scope, control, nowPlaying, getSpotify, $timeout, $location, lyrics);
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