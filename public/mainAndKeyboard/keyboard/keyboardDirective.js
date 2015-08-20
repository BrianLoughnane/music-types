myApp.directive('keyboard', function() {
	return {
		restrict: 'A',
		templateUrl: './mainAndKeyboard/keyboard/keyboard.html',
		controller: function ($scope, $location, keyboardData, header) {
			$scope.rows = keyboardData;

			$scope.changeViews = function() {
				header.timer.stopTimer();
				$location.path('/search');
			}
		}
	}
});
