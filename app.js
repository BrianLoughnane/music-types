var myApp = angular.module('myApp', []);
myApp.controller('myController', function($scope) {
	$scope.progress = 0;
	$scope.score = 0;
	$scope.word = 'ready';
	$scope.song = 'song';
	$scope.artist = 'artist';
});
