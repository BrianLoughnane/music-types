
var myApp = angular.module('myApp', []);
myApp.controller('myController', function($scope) {
	$scope.lyrics = ['I','went','down','to','the','river','to', 'pray'];
	$scope.lyricIndex = 0;
	$scope.word = $scope.lyrics[$scope.lyricIndex];
	$scope.userInput = "";
	// $scope.lastLetterTyped = $scope.userInput[$scope.userInput.length-1];
	$scope.currentLetter = $scope.word[$scope.userInput.length];
	$scope.progress = 0;
	$scope.score = 0; 
	$scope.song = 'song';
	$scope.artist = 'artist';	


	$scope.$watch('userInput', function() {
		var input = $scope.userInput;
		var lastLetterTyped = input[input.length-1];	
		if((lastLetterTyped === $scope.currentLetter) && (input.length !== 0)) {
			$scope.score++;
		} else if ((lastLetterTyped !== $scope.currentLetter) && (input.length !== 0)) {
			$scope.score--;
		}
		if(input === $scope.word) {
			$scope.lyricIndex += 1;
			$scope.word = $scope.lyrics[$scope.lyricIndex];
			$scope.userInput = "";
		}
		$scope.currentLetter = $scope.word[$scope.userInput.length];
	});



});

/*===============================
Keyboard
===============================*/

$(document).on('ready', function() {


$(document).on('keydown', function(event) {

	switch (event.which) {
		case 192:
			$('.tilde').addClass('active');
			$('.leftPinky').addClass('active');
			break;
		case 49:
			$('.one').addClass('active');
			$('.leftPinky').addClass('active');
			break;		
		case 50:
			$('.two').addClass('active');
			$('.leftRing').addClass('active');
			break;
		case 51:
			$('.three').addClass('active');
			$('.leftMiddle').addClass('active');
			break;
		case 52:
			$('.four').addClass('active');
			$('.leftIndex').addClass('active');
			break;
		case 53:
			$('.five').addClass('active');
			$('.leftIndex').addClass('active');
			break;
		case 54:
			$('.six').addClass('active');
			$('.rightIndex').addClass('active');
			break;
		case 55:
			$('.seven').addClass('active');
			$('.rightIndex').addClass('active');
			break;
		case 56:
			$('.eight').addClass('active');
			$('.rightMiddle').addClass('active');
			break;
		case 57:
			$('.nine').addClass('active');
			$('.rightRing').addClass('active');
			break;
		case 48:
			$('.zero').addClass('active');
			$('.rightPinky').addClass('active');
			break;
		case 189:
			$('.dash').addClass('active');
			$('.rightPinky').addClass('active');
			break;
		case 187:
			$('.equals').addClass('active');
			$('.rightPinky').addClass('active');
			break;
		case 8:
			$('.delete').addClass('active');
			$('.rightPinky').addClass('active');
			break;
		case 9:
			$('.tab').addClass('active');
			$('.leftPinky').addClass('active');
			break;
		case 81:
			$('.q').addClass('active');
			$('.leftPinky').addClass('active');
			break;
		case 87:
			$('.w').addClass('active');
			$('.leftRing').addClass('active');
			break;
		case 69:
			$('.e').addClass('active');
			$('.leftMiddle').addClass('active');
			break;
		case 82:
			$('.r').addClass('active');
			$('.leftIndex').addClass('active');
			break;
		case 84:
			$('.t').addClass('active');
			$('.leftIndex').addClass('active');
			break;
		case 89:
			$('.y').addClass('active');
			$('.rightIndex').addClass('active');
			break;
		case 85:
			$('.u').addClass('active');
			$('.rightIndex').addClass('active');
			break;
		case 73:
			$('.i').addClass('active');
			$('.rightMiddle').addClass('active');
			break;
		case 79:
			$('.o').addClass('active');
			$('.rightRing').addClass('active');
			break;
		case 80:
			$('.p').addClass('active');
			$('.rightPinky').addClass('active');
			break;
		case 219:
			$('.leftBracket').addClass('active');
			$('.rightPinky').addClass('active');
			break;
		case 221:
			$('.rightBracket').addClass('active');
			$('.rightPinky').addClass('active');
			break;
		case 220:
			$('.backslash').addClass('active');
			$('.rightPinky').addClass('active');
			break;
		case 20:
			$('.caps').addClass('active');
			$('.leftPinky').addClass('active');
			break;
		case 65:
			$('.a').addClass('active');
			$('.leftPinky').addClass('active');
			break;
		case 83:
			$('.s').addClass('active');
			$('.leftRing').addClass('active');
			break;
		case 68:
			$('.d').addClass('active');
			$('.leftMiddle').addClass('active');
			break;
		case 70:
			$('.f').addClass('active');
			$('.leftIndex').addClass('active');
			break;
		case 71:
			$('.g').addClass('active');
			$('.leftIndex').addClass('active');
			break;
		case 72:
			$('.h').addClass('active');
			$('.rightIndex').addClass('active');
			break;
		case 74:
			$('.j').addClass('active');
			$('.rightIndex').addClass('active');
			break;
		case 75:
			$('.k').addClass('active');
			$('.rightMiddle').addClass('active');
			break;
		case 76:
			$('.l').addClass('active');
			$('.rightRing').addClass('active');
			break;
		case 186:
			$('.semicolon').addClass('active');
			$('.rightPinky').addClass('active');
			break;
		case 222:
			$('.quote').addClass('active');
			$('.rightPinky').addClass('active');
			break;
		case 13:
			$('.enter').addClass('active');
			$('.rightPinky').addClass('active');
			break;
		case 16:
			$('.shift').addClass('active');
			$('.leftPinky').addClass('active');
			$('.rightPinky').addClass('active');
			break;
		case 90:
			$('.z').addClass('active');
			$('.leftPinky').addClass('active');
			break;
		case 88:
			$('.x').addClass('active');
			$('.leftRing').addClass('active');
			break;
		case 67:
			$('.c').addClass('active');
			$('.leftMiddle').addClass('active');
			break;
		case 86:
			$('.v').addClass('active');
			$('.leftIndex').addClass('active');
			break;
		case 66:
			$('.b').addClass('active');
			$('.leftIndex').addClass('active');
			break;
		case 78:
			$('.n').addClass('active');
			$('.rightIndex').addClass('active');
			break;
		case 77:
			$('.m').addClass('active');
			$('.rightIndex').addClass('active');
			break;
		case 188:
			$('.comma').addClass('active');
			$('.rightMiddle').addClass('active');
			break;
		case 190:
			$('.period').addClass('active');
			$('.rightRing').addClass('active');
			break;
		case 191:
			$('.slash').addClass('active');
			$('.rightPinky').addClass('active');
			break;
		case 17:
			$('.ctrl').addClass('active');
			$('.leftPinky').addClass('active');
			break;
		case 18:
			$('.alt').addClass('active');
			$('.leftPinky').addClass('active');
			$('.rightRing').addClass('active');
			break;
		case 224:
			$('.cmd').addClass('active');
			$('.thumb').addClass('active');
			break;
		case 32:
			$('.space').addClass('active');
			$('.thumb').addClass('active');
			break;
		default:
			console.log('switch default');
	}

}); //End On Keydown Handler

$(document).on('keyup', function(event) {
	switch (event.which) {
		case 192:
			$('.tilde').removeClass('active');
			$('.leftPinky').removeClass('active');
			break;
		case 49:
			$('.one').removeClass('active');
			$('.leftPinky').removeClass('active');
			break;		
		case 50:
			$('.two').removeClass('active');
			$('.leftRing').removeClass('active');
			break;
		case 51:
			$('.three').removeClass('active');
			$('.leftMiddle').removeClass('active');
			break;
		case 52:
			$('.four').removeClass('active');
			$('.leftIndex').removeClass('active');
			break;
		case 53:
			$('.five').removeClass('active');
			$('.leftIndex').removeClass('active');
			break;
		case 54:
			$('.six').removeClass('active');
			$('.rightIndex').removeClass('active');
			break;
		case 55:
			$('.seven').removeClass('active');
			$('.rightIndex').removeClass('active');
			break;
		case 56:
			$('.eight').removeClass('active');
			$('.rightMiddle').removeClass('active');
			break;
		case 57:
			$('.nine').removeClass('active');
			$('.rightRing').removeClass('active');
			break;
		case 48:
			$('.zero').removeClass('active');
			$('.rightPinky').removeClass('active');
			break;
		case 189:
			$('.dash').removeClass('active');
			$('.rightPinky').removeClass('active');
			break;
		case 187:
			$('.equals').removeClass('active');
			$('.rightPinky').removeClass('active');
			break;
		case 8:
			$('.delete').removeClass('active');
			$('.rightPinky').removeClass('active');
			break;
		case 9:
			$('.tab').removeClass('active');
			$('.leftPinky').removeClass('active');
			break;
		case 81:
			$('.q').removeClass('active');
			$('.leftPinky').removeClass('active');
			break;
		case 87:
			$('.w').removeClass('active');
			$('.leftRing').removeClass('active');
			break;
		case 69:
			$('.e').removeClass('active');
			$('.leftMiddle').removeClass('active');
			break;
		case 82:
			$('.r').removeClass('active');
			$('.leftIndex').removeClass('active');
			break;
		case 84:
			$('.t').removeClass('active');
			$('.leftIndex').removeClass('active');
			break;
		case 89:
			$('.y').removeClass('active');
			$('.rightIndex').removeClass('active');
			break;
		case 85:
			$('.u').removeClass('active');
			$('.rightIndex').removeClass('active');
			break;
		case 73:
			$('.i').removeClass('active');
			$('.rightMiddle').removeClass('active');
			break;
		case 79:
			$('.o').removeClass('active');
			$('.rightRing').removeClass('active');
			break;
		case 80:
			$('.p').removeClass('active');
			$('.rightPinky').removeClass('active');
			break;
		case 219:
			$('.leftBracket').removeClass('active');
			$('.rightPinky').removeClass('active');
			break;
		case 221:
			$('.rightBracket').removeClass('active');
			$('.rightPinky').removeClass('active');
			break;
		case 220:
			$('.backslash').removeClass('active');
			$('.rightPinky').removeClass('active');
			break;
		case 20:
			$('.caps').removeClass('active');
			$('.leftPinky').removeClass('active');
			break;
		case 65:
			$('.a').removeClass('active');
			$('.leftPinky').removeClass('active');
			break;
		case 83:
			$('.s').removeClass('active');
			$('.leftRing').removeClass('active');
			break;
		case 68:
			$('.d').removeClass('active');
			$('.leftMiddle').removeClass('active');
			break;
		case 70:
			$('.f').removeClass('active');
			$('.leftIndex').removeClass('active');
			break;
		case 71:
			$('.g').removeClass('active');
			$('.leftIndex').removeClass('active');
			break;
		case 72:
			$('.h').removeClass('active');
			$('.rightIndex').removeClass('active');
			break;
		case 74:
			$('.j').removeClass('active');
			$('.rightIndex').removeClass('active');
			break;
		case 75:
			$('.k').removeClass('active');
			$('.rightMiddle').removeClass('active');
			break;
		case 76:
			$('.l').removeClass('active');
			$('.rightRing').removeClass('active');
			break;
		case 186:
			$('.semicolon').removeClass('active');
			$('.rightPinky').removeClass('active');
			break;
		case 222:
			$('.quote').removeClass('active');
			$('.rightPinky').removeClass('active');
			break;
		case 13:
			$('.enter').removeClass('active');
			$('.rightPinky').removeClass('active');
			break;
		case 16:
			$('.shift').removeClass('active');
			$('.leftPinky').removeClass('active');
			$('.rightPinky').removeClass('active');
			break;
		case 90:
			$('.z').removeClass('active');
			$('.leftPinky').removeClass('active');
			break;
		case 88:
			$('.x').removeClass('active');
			$('.leftRing').removeClass('active');
			break;
		case 67:
			$('.c').removeClass('active');
			$('.leftMiddle').removeClass('active');
			break;
		case 86:
			$('.v').removeClass('active');
			$('.leftIndex').removeClass('active');
			break;
		case 66:
			$('.b').removeClass('active');
			$('.leftIndex').removeClass('active');
			break;
		case 78:
			$('.n').removeClass('active');
			$('.rightIndex').removeClass('active');
			break;
		case 77:
			$('.m').removeClass('active');
			$('.rightIndex').removeClass('active');
			break;
		case 188:
			$('.comma').removeClass('active');
			$('.rightMiddle').removeClass('active');
			break;
		case 190:
			$('.period').removeClass('active');
			$('.rightRing').removeClass('active');
			break;
		case 191:
			$('.slash').removeClass('active');
			$('.rightPinky').removeClass('active');
			break;
		case 17:
			$('.ctrl').removeClass('active');
			$('.leftPinky').removeClass('active');
			break;
		case 18:
			$('.alt').removeClass('active');
			$('.leftPinky').removeClass('active');
			$('.rightRing').removeClass('active');
			break;
		case 224:
			$('.cmd').removeClass('active');
			$('.thumb').removeClass('active');
			break;
		case 32:
			$('.space').removeClass('active');
			$('.thumb').removeClass('active');
			break;
		default:
			console.log('switch default');
	}

}); //End On Keyup Handler

});// End On Ready Handler