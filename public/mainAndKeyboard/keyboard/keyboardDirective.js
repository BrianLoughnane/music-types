myApp.directive('keyboard', function() {
	return {
		// restrict: 'E',
		// transclude: true,
		restrict: 'A',
		templateUrl: './mainAndKeyboard/keyboard/keyboard.html',
		controller: function ($scope, $location, keyboardData) {
			$scope.rows = keyboardData;

			//
			// The confirm cycles infinitely, so I had to remove it:
			//
			$scope.changeViews = function() {
				// if(confirm("Are you sure you want to leave this song?")) {
					$location.path('/search');
				// }
			}
		}
	}
});