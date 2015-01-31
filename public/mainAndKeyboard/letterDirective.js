myApp.directive('letterDirective', function() {
	return {
		restrict: 'A',
		link: function(scope, element) {
			scope.$watchGroup(
				['letter', '$index', 'userInput', 'mistype', 'mistypedLetters'],
				HelperFunctions.letterDirective.addLetterClasses(element)
			);		
		}
	};
});