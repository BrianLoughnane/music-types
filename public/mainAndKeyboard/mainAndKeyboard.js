myApp.controller('MainCtrl', function($scope, $http, $sce, $location, $timeout, $interval, nowPlaying, getSpotify) {
	$('.main-input').focus();
	var interval;

	$scope.nowPlaying = nowPlaying;

	$scope.timer = {
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

	$scope.listenView = true;
	
	$timeout(function() {
		$scope.listenView = false;
		$scope.timer.startTimer();
		return;
	}, 3000);




	// $scope.lyrics = ['hi', ' ', 'you', ' ', 'Brian'];
	// $scope.lyrics = ['~!@#$', '!', '@', '$', '%', '^', '&', '*', '(', ')', '_', '+', '`', '-', '=', ']', ':', '"', ';', '>', '?', ',', '.', '/', 'a', 'b'];
	// $scope.lyrics = ['#', '{', '}', '[', '<', '('];
	// $scope.lyrics = ['-', '=', ']', ':', 'a', 'b'];
	// $scope.lyrics = ['\'', '"', 'p', 'P', '-', '\\', '|'];
	// $scope.lyrics = ['/'];


	$scope.lyrics = nowPlaying.lyrics;
	console.log('lyrics', $scope.lyrics);

	$scope.lyricIndex = 0;
	$scope.word = $scope.lyrics[$scope.lyricIndex] || '';
	$scope.wordMinusOne = $scope.lyrics[$scope.lyricIndex -1] || '';
	$scope.wordMinusTwo = $scope.lyrics[$scope.lyricIndex -2] || '';
	$scope.wordPlusOne = $scope.lyrics[$scope.lyricIndex +1] || '';
	$scope.wordPlusTwo = $scope.lyrics[$scope.lyricIndex +2] || '';

	$scope.userInput = "";
	$scope.currentLetter = $scope.word[$scope.userInput.length];
	$scope.progress = 0;
	$scope.score = 0; 
	$scope.numberOfErrors = 0;

	$scope.changeViews = function() {
		if(confirm("Are you sure you want to leave this song?")) {
			$location.path('/search');
		}
	}

	$scope.trustSrc = function(src) {
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

	function lengthCheck() {
		if(typeof $scope.userInput != 'undefined' && $scope.userInput != '') {	
			if($scope.userInput.length > lastLength) {
					lastLength++;
					if($scope.userInput[$scope.userInput.length-1] != $scope.currentLetter) {
						$scope.numberOfErrors++;
					}
					score();
					completedWord();
			} else {
				lastLength--;
			}
		}
		if($scope.userInput == '' && ($scope.isSpace || lastLength == 1)) {
			if($scope.userInput.length < lastLength) {
				lastLength--;
			}
		} 
	}

	function checkMistypes() {
		var input = $scope.userInput;
		var lastLetterTyped = input[input.length-1];
		var currentLetter = $scope.currentLetter;
		var word = $scope.word;
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
			$scope.score++;
		} else if ((lastLetterTyped !== $scope.currentLetter) && (input.length !== 0)) {
			$scope.score--;
		}
	} // end score();

	function completedWord() {

		var input = $scope.userInput;

		if(input === $scope.word) {
			$scope.lyricIndex += 1;
			$scope.word = $scope.lyrics[$scope.lyricIndex];
			$scope.word = $scope.lyrics[$scope.lyricIndex] || '';
			$scope.wordMinusOne = $scope.lyrics[$scope.lyricIndex -1] || '';
			$scope.wordMinusTwo = $scope.lyrics[$scope.lyricIndex -2] || '';
			$scope.wordPlusOne = $scope.lyrics[$scope.lyricIndex +1] || '';
			$scope.wordPlusTwo = $scope.lyrics[$scope.lyricIndex +2] || '';
			
			$scope.userInput = "";
			updateProgress();
			lastLength = 0;

			if($scope.lyricIndex == $scope.lyrics.length) {
				$scope.currentLetter = '';
				var spotifyId = nowPlaying.spotifyId;
				getSpotify(spotifyId)
					.then(function(r) {
						// console.log('spotifyCall', r);
						// debugger
						$interval.cancel(interval);
						$scope.listenView = true;
						
						// data structure changed to remove 'data' property:
						// $scope.url = r.data.preview_url;
						$scope.url = r.preview_url;						
						$timeout(function() {
							$location.path('/search');
						}, 32000);
					});
			}
		}
	} // end completedWord();

	function updateProgress() {
		var currentWord = $scope.lyricIndex;
		var totalWords = $scope.lyrics.length;
		var percentComplete = (currentWord/totalWords)*100;
		$scope.progress = percentComplete;
	} //end updateProgress()

	function nextLetter() {
		if(typeof $scope.word !== 'undefined'  && !$scope.mistype) {	
			$scope.currentLetter = $scope.word[lastLength];
		}	
	} //end nextLetter();

	function isSpace() {
		//if($scope.currentLetter === ' ') { // if the user mistypes a space, should it say (space) or not?  This option will hide (space)     
		if($scope.word === ' ') {
			$scope.isSpace = true;
		} else {
			$scope.isSpace = false;
		}
	} // end isSpace()


});  //end MainCtrl

myApp
	// .directive('LP', function() {
	// 	var letters = 
	// 	return {
	// 		restrict: 'A',
	// 		link: function(s,e,a) {

	// 		}	
	// 	}
	// })



// fingerDirectives.js

// set data on the element
// this directive watches for letters,
// generates a listener


	.directive('finger', function() {
		var dictionary = {
			leftPinky : 'qazQAZ`~1!^&*()_+{}:?HJKLNM<>YUIOP',
			leftRing : 'wsxWSX2@',
			leftMiddle : 'edcEDC3#',
			leftIndex : 'rtfgvbRTFGVB45$%',
			thumb : ' ',
			rightIndex : 'yuhjnmYUHJNM67^&',
			rightMiddle : 'ikIK8,<*',
			rightRing : 'olOL9.>(',
			rightPinky : '\'pP0)-_;:/=]+[{}|?!@#$%QWERTASDFGZXCVB~'
		}
		// var letters = 'wsxWSX2@'.split('');
		return {
			restrict: 'A',
			link: function(s,e,a) {
				function generateLetterListener (letters, e) {
					return function (newGroupArray) {
						var currentLetter = newGroupArray[0];
						var mistype = newGroupArray[1];
						
						if(letters.indexOf(currentLetter) != -1 && !mistype) {
							e.addClass('current');
						} else {
							e.removeClass('current');
						}
					}
				}
				var letters = dictionary[a.finger].split('');
				s.$watchGroup(
					['currentLetter', 'mistype'], 
					generateLetterListener(letters, e)
				);
			}
		}
	})





// HelperFunctions.js

// var HelperFunction = {
// 	generateLetterListener: function (letters, e) {
// 		return function (newGroupArray) {
// 			var currentLetter = newGroupArray[0];
// 			var mistype = newGroupArray[1];
			
// 			if(letters.indexOf(currentLetter) != -1 && !mistype) {
// 				e.addClass('current');
// 			} else {
// 				e.removeClass('current');
// 			}
// 		}
// 	},

// }































