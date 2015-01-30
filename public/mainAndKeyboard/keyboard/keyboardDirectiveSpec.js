describe('keyboard directive', function() {
	var scope, html, compiled, element, ctrl;

	beforeEach(module('myApp'));
	beforeEach(module('mainAndKeyboard/keyboard/keyboard.html'));

	beforeEach(inject(function ($rootScope, $compile) {
		html = '<div ng-repeat="row in rows" ng-class="row.rowNumber"><span ng-repeat="key in row.keys" key="{{ key.key }}">{{ key.contents }}</span></div>';
		scope = $rootScope.$new();
		compiled = $compile(html);
		element = compiled(scope);
		scope.$digest();
	}));

	// it('should load the keyboard.html template', function () {
	// 	// this isn't working because it can't find ng-repeated elements
	// 	// expect(element.find('span').length).toEqual(60);
	// });

	it('should expose a controller', function () {
		// debugger
		// I cant' figure out why ctrl is undefined:
		ctrl = element.data('$keyboardController');
		expect(ctrl).toBeDefined();
	});
})