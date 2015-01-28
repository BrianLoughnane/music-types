myApp.directive('finger', function() {
	var dictionary = {
		leftPinky : 'qazQAZ`~1!^&*()_+{}:?HJKLNM<>YUIOP',
		leftRing : 'wsxWSX2@',
		leftMiddle : 'edcEDC3#',
		leftIndex : 'rtfgvbRTFGVB45$%',
		thumb : ' ',
		rightIndex : 'yuhjnmYUHJNM67^&',
		rightMiddle : 'ikIK8,<*',
		rightRing : 'olOL9.>(',
		rightPinky : '\'pP0)-_;:/=]+[{}|?!@#$%QWERTASDFGZXCVB~'
	}
	return {
		restrict: 'A',
		link: function(s,e,a) {
			function generateLetterListener (letters, e) {
				return function (newGroupArray) {
					var currentLetter = newGroupArray[0];
					var mistype = newGroupArray[1];
					
					if(letters.indexOf(currentLetter) != -1 && !mistype) {
						e.addClass('current');
					} else {
						e.removeClass('current');
					}
				}
			}
			var letters = dictionary[a.finger].split('');
			s.$watchGroup(
				['currentLetter', 'mistype'], 
				generateLetterListener(letters, e)
			);
		}
	}
});





// HelperFunctions.js

// var HelperFunction = {
// 	generateLetterListener: function (letters, e) {
// 		return function (newGroupArray) {
// 			var currentLetter = newGroupArray[0];
// 			var mistype = newGroupArray[1];
			
// 			if(letters.indexOf(currentLetter) != -1 && !mistype) {
// 				e.addClass('current');
// 			} else {
// 				e.removeClass('current');
// 			}
// 		}
// 	},

// }