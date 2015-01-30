describe('letterDirective', function() {
	beforeEach(module('myApp'));

	beforeEach(
	inject(function ($rootScope, $compile) {
		scope = $rootScope.$new();
		scope.$digest();
	}));

	it('should watch a group of scope variables', 
	inject(function () {
		debugger
		//Not sure how to test the functionality within the directive
		
	}));
})