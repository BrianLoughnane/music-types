myApp.controller('MainCtrl', function($scope, $http, $sce, $location, $timeout, $interval, nowPlaying, getSpotify) {
	$('.main-input').focus();
	var interval;
	var ctrl = this;

	ctrl.nowPlaying = nowPlaying;

	ctrl.timer = {
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
		}
	}


	// show the artwork before starting the song/timer

	ctrl.listenView = true;
	
	$timeout(function() {
		ctrl.listenView = false;
		ctrl.timer.startTimer();
		return;
	}, 3000);

	// ctrl.lyrics = ['hi', ' ', 'you', ' ', 'Brian'];
	// ctrl.lyrics = ['q', 'q','q', 'q'];
	// ctrl.lyrics = ['~!@#$', '!', '@', '$', '%', '^', '&', '*', '(', ')', '_', '+', '`', '-', '=', ']', ':', '"', ';', '>', '?', ',', '.', '/', 'a', 'b'];
	// ctrl.lyrics = ['#', '{', '}', '[', '<', '('];
	// ctrl.lyrics = ['-', '=', ']', ':', 'a', 'b'];
	// ctrl.lyrics = ['\'', '"', 'p', 'P', '-', '\\', '|'];
	// ctrl.lyrics = ['/'];


	ctrl.lyrics = nowPlaying.lyrics;
	console.log('lyrics', ctrl.lyrics);

	ctrl.lyricIndex = 0;
	ctrl.word = ctrl.lyrics[ctrl.lyricIndex] || '';
	ctrl.wordMinusOne = ctrl.lyrics[ctrl.lyricIndex -1] || '';
	ctrl.wordMinusTwo = ctrl.lyrics[ctrl.lyricIndex -2] || '';
	ctrl.wordPlusOne = ctrl.lyrics[ctrl.lyricIndex +1] || '';
	ctrl.wordPlusTwo = ctrl.lyrics[ctrl.lyricIndex +2] || '';

	$scope.userInput = "";
	$scope.currentLetter = ctrl.word[$scope.userInput.length];
	ctrl.progress = 0;
	ctrl.score = 0; 
	ctrl.numberOfErrors = 0;

	ctrl.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
	}
	// $scope.searchResults;

	var lastLength = 0;

	$scope.$watch('userInput', function() {
		checkMistypes();
		isSpace();
		lengthCheck();
		nextLetter();
	}); // end $watch userInput

	// ctrl.evaluate = function() {
	// 	checkMistypes();
	// 	isSpace();
	// 	lengthCheck();
	// 	nextLetter();
	// }

	function lengthCheck() {
		if(typeof $scope.userInput != 'undefined' && $scope.userInput != '') {	
			if($scope.userInput.length > lastLength) {
					lastLength++;
					if($scope.userInput[$scope.userInput.length-1] != $scope.currentLetter) {
						ctrl.numberOfErrors++;
					}
					score();
					completedWord();
			} else {
				lastLength--;
			}
		}
		if($scope.userInput == '' && (ctrl.isSpace || lastLength == 1)) {
			if($scope.userInput.length < lastLength) {
				lastLength--;
			}
		} 
	}

	function checkMistypes() {
		var input = $scope.userInput;
		var lastLetterTyped = input[input.length-1];
		var currentLetter = $scope.currentLetter;
		var word = ctrl.word;
		var mistypedLetters = [];

		for(var i = 0; i < input.length; i++) {
			if(input[i] != word[i]) {
				$scope.mistype = true;
				mistypedLetters.push(i);
			} 
		}

		if (!mistypedLetters.length){
			$scope.mistype = false;
		}

		$scope.mistypedLetters = mistypedLetters;
	} // end checkMistypes()

	function score() {
		var input = $scope.userInput;
		var lastLetterTyped = input[input.length-1];

		$scope.lastLetterTyped = lastLetterTyped;

		if((lastLetterTyped === $scope.currentLetter) && (input.length !== 0) && !$scope.mistype) {
			ctrl.score++;
		} else if ((lastLetterTyped !== $scope.currentLetter) && (input.length !== 0)) {
			ctrl.score--;
		}
	} // end score();

	function completedWord() {

		var input = $scope.userInput;

		if(input === ctrl.word) {
			ctrl.lyricIndex += 1;
			ctrl.word = ctrl.lyrics[ctrl.lyricIndex];
			ctrl.word = ctrl.lyrics[ctrl.lyricIndex] || '';
			ctrl.wordMinusOne = ctrl.lyrics[ctrl.lyricIndex -1] || '';
			ctrl.wordMinusTwo = ctrl.lyrics[ctrl.lyricIndex -2] || '';
			ctrl.wordPlusOne = ctrl.lyrics[ctrl.lyricIndex +1] || '';
			ctrl.wordPlusTwo = ctrl.lyrics[ctrl.lyricIndex +2] || '';
			
			$scope.userInput = "";
			updateProgress();
			lastLength = 0;

			if(ctrl.lyricIndex == ctrl.lyrics.length) {
				$scope.currentLetter = '';
				var spotifyId = nowPlaying.spotifyId;
				getSpotify(spotifyId)
					.then(function(r) {
						// console.log('spotifyCall', r);
						// debugger
						$interval.cancel(interval);
						ctrl.listenView = true;
						
						// data structure changed to remove 'data' property:
						// ctrl.url = r.data.preview_url;
						ctrl.url = r.preview_url;						
						$timeout(function() {
							$location.path('/search');
						}, 32000);
					});
			}
		}
	} // end completedWord();

	function updateProgress() {
		var currentWord = ctrl.lyricIndex;
		var totalWords = ctrl.lyrics.length;
		var percentComplete = (currentWord/totalWords)*100;
		ctrl.progress = percentComplete;
	} //end updateProgress()

	function nextLetter() {
		if(typeof ctrl.word !== 'undefined'  && !$scope.mistype) {	
			$scope.currentLetter = ctrl.word[lastLength];
		}	
	} //end nextLetter();

	function isSpace() {
		//if($scope.currentLetter === ' ') { // if the user mistypes a space, should it say (space) or not?  This option will hide (space)     
		if(ctrl.word === ' ') {
			ctrl.isSpace = true;
		} else {
			ctrl.isSpace = false;
		}
	} // end isSpace()


});  //end MainCtrl

































