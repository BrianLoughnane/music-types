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
			$('.tilde').addClass('active');
			console.log('tilde');
			break;
		case 49:
			$('.one').addClass('active');
			console.log('one');
			break;		
		case 50:
			$('.two').addClass('active');
			console.log('two');
			break;
		case 51:
			$('.three').addClass('active');
			console.log('three');
			break;
		case 52:
			$('.four').addClass('active');
			console.log('four');
			break;
		case 53:
			$('.five').addClass('active');
			console.log('five');
			break;
		case 54:
			$('.six').addClass('active');
			console.log('six');
			break;
		case 55:
			$('.seven').addClass('active');
			console.log('seven');
			break;
		case 56:
			$('.eight').addClass('active');
			console.log('eight');
			break;
		case 57:
			$('.nine').addClass('active');
			console.log('nine');
			break;
		case 48:
			$('.zero').addClass('active');
			console.log('zero');
			break;
		case 189:
			$('.dash').addClass('active');
			console.log('dash');
			break;
		case 187:
			$('.equals').addClass('active');
			console.log('equals');
			break;
		case 8:
			$('.delete').addClass('active');
			console.log('delete');
			break;
		case 9:
			$('.tab').addClass('active');
			console.log('tab');
			break;
		case 81:
			$('.q').addClass('active');
			console.log('q');
			break;
		case 87:
			$('.w').addClass('active');
			console.log('w');
			break;
		case 69:
			$('.e').addClass('active');
			console.log('e');
			break;
		case 82:
			$('.r').addClass('active');
			console.log('r');
			break;
		case 84:
			$('.t').addClass('active');
			console.log('t');
			break;
		case 89:
			$('.y').addClass('active');
			console.log('y');
			break;
		case 85:
			$('.u').addClass('active');
			console.log('u');
			break;
		case 73:
			$('.i').addClass('active');
			break;
		case 79:
			$('.o').addClass('active');
			break;
		case 80:
			$('.p').addClass('active');
			break;
		case 219:
			$('.leftBracket').addClass('active');
			break;
		case 221:
			$('.rightBracket').addClass('active');
			break;
		case 220:
			$('.backslash').addClass('active');
			break;
		case 20:
			$('.caps').addClass('active');
			break;
		case 65:
			$('.a').addClass('active');
			break;
		case 83:
			$('.s').addClass('active');
			break;
		case 68:
			$('.d').addClass('active');
			break;
		case 70:
			$('.f').addClass('active');
			break;
		case 71:
			$('.g').addClass('active');
			break;
		case 72:
			$('.h').addClass('active');
			break;
		case 74:
			$('.j').addClass('active');
			break;
		case 75:
			$('.k').addClass('active');
			break;
		case 76:
			$('.l').addClass('active');
			break;
		case 186:
			$('.semicolon').addClass('active');
			break;
		case 222:
			$('.quote').addClass('active')
			break;
		case 13:
			$('.enter').addClass('active');
			break;
		case 16:
			$('.shift').addClass('active');
			break;
		case 90:
			$('.z').addClass('active');
			break;
		case 88:
			$('.x').addClass('active');
			break;
		case 67:
			$('.c').addClass('active');
			break;
		case 86:
			$('.v').addClass('active');
			break;
		case 66:
			$('.b').addClass('active');
			break;
		case 78:
			$('.n').addClass('active');
			break;
		case 77:
			$('.m').addClass('active');
			break;
		case 188:
			$('.comma').addClass('active');
			break;
		case 190:
			$('.period').addClass('active');
			break;
		case 191:
			$('.slash').addClass('active');
			break;
		case 17:
			$('.ctrl').addClass('active');
			break;
		case 18:
			$('.alt').addClass('active');
			break;
		case 224:
			$('.cmd').addClass('active');
			break;
		case 32:
			$('.space').addClass('active');
			break;
		default:
			console.log('switch default');
	}

}); //End On Keydown Handler

$(document).on('keyup', function(event) {
	// if(event.which === 88) {
	// 	console.log('hit x');
	// }

	switch (event.which) {
		case 192:
			$('.tilde').removeClass('active');
			console.log('tilde');
			break;
		case 49:
			$('.one').removeClass('active');
			console.log('one');
			break;		
		case 50:
			$('.two').removeClass('active');
			console.log('two');
			break;
		case 51:
			$('.three').removeClass('active');
			console.log('three');
			break;
		case 52:
			$('.four').removeClass('active');
			console.log('four');
			break;
		case 53:
			$('.five').removeClass('active');
			console.log('five');
			break;
		case 54:
			$('.six').removeClass('active');
			console.log('six');
			break;
		case 55:
			$('.seven').removeClass('active');
			console.log('seven');
			break;
		case 56:
			$('.eight').removeClass('active');
			console.log('eight');
			break;
		case 57:
			$('.nine').removeClass('active');
			console.log('nine');
			break;
		case 48:
			$('.zero').removeClass('active');
			console.log('zero');
			break;
		case 189:
			$('.dash').removeClass('active');
			console.log('dash');
			break;
		case 187:
			$('.equals').removeClass('active');
			console.log('equals');
			break;
		case 8:
			$('.delete').removeClass('active');
			console.log('delete');
			break;
		case 9:
			$('.tab').removeClass('active');
			console.log('tab');
			break;
		case 81:
			$('.q').removeClass('active');
			console.log('q');
			break;
		case 87:
			$('.w').removeClass('active');
			console.log('w');
			break;
		case 69:
			$('.e').removeClass('active');
			console.log('e');
			break;
		case 82:
			$('.r').removeClass('active');
			console.log('r');
			break;
		case 84:
			$('.t').removeClass('active');
			console.log('t');
			break;
		case 89:
			$('.y').removeClass('active');
			console.log('y');
			break;
		case 85:
			$('.u').removeClass('active');
			console.log('u');
			break;
		case 73:
			$('.i').removeClass('active');
			break;
		case 79:
			$('.o').removeClass('active');
			break;
		case 80:
			$('.p').removeClass('active');
			break;
		case 219:
			$('.leftBracket').removeClass('active');
			break;
		case 221:
			$('.rightBracket').removeClass('active');
			break;
		case 220:
			$('.backslash').removeClass('active');
			break;
		case 20:
			$('.caps').removeClass('active');
			break;
		case 65:
			$('.a').removeClass('active');
			break;
		case 83:
			$('.s').removeClass('active');
			break;
		case 68:
			$('.d').removeClass('active');
			break;
		case 70:
			$('.f').removeClass('active');
			break;
		case 71:
			$('.g').removeClass('active');
			break;
		case 72:
			$('.h').removeClass('active');
			break;
		case 74:
			$('.j').removeClass('active');
			break;
		case 75:
			$('.k').removeClass('active');
			break;
		case 76:
			$('.l').removeClass('active');
			break;
		case 186:
			$('.semicolon').removeClass('active');
			break;
		case 222:
			$('.quote').removeClass('active')
			break;
		case 13:
			$('.enter').removeClass('active');
			break;
		case 16:
			$('.shift').removeClass('active');
			break;
		case 90:
			$('.z').removeClass('active');
			break;
		case 88:
			$('.x').removeClass('active');
			break;
		case 67:
			$('.c').removeClass('active');
			break;
		case 86:
			$('.v').removeClass('active');
			break;
		case 66:
			$('.b').removeClass('active');
			break;
		case 78:
			$('.n').removeClass('active');
			break;
		case 77:
			$('.m').removeClass('active');
			break;
		case 188:
			$('.comma').removeClass('active');
			break;
		case 190:
			$('.period').removeClass('active');
			break;
		case 191:
			$('.slash').removeClass('active');
			break;
		case 17:
			$('.ctrl').removeClass('active');
			break;
		case 18:
			$('.alt').removeClass('active');
			break;
		case 224:
			$('.cmd').removeClass('active');
			break;
		case 32:
			$('.space').removeClass('active');
			break;
		default:
			console.log('switch default');
	}

}); //End On Keyup Handler

});// End On Ready Handler