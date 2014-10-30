var myApp = angular.module('myApp', []);
myApp.controller('myController', function($scope) {
	$scope.progress = 0;
	$scope.score = 0;
	$scope.word = 'ready';
	$scope.song = 'song';
	$scope.artist = 'artist';
});

/*===============================
Keyboard
===============================*/

$(document).on('ready', function() {


$(document).on('keydown', function(event) {
	// if(event.which === 88) {
	// 	console.log('hit x');
	// }

	switch (event.which) {
		case 192:
			console.log('tilde');
			break;
		case 49:
			console.log('one');
			break;		
		case 50:
			console.log('two');
			break;
		case 51:
			console.log('three');
			break;
		case 52:
			console.log('four');
			break;
		case 53:
			console.log('five');
			break;
		case 54:
			console.log('six');
			break;
		case 55:
			console.log('seven');
			break;
		case 56:
			console.log('eight');
			break;
		case 57:
			console.log('nine');
			break;
		case 48:
			console.log('zero');
			break;
		case 189:
			console.log('dash');
			break;
		case 187:
			console.log('equals');
			break;
		case 8:
			console.log('delete');
			break;
		case 9:
			console.log('tab');
			break;
		case 81:
			console.log('q');
			break;
		case 87:
			console.log('w');
			break;
		case 69:
			console.log('e');
			break;
		case 82:
			console.log('r');
			break;
		case 84:
			console.log('t');
			break;
		case 89:
			console.log('y');
			break;
		case 85:
			console.log('u');
			break;
		case 73:
			console.log('i');
			break;
		case 79:
			console.log('o');
			break;
		case 80:
			console.log('p');
			break;
		case 219:
			console.log('leftBracket');
			break;
		case 221:
			console.log('rightBracket');
			break;
		case 220:
			console.log('backslash');
			break;
		case 20:
			console.log('caps');
			break;
		case 65:
			console.log('a');
			break;
		case 83:
			console.log('s');
			break;
		case 68:
			console.log('d');
			break;
		case 70:
			console.log('f');
			break;
		case 71:
			console.log('g');
			break;
		case 72:
			console.log('h');
			break;
		case 74:
			console.log('j');
			break;
		case 75:
			console.log('k');
			break;
		case 76:
			console.log('l');
			break;
		case 186:
			console.log('semicolon');
			break;
		case 222:
			console.log("quote");
			break;
		case 13:
			console.log('enter');
			break;
		case 16:
			console.log('shift');
			break;
		case 90:
			console.log('z');
			break;
		case 88:
			console.log('x');
			break;
		case 67:
			console.log('c');
			break;
		case 86:
			console.log('v');
			break;
		case 66:
			console.log('b');
			break;
		case 78:
			console.log('n');
			break;
		case 77:
			console.log('m');
			break;
		case 188:
			console.log('comma');
			break;
		case 190:
			console.log('period');
			break;
		case 191:
			console.log('slash');
			break;
		case 17:
			console.log('ctrl');
			break;
		case 18:
			console.log('alt');
			break;
		case 224:
			console.log('cmd');
			break;
		case 32:
			console.log('space');
			break;
		default:
			console.log('switch default');
	}

});

});// End On Ready Handler