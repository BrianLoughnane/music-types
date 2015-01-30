myApp.directive('keyboard', function() {
	return {
		// restrict: 'E',
		// transclude: true,
		restrict: 'A',
		templateUrl: './mainAndKeyboard/keyboard/keyboard.html',
		controller: function ($scope, keyboardData) {
			$scope.rows = keyboardData;
			this.test = 'hello';
		}
	}
});