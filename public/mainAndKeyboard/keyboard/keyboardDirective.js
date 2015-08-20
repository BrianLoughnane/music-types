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

			// The confirm cycles infinitely, so I had to remove it:
				// if(confirm("Are you sure you want to leave this song?")) {
					// functionality goes here
				// }
		}
	}
});