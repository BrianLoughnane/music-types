myApp.controller('MainCtrl', function($scope, $http, $sce, $location, $timeout, nowPlaying, getSpotify) {
	$('.main-input').focus();

	
	$scope.song = nowPlaying.song;
	$scope.artist = nowPlaying.artist;
	$scope.album = nowPlaying.album;
	$scope.art = nowPlaying.art;
	$scope.spotifyId = nowPlaying.spotifyId;
	$scope.tracking = nowPlaying.tracking;
	$scope.listenView = false;
	
	$scope.listenView = true;
	$timeout(function() {
		return $scope.listenView = false;
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
		if($scope.userInput == '' && $scope.isSpace) {
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

		if(typeof input == 'undefined' || input == '') {
			$scope.mistype = false;
		} 
		// else if(lastLetterTyped != currentLetter) {
		// 	$scope.numberOfErrors++;
		// }

		for(var i = 0; i < input.length; i++) {
			if(input[i] != word[i]) {
				$scope.mistype = true;
				mistypedLetters.push(i);
			} else if (!mistypedLetters.length){
				$scope.mistype = false;
			}
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
			// debugger;
			
			console.log($scope.lastWord, $scope.word, $scope.nextWord);
			$scope.userInput = "";
			updateProgress();
			lastLength = 0;

			if($scope.lyricIndex == $scope.lyrics.length) {
				$scope.currentLetter = '';
				// $scope.word = undefined;	
				// debugger;
				var spotifyId = nowPlaying.spotifyId;
				getSpotify(spotifyId)
					.then(function(r) {
						console.log('spotifyCall', r);
						$scope.listenView = true;
						$scope.url = r.data.preview_url;
						$timeout(function() {
							$location.path('/search');
						}, 32000);
						// $scope.url = r.data.external_urls.spotify; // X-Frame-Options: DENY ...boo...
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
		if(typeof $scope.word !== 'undefined') {
			// $scope.currentLetter = $scope.word[$scope.userInput.length];	
			$scope.currentLetter = $scope.word[lastLength];	
		}

		// if(($scope.currentLetter == "'" || $scope.currentLetter == '"') && !$scope.mistype) {
		// 	$('.quote').addClass('current');
		// 	$('.rightPinky').addClass('current');
		// } else {
		// 	$('.quote').removeClass('current');
		// 	$('.rightPinky').removeClass('current');
		// }

		// if ($scope.currentLetter == '"' && !$scope.mistype) {
		// 	$('.quote').addClass('current');
		// 	$('.rightPinky').addClass('current');	
		// 	$('.leftPinky').addClass('current');	
		// }

		// if(($scope.currentLetter == "|" || $scope.currentLetter == "\\") && !$scope.mistype) {
		// 	$('.backslash').addClass('current');
		// } else {
		// 	$('.backslash').removeClass('current');
		// }
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