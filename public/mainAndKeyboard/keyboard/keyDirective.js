myApp.directive('key', function() {
	return {
		restrict: 'A',
		require: '^keyboard',
		link: function (s,e,a) {
			e.addClass(s.key.class1);
			e.addClass(s.key.class2);

			s.$watchGroup(
				['currentLetter', 'mistype'],
				function (newGroupArray) {
					var currentLetter = newGroupArray[0];
					var mistype = newGroupArray[1];

					if (s.key.special === true) {
						switch (s.key.key) {
							case 'delete':
								if(s.mistype) {
									e.addClass('incorrect');
								} else {
									e.removeClass('incorrect');
								}
								break;
							case 'leftShift':
								if ('^&*()_+{}:?HJKLNM<>YUIOP'.indexOf(s.currentLetter) !== -1 && !s.mistype) {
									e.addClass('current');
									debugger
								} else {
									e.removeClass('current');
								}
								break;
							case 'rightShift':
								if ('!@#$%QWERTASDFGZXCVB~'.indexOf(s.currentLetter) !== -1 && !s.mistype) {
									e.addClass('current');
								} else {
									e.removeClass('current');
								} 
								break;
							case 'space':
								e.addClass('space');
								e.addClass('ltKey');
								e.addClass('rtKey');
								if(s.currentLetter === ' ' && !s.mistype) {
									e.addClass('current');
								} else {
									e.removeClass('current');
								}
								break;
							case 'button':
								e.addClass('button');
								e.on('click', s.changeViews); 
								break;
						}
					} else if (currentLetter === s.key.conditional1 || currentLetter === s.key.conditional2 && !mistype) {
						e.addClass('current');
					} else {
						e.removeClass('current');
					}
				}
			)
		}
	}
})











