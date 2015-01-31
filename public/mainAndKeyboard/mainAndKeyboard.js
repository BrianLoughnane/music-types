myApp.controller('MainCtrl', function ($scope, $http, $sce, $location, $timeout, $interval, nowPlaying, getSpotify) {
	$('.main-input').focus();
	var ctrl = this;
	var interval;
	// Show/Hide Art
	ctrl.listenView = true;
	$timeout(function() {
		ctrl.listenView = false;
		ctrl.timer.startTimer();
		return;
	}, 3000);
	// Header Information
	ctrl.nowPlaying = nowPlaying;
	ctrl.progress = 0;
	ctrl.score = 0; 
	ctrl.numberOfErrors = 0;
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
	ctrl.lyrics = ['hi', ' ', 'you', ' ', 'Brian'];
	// ctrl.lyrics = ['q', 'q','q', 'q'];
	// ctrl.lyrics = ['~!@#$', '!', '@', '$', '%', '^', '&', '*', '(', ')', '_', '+', '`', '-', '=', ']', ':', '"', ';', '>', '?', ',', '.', '/', 'a', 'b'];
	// ctrl.lyrics = ['#', '{', '}', '[', '<', '('];
	// ctrl.lyrics = ['-', '=', ']', ':', 'a', 'b'];
	// ctrl.lyrics = ['\'', '"', 'p', 'P', '-', '\\', '|'];
	// ctrl.lyrics = ['/'];

	//Lyrics & Current Word & Letter Information
	// ctrl.lyrics = nowPlaying.lyrics;
	ctrl.lyricIndex = 0;
	ctrl.word = ctrl.lyrics[0] || '';
	ctrl.wordMinusOne = '';
	ctrl.wordMinusTwo = '';
	ctrl.wordPlusOne = ctrl.lyrics[ctrl.lyricIndex +1] || '';
	ctrl.wordPlusTwo = ctrl.lyrics[ctrl.lyricIndex +2] || '';
	$scope.userInput = '';
	$scope.currentLetter = ctrl.word[0];

	ctrl.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
	}

	var lastLength = 0;


	// Prospective functionality: 

	ctrl.lastLength = 0;

	// function checkMistypes(scope, control) {
	// 	var input = scope.userInput;
	// 	var word = control.word;
	// 	var lastLetterTyped = input[input.length-1];
	// 	var mistypes = [];

	// 	for(var i = 0; i < input.length; i++) {
	// 		if(input[i] != word[i]) {
	// 			scope.mistype = true;
	// 			mistypes.push(i);
	// 		} 
	// 	}

	// 	if (!mistypes.length){
	// 		scope.mistype = false;
	// 	}

	// 	scope.mistypedLetters = mistypes;
	// 	// debugger
	// }

	// function nextLetter(scope, control) {
	// 	if(typeof control.word !== 'undefined'  && !scope.mistype) {	
	// 		scope.currentLetter = control.word[control.lastLength];
	// 	}	
	// }

	// function isSpace(control) {
	// 	if(control.word === ' ') {
	// 		control.isSpace = true;
	// 	} else {
	// 		control.isSpace = false;
	// 	}
	// }

	// function score(scope, control) {
	// 	var input = scope.userInput;
	// 	var lastLetterTyped = input[input.length-1];

	// 	scope.lastLetterTyped = lastLetterTyped;

	// 	if((lastLetterTyped === scope.currentLetter) && (input.length !== 0) && !scope.mistype) {
	// 		control.score++;
	// 	} else if ((lastLetterTyped !== scope.currentLetter) && (input.length !== 0)) {
	// 		control.score--;
	// 	}
	// }

	// function completedWord(scope, control) {

	// 	var input = scope.userInput;

	// 	if(input === ctrl.word) {
	// 		control.lyricIndex += 1;
	// 		control.word = control.lyrics[control.lyricIndex];
	// 		control.word = control.lyrics[control.lyricIndex] || '';
	// 		control.wordMinusOne = control.lyrics[control.lyricIndex -1] || '';
	// 		control.wordMinusTwo = control.lyrics[control.lyricIndex -2] || '';
	// 		control.wordPlusOne = control.lyrics[control.lyricIndex +1] || '';
	// 		control.wordPlusTwo = control.lyrics[control.lyricIndex +2] || '';
			
	// 		scope.userInput = "";
	// 		updateProgress(control);
	// 		control.lastLength = 0;

	// 		if(control.lyricIndex == control.lyrics.length) {
	// 			scope.currentLetter = '';
	// 			var spotifyId = nowPlaying.spotifyId;
	// 			getSpotify(spotifyId)
	// 				.then(function(r) {
	// 					// console.log('spotifyCall', r);
	// 					// debugger
	// 					$interval.cancel(interval);
	// 					control.listenView = true;
						
	// 					// data structure changed to remove 'data' property:
	// 					// control.url = r.data.preview_url;
	// 					control.url = r.preview_url;						
	// 					$timeout(function() {
	// 						$location.path('/search');
	// 					}, 32000);
	// 				});
	// 		}
	// 	}
	// }

	// function updateProgress(control) {
	// 	var currentWord = control.lyricIndex;
	// 	var totalWords = control.lyrics.length;
	// 	var percentComplete = (currentWord/totalWords)*100;
	// 	control.progress = percentComplete;
	// }

	$scope.$watch('userInput', function() {
		var directory = HelperFunctions.mainAndKeyboard; 
		directory.checkMistypes($scope, ctrl);
		directory.isSpace(ctrl);
		directory.lengthCheck($scope, ctrl, nowPlaying, getSpotify, $interval, interval, $timeout, $location);
		directory.nextLetter($scope, ctrl);
	});








	// working functionality:


	// $scope.$watch('userInput', function() {
	// 	checkMistypes();
	// 	isSpace();
	// 	lengthCheck();
	// 	nextLetter();
	// }); // end $watch userInput

	// function lengthCheck() {
	// 	if(typeof $scope.userInput != 'undefined' && $scope.userInput != '') {	
	// 		if($scope.userInput.length > lastLength) {
	// 				lastLength++;
	// 				if($scope.userInput[$scope.userInput.length-1] != $scope.currentLetter) {
	// 					ctrl.numberOfErrors++;
	// 				}
	// 				score();
	// 				completedWord();
	// 		} else {
	// 			lastLength--;
	// 		}
	// 	}
	// 	if($scope.userInput == '' && (ctrl.isSpace || lastLength == 1)) {
	// 		if($scope.userInput.length < lastLength) {
	// 			lastLength--;
	// 		}
	// 	} 
	// }

	// function checkMistypes() {
	// 	var input = $scope.userInput;
	// 	var lastLetterTyped = input[input.length-1];
	// 	var currentLetter = $scope.currentLetter;
	// 	var word = ctrl.word;
	// 	var mistypedLetters = [];

	// 	for(var i = 0; i < input.length; i++) {
	// 		if(input[i] != word[i]) {
	// 			$scope.mistype = true;
	// 			mistypedLetters.push(i);
	// 		} 
	// 	}

	// 	if (!mistypedLetters.length){
	// 		$scope.mistype = false;
	// 	}

	// 	$scope.mistypedLetters = mistypedLetters;
	// } // end checkMistypes()

	// function score() {
	// 	var input = $scope.userInput;
	// 	var lastLetterTyped = input[input.length-1];

	// 	$scope.lastLetterTyped = lastLetterTyped;

	// 	if((lastLetterTyped === $scope.currentLetter) && (input.length !== 0) && !$scope.mistype) {
	// 		ctrl.score++;
	// 	} else if ((lastLetterTyped !== $scope.currentLetter) && (input.length !== 0)) {
	// 		ctrl.score--;
	// 	}
	// } // end score();

	// function completedWord() {

	// 	var input = $scope.userInput;

	// 	if(input === ctrl.word) {
	// 		ctrl.lyricIndex += 1;
	// 		ctrl.word = ctrl.lyrics[ctrl.lyricIndex];
	// 		ctrl.word = ctrl.lyrics[ctrl.lyricIndex] || '';
	// 		ctrl.wordMinusOne = ctrl.lyrics[ctrl.lyricIndex -1] || '';
	// 		ctrl.wordMinusTwo = ctrl.lyrics[ctrl.lyricIndex -2] || '';
	// 		ctrl.wordPlusOne = ctrl.lyrics[ctrl.lyricIndex +1] || '';
	// 		ctrl.wordPlusTwo = ctrl.lyrics[ctrl.lyricIndex +2] || '';
			
	// 		$scope.userInput = "";
	// 		updateProgress();
	// 		lastLength = 0;

	// 		if(ctrl.lyricIndex == ctrl.lyrics.length) {
	// 			$scope.currentLetter = '';
	// 			var spotifyId = nowPlaying.spotifyId;
	// 			getSpotify(spotifyId)
	// 				.then(function(r) {
	// 					// console.log('spotifyCall', r);
	// 					// debugger
	// 					$interval.cancel(interval);
	// 					ctrl.listenView = true;
						
	// 					// data structure changed to remove 'data' property:
	// 					// ctrl.url = r.data.preview_url;
	// 					ctrl.url = r.preview_url;						
	// 					$timeout(function() {
	// 						$location.path('/search');
	// 					}, 32000);
	// 				});
	// 		}
	// 	}
	// } // end completedWord();

	// function updateProgress() {
	// 	var currentWord = ctrl.lyricIndex;
	// 	var totalWords = ctrl.lyrics.length;
	// 	var percentComplete = (currentWord/totalWords)*100;
	// 	ctrl.progress = percentComplete;
	// } //end updateProgress()

	// function nextLetter() {
	// 	if(typeof ctrl.word !== 'undefined'  && !$scope.mistype) {	
	// 		$scope.currentLetter = ctrl.word[lastLength];
	// 	}	
	// } //end nextLetter();

	// function isSpace() {
	// 	if(ctrl.word === ' ') {
	// 		ctrl.isSpace = true;
	// 	} else {
	// 		ctrl.isSpace = false;
	// 	}
	// } // end isSpace()

});  //end MainCtrl

































