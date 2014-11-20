myApp.controller('WelcomeCtrl', function($location, $scope) {
	$scope.toSearch = function() {
		$location.path('/search');
	}
});