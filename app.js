
var myApp = angular.module('myApp', []);
myApp.controller('myController', function($scope, $http) {
	$scope.lyrics = ['I', ' ', 'went', ' ', 'down','to','the','asdf','to', 'pray'];
	$scope.lyricIndex = 0;
	$scope.word = $scope.lyrics[$scope.lyricIndex];

	$scope.userInput = "";
	$scope.currentLetter = $scope.word[$scope.userInput.length];
	
	$scope.statusBar = true;
	$scope.progress = 0;
	$scope.score = 0; 
	$scope.song = 'songysong';
	$scope.artist = 'artGarfunk';
	
	$scope.query = '';
	$scope.querying = false;
	$scope.searchResults = [
		{ 
			artist: 'beatles',
			song: 'Hold your hand',
			album: 'The White Album',
			id: '423455'
		},
		{
			artist: 'beach boys',
			song: 'surfin USA',
			album: 'Californee',
			id: '324234'
		},
		{ 
			artist: 'beatles',
			song: 'Hold your hand',
			album: 'The White Album',
			id: '423455'
		},
		{
			artist: 'beach boys',
			song: 'surfin USA',
			album: 'Californee',
			id: '324234'
		},{ 
			artist: 'beatles',
			song: 'Hold your hand',
			album: 'The White Album',
			id: '423455'
		},
		{
			artist: 'beach boys',
			song: 'surfin USA',
			album: 'Californee',
			id: '324234'
		},{ 
			artist: 'beatles',
			song: 'Hold your hand',
			album: 'The White Album',
			id: '423455'
		},
		{
			artist: 'beach boys',
			song: 'surfin USA',
			album: 'Californee',
			id: '324234'
		},{ 
			artist: 'beatles',
			song: 'Hold your hand',
			album: 'The White Album',
			id: '423455'
		},
		{
			artist: 'beach boys',
			song: 'surfin USA',
			album: 'Californee',
			id: '324234'
		},{ 
			artist: 'beatles',
			song: 'Hold your hand',
			album: 'The White Album',
			id: '423455'
		},
		{
			artist: 'beach boys',
			song: 'surfin USA',
			album: 'Californee',
			id: '324234'
		},{ 
			artist: 'beatles',
			song: 'Hold your hand',
			album: 'The White Album',
			id: '423455'
		},
		{
			artist: 'beach boys',
			song: 'surfin USA',
			album: 'Californee',
			id: '324234'
		},{ 
			artist: 'beatles',
			song: 'Hold your hand',
			album: 'The White Album',
			id: '423455'
		},
		{
			artist: 'beach boys',
			song: 'surfin USA',
			album: 'Californee',
			id: '324234'
		},{ 
			artist: 'beatles',
			song: 'Hold your hand',
			album: 'The White Album',
			id: '423455'
		},
		{
			artist: 'beach boys',
			song: 'surfin USA',
			album: 'Californee',
			id: '324234'
		},{ 
			artist: 'beatles',
			song: 'Hold your hand',
			album: 'The White Album',
			id: '423455'
		},
		{
			artist: 'beach boys',
			song: 'surfin USA',
			album: 'Californee',
			id: '324234'
		},{ 
			artist: 'beatles',
			song: 'Hold your hand',
			album: 'The White Album',
			id: '423455'
		},
		{
			artist: 'beach boys',
			song: 'surfin USA',
			album: 'Californee',
			id: '324234'
		},{ 
			artist: 'beatles',
			song: 'Hold your hand',
			album: 'The White Album',
			id: '423455'
		},
		{
			artist: 'beach boys',
			song: 'surfin USA',
			album: 'Californee',
			id: '324234'
		},{ 
			artist: 'beatles',
			song: 'Hold your hand',
			album: 'The White Album',
			id: '423455'
		},
		{
			artist: 'beach boys',
			song: 'surfin USA',
			album: 'Californee',
			id: '324234'
		},{ 
			artist: 'beatles',
			song: 'Hold your hand',
			album: 'The White Album',
			id: '423455'
		},
		{
			artist: 'beach boys',
			song: 'surfin USA',
			album: 'Californee',
			id: '324234'
		},
	]

	$scope.$watch('userInput', function() {
		var input = $scope.userInput;
		var lastLetterTyped = input[input.length-1];
		var word = $scope.word;
		var mistypedLetters = [];

		$scope.lastLetterTyped = lastLetterTyped;

		if((lastLetterTyped === $scope.currentLetter) && (input.length !== 0)) {
			$scope.score++;
		} else if ((lastLetterTyped !== $scope.currentLetter) && (input.length !== 0)) {
			$scope.score--;
		}

		for(var i = 0; i < input.length; i++) {
			if(input[i] != word[i]) {
				$scope.mistype = true;
				mistypedLetters.push(i);
			} else {
				$scope.mistype = false;
			}
		}

		$scope.mistypedLetters = mistypedLetters;

		if(input === $scope.word) {
			$scope.lyricIndex += 1;
			$scope.word = $scope.lyrics[$scope.lyricIndex];


			$scope.userInput = "";
			updateProgress();
				
			// $http({
			// 	url: 'http://tts-api.com/tts.mp3?q=hi',
			// 	method: 'GET'
			// 	// params: {
			// 	// 	q: 'hello'
			// 	// }
			// }).then(function(r){
			// 	console.log(r);
			// });    // text to speech API

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


	// function wordParse() {
	// 	var word = $scope.word;
	// 	var wordParse = '';

	// 	for (var i = 0; i < word.length; i++) {
	// 		var letter = word[i];
	// 		var letterParse = '<span>' + letter + '</span>';

	// 		wordParse += letterParse;
	// 	}
		
	// 	return wordParse;
	// } //end wordParse()
/*===============================
Search Spotify
===============================*/

	$('.search').on('click', function() {
		console.log('search');

		// $http({
		// 	url: 'https://api.spotify.com/v1/search',
		// 	method: 'GET',
		// 	params: {
		// 		q: 'beatles',
		// 		type: 'artist,track'
		// 	}

	// 	$http({
	// 		url: 'http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=15953433',
	// 		method: 'JSONP',
	// 		// method: 'GET',
	// 		params: {
	// 			apikey: '83c1f43d33f5abacda9ae5f1f1106dca',
	// 			callback: 'JSON_CALLBACK',
	// 			q: 'beatles'
	// 		}
		
	// 	}).success(function(response) {
	// 		console.log(response);
	// 		// $('.mmTracking').attr('src', 'http:\/\/tracking.musixmatch.com\/t1.0\/m42By\/J7rv9z');
	// 	});

		$http({
			url: 'http://api.musixmatch.com/ws/1.1/track.search',
			method: 'JSONP',
			params: {
				apikey: '83c1f43d33f5abacda9ae5f1f1106dca',
				callback: 'JSON_CALLBACK',
				q_track: 'beatles',
				q_artist: 'beatles'
			}
		}).success(function(response) {
			console.log(response.message.body.track_list[0].track.track_id);
			// $('.mmTracking').attr('src', 'http:\/\/tracking.musixmatch.com\/t1.0\/m42By\/J7rv9z');
		});
	});  // end search click handler
});  //end myController



$(document).on('ready', function() {


/*===============================
Keyboard
===============================*/


$('.main-input').focus();

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