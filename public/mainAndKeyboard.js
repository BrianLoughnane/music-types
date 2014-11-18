myApp.controller('MainCtrl', function($scope, $http, nowPlaying) {
	// $scope.lyrics = ['rtfgvb', ' ', 'I', ' ', 'went', ' ', 'down','to','the','asdf','to', 'pray'];
	$scope.song = nowPlaying.song;
	$scope.artist = nowPlaying.artist;
	$scope.album = nowPlaying.album;
	$scope.art = nowPlaying.art;
	$scope.lyrics = nowPlaying.lyrics;
	$scope.lyricIndex = 0;
	$scope.word = $scope.lyrics[$scope.lyricIndex] || '';

	$scope.userInput = "";
	$scope.currentLetter = $scope.word[$scope.userInput.length];
	$scope.progress = 0;
	$scope.score = 0; 

	
	// $scope.searchResults;

	$scope.$watch('userInput', function() {
		var input = $scope.userInput;
		var lastLetterTyped = input[input.length-1];
		var word = $scope.word;
		var mistypedLetters = [];

		$scope.lastLetterTyped = lastLetterTyped;

		if((lastLetterTyped === $scope.currentLetter) && (input.length !== 0) && !$scope.mistype) {
			$scope.score++;
		} else if ((lastLetterTyped !== $scope.currentLetter) && (input.length !== 0)) {
			$scope.score--;
		}

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

		if(input === $scope.word) {
			$scope.lyricIndex += 1;
			$scope.word = $scope.lyrics[$scope.lyricIndex];


			$scope.userInput = "";
			updateProgress();

		}
		if(typeof $scope.word !== 'undefined') {
			$scope.currentLetter = $scope.word[$scope.userInput.length];	
		}
		if($scope.currentLetter === ' ') {
			$scope.isSpace = true;
		} else {
			$scope.isSpace = false;
		}
	}); // end $watch userInput

	function updateProgress() {
		console.log('updateProgress');
		var currentWord = $scope.lyricIndex;
		var totalWords = $scope.lyrics.length;
		var percentComplete = (currentWord/totalWords)*100;
		$scope.progress = percentComplete;
	} //end updateProgress()

	$('.main-input').focus();

});  //end MainCtrl
