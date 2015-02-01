myApp.controller('MainCtrl', function (header, checkMistypes, isSpace, nextLetter, lengthCheck, infoSetup, trustSrc, $scope, $location, $interval, $timeout, nowPlaying, getSpotify) {
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

	// PROSPECTIVE FUNC:
	ctrl.lastLength = 0;
	$scope.$watch('userInput', function() {
		checkMistypes($scope, ctrl);
		isSpace(ctrl);
		lengthCheck($scope, ctrl, lyrics);
		nextLetter($scope, ctrl);
	});

	// END PROSPECTIVE FUNC


	// WORKING FUNC:

	// Main Functionality: 
	// ctrl.lastLength = 0;
	// $scope.$watch('userInput', function() {
	// 	var directory = HelperFunctions.mainAndKeyboard; 
	// 	directory.checkMistypes($scope, ctrl);
	// 	directory.isSpace(ctrl);
	// 	directory.lengthCheck($scope, ctrl, nowPlaying, getSpotify, $interval, header, $timeout, $location, lyrics);
	// 	directory.nextLetter($scope, ctrl);
	// });

	// END WORKING FUNC

});  //end MainCtrl

































