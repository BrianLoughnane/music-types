myApp.controller('MainCtrl', function($scope, $http, $sce, nowPlaying, play) {
	$('.main-input').focus();

	$scope.lyrics = ['hey', ' ', 'you'];
	$scope.song = nowPlaying.song;
	$scope.artist = nowPlaying.artist;
	$scope.album = nowPlaying.album;
	$scope.art = nowPlaying.art;
	$scope.spotifyId = nowPlaying.spotifyId;


	// $scope.lyrics = nowPlaying.lyrics;
	$scope.lyricIndex = 0;
	$scope.word = $scope.lyrics[$scope.lyricIndex] || '';

	$scope.userInput = "";
	$scope.currentLetter = $scope.word[$scope.userInput.length];
	$scope.progress = 0;
	$scope.score = 0; 

	$scope.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
	}
	// $scope.searchResults;

	$scope.$watch('userInput', function() {
		checkMistypes();
		score();
		completedWord();
		nextLetter();
		isSpace();
	}); // end $watch userInput

	function checkMistypes() {
		var input = $scope.userInput;
		var lastLetterTyped = input[input.length-1];
		var word = $scope.word;
		var mistypedLetters = [];

		if(typeof input == 'undefined' || input == '') {
			$scope.mistype = false;
		}

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
			$scope.userInput = "";
			updateProgress();
		}
		
		if($scope.lyricIndex == $scope.lyrics.length) {
			$scope.currentLetter = '';
			// debugger;
			var spotifyId = nowPlaying.spotifyId;
			play(spotifyId)
				.then(function(r) {
					$scope.url = r.data.preview_url;
					// $scope.url = 'https://p.scdn.co/mp3-preview/80eb23252d65c790877873093278760c6eb5ddce';
					console.log('url', $scope.url);
					// playAudio();

				});
			// debugger;	
				// .then(function() {

				// })
		}

	} // end completedWord();

	function updateProgress() {
		console.log('updateProgress');
		var currentWord = $scope.lyricIndex;
		var totalWords = $scope.lyrics.length;
		var percentComplete = (currentWord/totalWords)*100;
		$scope.progress = percentComplete;
	} //end updateProgress()

	function nextLetter() {
		if(typeof $scope.word !== 'undefined') {
			$scope.currentLetter = $scope.word[$scope.userInput.length];	
		}
	} //end nextLetter();

	function isSpace() {
		if($scope.currentLetter === ' ') {
			$scope.isSpace = true;
		} else {
			$scope.isSpace = false;
		}
	} // end isSpace()

	// function playAudio() {
	// 	$("#audio")[0].volume = 0.5;
	// 	$("#audio")[0].load();
	// 	$("#audio")[0].play();
	// }

});  //end MainCtrl
