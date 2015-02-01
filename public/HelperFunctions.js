var HelperFunctions = {
	letterDirective: {
		dictionary: {
			lpLetter: 'qazQAZ`~1!',
			lrLetter: 'wsxWSX2@',
			lmLetter: 'eEdDcC3#',
			liLetter: 'rRtTfFgGvVbB45$%',
			riLetter: 'yYuUhHjJnNmM67^&',
			rmLetter: 'iIkK8*,<',
			rrLetter: 'olOL9(.>',
			rpLetter: '"\'pP0)-_=+[{]}|;:/?'
		},
		removeAllClasses: function (element) {
			var dictionary = this.dictionary;			
			for (var key in dictionary) {
				element.removeClass(key);
			}
		},
		getFingerClass: function (letter) {
			var dictionary = this.dictionary;
			for (var key in dictionary) {
				if(dictionary[key].indexOf(letter) != -1) {
					return key;
				}
			}
		},
		addLetterClasses: function (element) {
			return function (newGroupArray) {
				var letter = newGroupArray[0];
				var index = newGroupArray[1];
				var userInput = newGroupArray[2];
				var mistype = newGroupArray[3];
				var mistypedLetters = newGroupArray[4];		
				var fingerClass = HelperFunctions.letterDirective.getFingerClass(letter);

				if(index === userInput.length && !mistype) {
					element.addClass('current');
				} else {
					element.removeClass('current');
				}

				if(mistype && (mistypedLetters.indexOf(index) > -1)) {
					element.addClass('incorrect');
				} else {
					element.removeClass('incorrect');
				}

				if(index === 0) {
					HelperFunctions.letterDirective.removeAllClasses(element);
					element.addClass(fingerClass);
				} else if(index <= userInput.length && !mistype || index < userInput.length && mistype)  {
					element.addClass(fingerClass);
				} else {
					element.removeClass(fingerClass);
				}
			}
		}	
	}, // End letterDirective object
	fingerDirective: {
		dictionary: {
			leftPinky : 'qazQAZ`~1!^&*()_+{}:?HJKLNM<>YUIOP',
			leftRing : 'wsxWSX2@',
			leftMiddle : 'edcEDC3#',
			leftIndex : 'rtfgvbRTFGVB45$%',
			thumb : ' ',
			rightIndex : 'yuhjnmYUHJNM67^&',
			rightMiddle : 'ikIK8,<*',
			rightRing : 'olOL9.>(',
			rightPinky : '\'pP0)-_;:/=]+[{}|?!@#$%QWERTASDFGZXCVB~'
		},
		generateLetterListener: function (element, attributes) {
			var letters = this.dictionary[attributes.finger].split('');
			return function (newGroupArray) {
				var currentLetter = newGroupArray[0];
				var mistype = newGroupArray[1];

				if(letters.indexOf(currentLetter) != -1 && !mistype) {
					element.addClass('current');
				} else {
					element.removeClass('current');
				}
			}
		}
	}
} // End HelperFunctions object
