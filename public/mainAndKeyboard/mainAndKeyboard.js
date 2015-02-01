myApp.controller('MainCtrl', function ($scope, $timeout, header, checkMistypes, isSpace, nextLetter, lengthCheck, infoSetup, trustSrc, nowPlaying) {
	$('.main-input').focus();
	var ctrl = this;
	
	// Reset Timer:
	header.resetHeader();

	// Song Information From API:
	ctrl.nowPlaying = nowPlaying;

	// Header Information
	ctrl.header = header;

	// Show/Hide Art
	ctrl.listenView = true;
	$timeout(function() {
		ctrl.listenView = false;
		ctrl.header.timer.startTimer();
		return;
	}, 3000);

	// Current Information Setup (lyrics/word/letters/etc.)
	var lyrics = nowPlaying.lyrics;
	ctrl.current = infoSetup(lyrics);
	$scope.userInput = '';
	$scope.currentLetter = ctrl.current.word[0];

	// trust URL src:
	ctrl.trustSrc = trustSrc;

	// Main Functionality -- respond to user input:
	ctrl.lastLength = 0;
	$scope.$watch('userInput', function() {
		checkMistypes($scope, ctrl);
		isSpace(ctrl);
		lengthCheck($scope, ctrl, lyrics);
		nextLetter($scope, ctrl);
	});

});  //end MainCtrl

































