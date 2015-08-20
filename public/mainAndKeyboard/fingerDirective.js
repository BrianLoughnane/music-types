myApp.directive('finger', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attributes) {
			scope.$watchGroup(
				['currentLetter', 'mistype'], 
				HelperFunctions.fingerDirective.generateLetterListener(element, attributes)
			);
		}
	}
});