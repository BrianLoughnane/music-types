myApp.directive('letterDirective', function() {
	var dictionary = {
		lpLetter: 'qazQAZ`~1!',
		lrLetter: 'wsxWSX2@',
		lmLetter: 'eEdDcC3#',
		liLetter: 'rRtTfFgGvVbB45$%',
		riLetter: 'yYuUhHjJnNmM67^&',
		rmLetter: 'iIkK8*,<',
		rrLetter: 'olOL9(.>',
		rpLetter: 'pP0)-_=+[{]}|;:/?'
	}
	return {
		restrict: 'A',
		link: function(s,e,a) {
			function getFingerClass(letter) {
				for (var key in dictionary) {
					if(dictionary[key].indexOf(letter) != -1) {
						return key;
					}
				}
			}
			s.$watchGroup(
				['letter', '$index', 'userInput', 'mistype', 'mistypedLetters'],
				function(newGroupArray) {
					var letter = newGroupArray[0]
					var index = newGroupArray[1]
					var userInput = newGroupArray[2]
					var mistype = newGroupArray[3]
					var mistypedLetters = newGroupArray[4]
					
					var fingerClass = getFingerClass(letter);
					
					if(index === userInput.length && !mistype) {
						e.addClass('current');
					} else {
						e.removeClass('current');
					}

					if(mistype && (mistypedLetters.indexOf(index) > -1)) {
						e.addClass('incorrect');
					} else {
						e.removeClass('incorrect');
					}

					if(index <= userInput.length && !mistype || index < userInput.length && mistype)  {
						e.addClass(fingerClass);
					} else {
						e.removeClass(fingerClass);
					}
				}
			);
		}
	};
});