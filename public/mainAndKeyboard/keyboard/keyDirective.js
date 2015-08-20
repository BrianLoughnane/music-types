myApp.directive('key', function() {
	return {
		restrict: 'A',
		require: '^keyboard',
		link: function (scope, element) {
			scope.$watchGroup(
				['currentLetter', 'mistype'],
				HelperFunctions.keyDirective.generateLetterListener(scope, element)
			)
		}
	}
});